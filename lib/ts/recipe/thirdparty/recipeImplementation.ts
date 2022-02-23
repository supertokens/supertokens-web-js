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
import { generateThirdPartyProviderState } from "./utils";
import STGeneralError from "../../error";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        getStateAndOtherInfoFromStorage: function <CustomStateProperties>():
            | (StateObject & CustomStateProperties)
            | undefined {
            try {
                const stateFromStorage = getSessionStorage("supertokens-oauth-state");

                if (stateFromStorage === undefined) {
                    return undefined;
                }

                const state = JSON.parse(stateFromStorage);

                if (Date.now() > state.expiresAt) {
                    return undefined;
                }

                return undefined;
            } catch {
                return undefined;
            }
        },

        setStateAndOtherInfoToStorage: function (input: { state: StateObject; userContext: any }) {
            const expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            const value = JSON.stringify({
                ...input.state,
                expiresAt,
            });
            setSessionStorage("supertokens-oauth-state", value);
        },

        getLoginRedirectURLWithQueryParamsAndSetState: async function (input: {
            providerId: string;
            redirectionURL: string;
            config: NormalisedInputType;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<string> {
            // 1. Generate state.
            const stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                userContext: input.userContext,
            });

            // 2. Store state in Session Storage.
            this.setStateAndOtherInfoToStorage<{}>({
                state: {
                    thirdPartyId: input.providerId,
                    stateForAuthProvider: stateToSendToAuthProvider,
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
            providerId: string;
            redirectionURL: string;
            providerClientId?: string;
            authCode?: string;
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
            | {
                  status: "FIELD_ERROR";
                  error: string;
                  fetchResponse: Response;
              }
        > {
            const stateFromStorage = this.getStateAndOtherInfoFromStorage<{}>({
                userContext: input.userContext,
                config: input.config,
            });

            const stateFromQueryParams = getQueryParams("state");

            if (
                !this.verifyStateFromOAuthProvider({
                    stateFromProvider: stateFromQueryParams,
                    stateFromStorage: stateFromStorage,
                    providerId: input.providerId,
                })
            ) {
                throw new Error("Invalid 'state' recieved from provider");
            }

            const code = input.authCode === undefined ? getQueryParams("code") : input.authCode;

            if (code === undefined) {
                throw new Error(
                    "There is no 'code' present in query params and no 'authCode' was provided when calling signInUp"
                );
            }

            if (getQueryParams("error") !== undefined) {
                // TODO NEMI: This should have a better message
                throw new Error("Something went Wrong");
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
                        thirdPartyId: input.providerId,
                        redirectURI: input.redirectionURL,
                        clientId: input.providerClientId,
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
            return generateThirdPartyProviderState();
        },
        verifyStateFromOAuthProvider: function (input: {
            stateFromProvider: string | undefined;
            stateFromStorage: StateObject | undefined;
            providerId: string;
        }): boolean {
            if (input.stateFromStorage === undefined || input.stateFromProvider === undefined) {
                return false;
            }

            return (
                input.stateFromProvider === input.stateFromStorage.stateForAuthProvider &&
                input.stateFromStorage.thirdPartyId === input.providerId
            );
        },
    };
}
