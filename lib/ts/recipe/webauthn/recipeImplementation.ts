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
import { GeneralErrorResponse } from "../../types";

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
    };
}
