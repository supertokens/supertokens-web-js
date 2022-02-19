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

import STGeneralError from "../../error";
import Querier from "../../querier";
import { NormalisedAppInfo } from "../../types";
import { appendQueryParamsToURL, getQueryParams, getSessionStorage, setSessionStorage } from "../../utils";
import { UserType } from "../authRecipeWithEmailVerification/types";
import { NormalisedInputType, RecipeInterface, StateObject } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        getOAuthState: function (): {
            status: "OK";
            state: StateObject | undefined;
        } {
            try {
                const state = JSON.parse(getSessionStorage("supertokens-oauth-state"));

                if (state === null) {
                    return {
                        status: "OK",
                        state: undefined,
                    };
                }

                if (Date.now() > state.expiresAt) {
                    return {
                        status: "OK",
                        state: undefined,
                    };
                }

                return {
                    status: "OK",
                    state,
                };
            } catch {
                return {
                    status: "OK",
                    state: undefined,
                };
            }
        },

        setOAuthState: function (input: { state: StateObject; userContext: any }): {
            status: "OK";
        } {
            const expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            const value = JSON.stringify({
                redirectToPath: input.state.redirectToPath,
                state: input.state.state,
                thirdPartyId: input.state.thirdPartyId,
                rid: input.state.rid,
                expiresAt,
            });
            setSessionStorage("supertokens-oauth-state", value);
            return {
                status: "OK",
            };
        },

        getThirdPartyLoginRedirectURL: async function (input: {
            thirdPartyId: string;
            config: NormalisedInputType;
            state?: StateObject;
            userContext: any;
        }): Promise<
            | {
                  status: "ERROR";
              }
            | {
                  status: "OK";
                  url: string;
              }
        > {
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);
            if (provider === undefined) {
                return { status: "ERROR" };
            }

            // 1. Generate state.
            const state =
                input.state === undefined || input.state.state === undefined
                    ? provider.generateState()
                    : input.state.state;

            // 2. Store state in Session Storage.
            this.setOAuthState({
                state: {
                    ...input.state,
                    rid:
                        input.state === undefined || input.state.rid === undefined
                            ? input.config.recipeId
                            : input.state.rid,
                    thirdPartyId:
                        input.state === undefined || input.state.thirdPartyId === undefined
                            ? input.thirdPartyId
                            : input.state.thirdPartyId,
                    state,
                },
                userContext: input.userContext,
                config: input.config,
            });

            // 3. Get Authorisation URL.
            const urlResponse = await this.getOAuthAuthorisationURL({
                thirdPartyId: provider.id,
                config: input.config,
                userContext: input.userContext,
            });

            // for some third party providers, the redirect_uri is set on the backend itself (for example in the case of apple). In these cases, we don't set them here...
            const urlObj = new URL(urlResponse.url);
            const alreadyContainsRedirectURI = urlObj.searchParams.get("redirect_uri") !== null;

            const urlWithState = alreadyContainsRedirectURI
                ? appendQueryParamsToURL(urlResponse.url, {
                      state,
                  })
                : appendQueryParamsToURL(urlResponse.url, {
                      state,
                      redirect_uri: provider.getRedirectURL(input.config.appInfo),
                  });

            return {
                status: "OK",
                url: urlWithState,
            };
        },

        getOAuthAuthorisationURL: async function (input: {
            thirdPartyId: string;
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
                { thirdPartyId: input.thirdPartyId },
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
            thirdPartyId: string;
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
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);

            const stateFromStorage = this.getOAuthState({
                userContext: input.userContext,
                config: input.config,
            }).state;

            const code = getQueryParams("code");

            const stateFromQueryParams = getQueryParams("state");

            if (
                getQueryParams("error") !== null ||
                stateFromStorage === undefined ||
                stateFromStorage.thirdPartyId !== input.thirdPartyId ||
                stateFromStorage.state !== stateFromQueryParams ||
                code === null ||
                provider === undefined
            ) {
                throw new STGeneralError("");
            }

            const redirectURI = await provider.getRedirectURL(input.config.appInfo);

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
                        thirdPartyId: input.thirdPartyId,
                        redirectURI,
                        clientId: provider.clientId,
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

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
    };
}
