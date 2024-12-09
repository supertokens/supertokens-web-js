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
import { RecipeInterface, ResidentKey, UserVerification } from "./types";
import { RecipeFunctionOptions, RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction } from "./types";
import { GeneralErrorResponse, User } from "../../types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        registerOptions: async function ({
            options,
            userContext,
            email,
            recoverAccountToken,
        }: { options?: RecipeFunctionOptions; userContext: any } & (
            | { email: string; recoverAccountToken?: never }
            | { recoverAccountToken: string; email?: never }
        )) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      webauthnGeneratedOptionsId: string;
                      rp: {
                          id: string;
                          name: string;
                      };
                      user: {
                          id: string;
                          name: string;
                          displayName: string;
                      };
                      challenge: string;
                      timeout: number;
                      excludeCredentials: {
                          id: string;
                          type: "public-key";
                          transports: ("ble" | "hybrid" | "internal" | "nfc" | "usb")[];
                      }[];
                      attestation: "none" | "indirect" | "direct" | "enterprise";
                      pubKeyCredParams: {
                          alg: number;
                          type: "public-key";
                      }[];
                      authenticatorSelection: {
                          requireResidentKey: boolean;
                          residentKey: ResidentKey;
                          userVerification: UserVerification;
                      };
                      fetchResponse: Response;
                  }
                | {
                      status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
                      fetchResponse: Response;
                  }
                | {
                      status: "INVALID_EMAIL_ERROR";
                      err: string;
                      fetchResponse: Response;
                  }
                | {
                      status: "INVALID_GENERATED_OPTIONS_ERROR";
                      fetchResponse: Response;
                  }
            >(
                undefined,
                "/webauthn/options/register",
                {
                    body: JSON.stringify({
                        email,
                        recoverAccountToken,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "REGISTER_OPTIONS",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "REGISTER_OPTIONS",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        signInOptions: async function ({ email, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      webauthnGeneratedOptionsId: string;
                      challenge: string;
                      timeout: number;
                      userVerification: UserVerification;
                      fetchResponse: Response;
                  }
                | {
                      status: "INVALID_GENERATED_OPTIONS_ERROR";
                      fetchResponse: Response;
                  }
                | GeneralErrorResponse
            >(
                undefined,
                "/webauthn/options/signin",
                {
                    body: JSON.stringify({
                        email,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SIGN_IN_OPTIONS",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SIGN_IN_OPTIONS",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        signUp: async function ({ webauthnGeneratedOptionsId, credential, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      user: User;
                  }
                | GeneralErrorResponse
                | {
                      status: "SIGN_UP_NOT_ALLOWED";
                      reason: string;
                  }
                | { status: "INVALID_CREDENTIALS_ERROR" }
                | { status: "GENERATED_OPTIONS_NOT_FOUND_ERROR" }
                | { status: "INVALID_GENERATED_OPTIONS_ERROR" }
                | { status: "INVALID_AUTHENTICATOR_ERROR"; reason: string }
                | { status: "EMAIL_ALREADY_EXISTS_ERROR" }
            >(
                undefined,
                "/webauthn/signup",
                {
                    body: JSON.stringify({
                        webauthnGeneratedOptionsId,
                        credential,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SIGN_UP",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SIGN_UP",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        signIn: async function ({ webauthnGeneratedOptionsId, credential, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      user: User;
                  }
                | { status: "INVALID_CREDENTIALS_ERROR" }
                | {
                      status: "SIGN_IN_NOT_ALLOWED";
                      reason: string;
                  }
                | GeneralErrorResponse
            >(
                undefined,
                "/webauthn/signin",
                {
                    body: JSON.stringify({
                        webauthnGeneratedOptionsId,
                        credential,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SIGN_IN",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SIGN_IN",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
    };
}
