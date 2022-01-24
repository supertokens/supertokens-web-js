/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
import { getQueryParams } from "../../utils";
import { APIGeneralError, RecipeFunctionOptions } from "../recipeModule/types";
import { NormalisedInputType, RecipeInterface } from "./types";
import { executePreAPIHooks } from "./utils";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        verifyEmail: async function ({
            token,
            config,
            options,
        }: {
            token?: string;
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK" | "CUSTOM_RESPONSE";
            fetchResponse: Response;
        }> {
            token = token === undefined ? getQueryParams("token") : token;

            if (token === undefined) {
                token = "";
            }

            const { json, fetchResponse } = await querier.post<
                | {
                      status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
                  }
                | APIGeneralError
            >(
                "/user/email/verify",
                {
                    body: JSON.stringify({
                        method: "token",
                        token,
                    }),
                },
                (context) => {
                    return executePreAPIHooks({
                        config,
                        context,
                        action: "VERIFY_EMAIL",
                        options,
                    });
                }
            );

            if (json.status === "OK" || json.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                return {
                    status: json.status,
                    fetchResponse,
                };
            }

            return {
                status: "CUSTOM_RESPONSE",
                fetchResponse,
            };
        },

        isEmailVerified: async function ({
            config,
            options,
        }: {
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
        }): Promise<
            | {
                  status: "OK";
                  isVerified: boolean;
                  fetchResponse: Response;
              }
            | {
                  status: "CUSTOM_RESPONSE";
                  fetchResponse: Response;
              }
        > {
            const { json, fetchResponse } = await querier.get<{ status: "OK"; isVerified: boolean } | APIGeneralError>(
                "/user/email/verify",
                {},
                undefined,
                (context) => {
                    return executePreAPIHooks({
                        config,
                        context,
                        action: "IS_EMAIL_VERIFIED",
                        options,
                    });
                }
            );

            if (json.status === "OK") {
                return {
                    status: "OK",
                    isVerified: json.isVerified,
                    fetchResponse,
                };
            }

            return {
                status: "CUSTOM_RESPONSE",
                fetchResponse,
            };
        },

        sendVerificationEmail: async function ({
            config,
            options,
        }: {
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" | "CUSTOM_RESPONSE";
            fetchResponse: Response;
        }> {
            const { json, fetchResponse } = await querier.post<
                | {
                      status: "OK" | "EMAIL_ALREADY_VERIFIED_ERROR";
                  }
                | APIGeneralError
            >("/user/email/verify/token", { body: JSON.stringify({}) }, (context) => {
                return executePreAPIHooks({
                    config,
                    context,
                    action: "SEND_VERIFY_EMAIL",
                    options,
                });
            });

            if (json.status === "OK" || json.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                return {
                    status: json.status,
                    fetchResponse,
                };
            }

            return {
                status: "CUSTOM_RESPONSE",
                fetchResponse,
            };
        },
    };
}
