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
import { appendQueryParamsToURL, getAllQueryParams, getQueryParams, normaliseUserResponse } from "../../utils";
import { RecipeInterface, StateObject } from "./types";
import { RecipeFunctionOptions, RecipeImplementationInput } from "../recipeModule/types";
import STGeneralError from "../../error";
import { PreAndPostAPIHookAction } from "./types";
import { WindowHandlerReference } from "../../windowHandler";
import { User } from "../../types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        getStateAndOtherInfoFromStorage: function <CustomStateProperties>():
            | (StateObject & CustomStateProperties)
            | undefined {
            /**
             * This function can also be used to decide which flow to use in the UI
             * (For example routing in supertokens-auth-react), which means we can
             * not make this an async function.
             *
             * To allow for this and allow for storage functions to be async where
             * possible we call the sync version of getItem here
             */
            const stateFromStorage =
                WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.getItemSync(
                    "supertokens-oauth-state-2"
                );

            if (stateFromStorage === null) {
                return undefined;
            }

            try {
                return JSON.parse(stateFromStorage);
            } catch {
                return undefined;
            }
        },

        setStateAndOtherInfoToStorage: async function (input: { state: StateObject; userContext: any }): Promise<void> {
            const value = JSON.stringify({
                ...input.state,
            });
            await WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.setItem(
                "supertokens-oauth-state-2",
                value
            );
        },

        getAuthorisationURLWithQueryParamsAndSetState: async function (
            this: RecipeInterface,
            input: {
                thirdPartyId: string;
                tenantId: string | undefined;
                frontendRedirectURI: string;
                redirectURIOnProviderDashboard?: string;
                userContext: any;
                options?: RecipeFunctionOptions;
            }
        ): Promise<string> {
            // 1. Call AuthorisationUrlGET
            const urlResponse = await this.getAuthorisationURLFromBackend({
                thirdPartyId: input.thirdPartyId,
                tenantId: input.tenantId,
                redirectURIOnProviderDashboard: input.redirectURIOnProviderDashboard || input.frontendRedirectURI,
                userContext: input.userContext,
                options: input.options,
            });

            // 2. Generate state.
            let frontendRedirectURIToSave: string | undefined =
                input.redirectURIOnProviderDashboard !== undefined &&
                input.frontendRedirectURI !== input.redirectURIOnProviderDashboard
                    ? input.frontendRedirectURI
                    : undefined;
            const stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                frontendRedirectURI: frontendRedirectURIToSave,
                userContext: input.userContext,
            });

            // 3. Store state in Session Storage.
            const stateExpiry = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            await this.setStateAndOtherInfoToStorage<{}>({
                state: {
                    stateForAuthProvider: stateToSendToAuthProvider,
                    thirdPartyId: input.thirdPartyId,
                    tenantId: input.tenantId,
                    expiresAt: stateExpiry,
                    redirectURIOnProviderDashboard: input.redirectURIOnProviderDashboard || input.frontendRedirectURI,
                    pkceCodeVerifier: urlResponse.pkceCodeVerifier,
                },
                userContext: input.userContext,
            });

            const urlWithState = appendQueryParamsToURL(urlResponse.urlWithQueryParams, {
                state: stateToSendToAuthProvider,
            });

            return urlWithState;
        },

        getAuthorisationURLFromBackend: async function (input: {
            thirdPartyId: string;
            tenantId: string | undefined;
            redirectURIOnProviderDashboard: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            urlWithQueryParams: string;
            pkceCodeVerifier?: string;
            fetchResponse: Response;
        }> {
            const queryParams: Record<string, string> = {
                thirdPartyId: input.thirdPartyId,
                redirectURIOnProviderDashboard: input.redirectURIOnProviderDashboard,
            };

            if (recipeImplInput.clientType !== undefined) {
                queryParams.clientType = recipeImplInput.clientType;
            }

            const { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                urlWithQueryParams: string;
                pkceCodeVerifier?: string;
            }>(
                input.tenantId,
                "/authorisationurl",
                {},
                queryParams,
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "GET_AUTHORISATION_URL",
                    options: input.options,
                    userContext: input.userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "GET_AUTHORISATION_URL",
                    userContext: input.userContext,
                })
            );

            return {
                status: "OK",
                urlWithQueryParams: jsonBody.urlWithQueryParams,
                pkceCodeVerifier: jsonBody.pkceCodeVerifier,
                fetchResponse,
            };
        },

        signInAndUp: async function (
            this: RecipeInterface,
            input: { userContext: any; options?: RecipeFunctionOptions }
        ): Promise<
            | {
                  status: "OK";
                  user: User;
                  createdNewRecipeUser: boolean;
                  fetchResponse: Response;
              }
            | {
                  status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                  fetchResponse: Response;
              }
            | {
                  status: "SIGN_IN_UP_NOT_ALLOWED" | "EMAIL_ALREADY_USED_IN_ANOTHER_ACCOUNT";
                  reason: string;
                  fetchResponse: Response;
              }
        > {
            const stateFromStorage = this.getStateAndOtherInfoFromStorage<{}>({
                userContext: input.userContext,
            });

            const stateFromQueryParams = this.getAuthStateFromURL({
                userContext: input.userContext,
            });

            const verifiedState = await this.verifyAndGetStateOrThrowError({
                stateFromAuthProvider: stateFromQueryParams,
                stateObjectFromStorage: stateFromStorage,
                userContext: input.userContext,
            });

            const errorInQuery = this.getAuthErrorFromURL({
                userContext: input.userContext,
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

            const queryParams = getAllQueryParams();
            const queryParamsObj: any = Object.fromEntries(queryParams);

            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      createdNewRecipeUser: boolean;
                      user: User;
                  }
                | {
                      status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                  }
                | {
                      status: "SIGN_IN_UP_NOT_ALLOWED" | "EMAIL_ALREADY_USED_IN_ANOTHER_ACCOUNT";
                      reason: string;
                  }
                | {
                      status: "FIELD_ERROR";
                      error: string;
                  }
            >(
                verifiedState.tenantId,
                "/signinup",
                {
                    body: JSON.stringify({
                        thirdPartyId: verifiedState.thirdPartyId,
                        clientType: recipeImplInput.clientType,
                        redirectURIInfo: {
                            redirectURIOnProviderDashboard: verifiedState.redirectURIOnProviderDashboard,
                            redirectURIQueryParams: queryParamsObj,
                            pkceCodeVerifier: verifiedState.pkceCodeVerifier,
                        },
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "THIRD_PARTY_SIGN_IN_UP",
                    options: input.options,
                    userContext: input.userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "THIRD_PARTY_SIGN_IN_UP",
                    userContext: input.userContext,
                })
            );

            if (jsonBody.status === "FIELD_ERROR") {
                throw new STGeneralError(jsonBody.error);
            }
            if (jsonBody.status !== "OK") {
                return {
                    ...jsonBody,
                    fetchResponse,
                };
            }
            return {
                status: "OK",
                ...normaliseUserResponse("thirdparty", jsonBody),
                fetchResponse,
            };
        },

        generateStateToSendToOAuthProvider: function (input?: {
            frontendRedirectURI?: string;
            userContext: any;
        }): string {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            let state: {
                state: string;
                frontendRedirectURI?: string;
            } = {
                state: `${1e20}`.replace(/[018]/g, (c) =>
                    (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(
                        16
                    )
                ),
            };

            if (input !== undefined && input.frontendRedirectURI !== undefined) {
                state.frontendRedirectURI = input.frontendRedirectURI;
            }
            return btoa(JSON.stringify(state));
        },

        verifyAndGetStateOrThrowError: async function <CustomStateProperties>(input: {
            stateFromAuthProvider: string | undefined;
            stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
            userContext: any;
        }): Promise<StateObject & CustomStateProperties> {
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

        getAuthErrorFromURL: function (): string | undefined {
            return getQueryParams("error");
        },

        getAuthStateFromURL: function (): string {
            const stateFromURL = getQueryParams("state");

            if (stateFromURL === undefined) {
                return "";
            }

            return stateFromURL;
        },
    };
}

export { getRecipeImplementation };
