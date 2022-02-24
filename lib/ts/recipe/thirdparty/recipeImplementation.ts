/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import Querier from "../../querier";
import { NormalisedAppInfo } from "../../types";
import { appendQueryParamsToURL, getQueryParams, getSessionStorage, setSessionStorage } from "../../utils";
import { UserType } from "../authRecipeWithEmailVerification/types";
import { NormalisedInputType, RecipeInterface, StateObject } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import STGeneralError from "../../error";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        getStateAndOtherInfoFromStorage: function <CustomStateProperties>():
            | (StateObject & CustomStateProperties)
            | undefined {
            try {
                const stateFromStorage = getSessionStorage("supertokens-oauth-state-2");

                if (stateFromStorage === undefined) {
                    return undefined;
                }

                return JSON.parse(stateFromStorage);
            } catch {
                return undefined;
            }
        },

        setStateAndOtherInfoToStorage: function (input: { state: StateObject; userContext: any }) {
            const value = JSON.stringify({
                ...input.state,
            });
            setSessionStorage("supertokens-oauth-state-2", value);
        },

        getLoginRedirectURLWithQueryParamsAndSetState: async function (input: {
            providerId: string;
            redirectionURL: string;
            config: NormalisedInputType;
            userContext: any;
            providerClientId?: string;
            options?: RecipeFunctionOptions;
        }): Promise<string> {
            // 1. Generate state.
            const stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                userContext: input.userContext,
                config: input.config,
            });

            const stateExpiry = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            // 2. Store state in Session Storage.
            this.setStateAndOtherInfoToStorage<{}>({
                state: {
                    stateForAuthProvider: stateToSendToAuthProvider,
                    providerId: input.providerId,
                    expiresAt: stateExpiry,
                    authCallbackURL: input.redirectionURL,
                    providerClientId: input.providerClientId,
                },
                userContext: input.userContext,
                config: input.config,
            });

            // 3. Get Authorisation URL.
            const urlResponse = await this.getOAuthAuthorisationURLFromBackend({
                providerId: input.providerId,
                config: input.config,
                userContext: input.userContext,
                options: input.options,
            });

            // for some third party providers, the redirect_uri is set on the backend itself (for example in the case of apple). In these cases, we don't set them here...
            const urlObj = new URL(urlResponse.url);
            const alreadyContainsRedirectURI = urlObj.searchParams.get("redirect_uri") !== null;

            const urlWithState = alreadyContainsRedirectURI
                ? appendQueryParamsToURL(urlResponse.url, {
                      stateToSendToAuthProvider,
                  })
                : appendQueryParamsToURL(urlResponse.url, {
                      stateToSendToAuthProvider,
                      redirect_uri: input.redirectionURL,
                  });

            return urlWithState;
        },

        getOAuthAuthorisationURLFromBackend: async function (input: {
            providerId: string;
            config: NormalisedInputType;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                url: string;
            }>(
                "/authorisationurl",
                {},
                { thirdPartyId: input.providerId },
                Querier.preparePreAPIHook({
                    config: input.config,
                    action: "GET_AUTHORISATION_URL",
                    options: input.options,
                    userContext: input.userContext,
                }),
                Querier.preparePostAPIHook({
                    config: input.config,
                    action: "GET_AUTHORISATION_URL",
                    userContext: input.userContext,
                })
            );

            return {
                status: "OK",
                url: jsonBody.url,
                fetchResponse,
            };
        },

        signInAndUp: async function (input: {
            config: NormalisedInputType;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<
            | {
                  status: "OK";
                  user: UserType;
                  createdNewUser: boolean;
                  fetchResponse: Response;
              }
            | {
                  status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                  fetchResponse: Response;
              }
        > {
            const stateFromStorage = this.getStateAndOtherInfoFromStorage<{}>({
                userContext: input.userContext,
                config: input.config,
            });

            const stateFromQueryParams = getQueryParams("state");

            const verifiedState = await this.verifyAndGetStateOrThrowError({
                stateFromAuthProvider: stateFromQueryParams,
                stateObjectFromStorage: stateFromStorage,
                config: input.config,
                userContext: input.userContext,
            });

            const code = this.getAuthCodeFromURL({
                userContext: input.userContext,
                config: input.config,
            });

            const errorInQuery = this.getAuthErrorFromURL({
                userContext: input.userContext,
                config: input.config,
            });

            if (errorInQuery !== undefined) {
                /**
                 * If an error occurs the auth provider will send an additional query param
                 * 'error' which will be a code that represents what error occured. Since the
                 * error is not end-user friendly we throw a normal Javascript Error instead
                 * of STGeneralError
                 *
                 * Explained in detail in the RFC:
                 * https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
                 */
                throw new Error(`Auth provider responded with error: ${errorInQuery}`);
            }

            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      createdNewUser: boolean;
                      user: UserType;
                  }
                | {
                      status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                  }
                | {
                      status: "FIELD_ERROR";
                      error: string;
                  }
            >(
                "/signinup",
                {
                    body: JSON.stringify({
                        code,
                        thirdPartyId: verifiedState.providerId,
                        redirectURI: verifiedState.authCallbackURL,
                        clientId: verifiedState.providerClientId,
                    }),
                },
                Querier.preparePreAPIHook({
                    config: input.config,
                    action: "THIRD_PARTY_SIGN_IN_UP",
                    options: input.options,
                    userContext: input.userContext,
                }),
                Querier.preparePostAPIHook({
                    config: input.config,
                    action: "THIRD_PARTY_SIGN_IN_UP",
                    userContext: input.userContext,
                })
            );

            if (jsonBody.status === "FIELD_ERROR") {
                throw new STGeneralError(jsonBody.error);
            }

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        generateStateToSendToOAuthProvider: function (): string {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return `${1e20}`.replace(/[018]/g, (c) =>
                (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(16)
            );
        },
        verifyAndGetStateOrThrowError: async function (input: {
            stateFromAuthProvider: string | undefined;
            stateObjectFromStorage: StateObject | undefined;
            userContext: any;
        }): Promise<StateObject> {
            if (
                input.stateObjectFromStorage === undefined ||
                input.stateObjectFromStorage.stateForAuthProvider === undefined
            ) {
                throw new Error("No valid auth state present in session storage");
            }

            if (input.stateFromAuthProvider === undefined) {
                throw new Error("No state recieved from auth provider");
            }

            if (input.stateObjectFromStorage.expiresAt < Date.now()) {
                throw new Error("Auth state verification failed. The auth provider took too long to respond");
            }

            if (input.stateFromAuthProvider !== input.stateObjectFromStorage.stateForAuthProvider) {
                throw new Error("Auth state verification failed. The auth provider responded with an invalid state");
            }

            return input.stateObjectFromStorage;
        },

        getAuthCodeFromURL: function (): string {
            const code = getQueryParams("code");

            if (code === undefined) {
                throw new Error(
                    "There is no 'code' present in query params and no 'authCode' was provided when calling signInUp"
                );
            }

            return code;
        },

        getAuthErrorFromURL: function (): string | undefined {
            return getQueryParams("error");
        },
    };
}
