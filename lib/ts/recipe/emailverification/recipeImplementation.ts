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
import { getQueryParams } from "../../utils";
import { RecipeFunctionOptions, RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction, RecipeInterface } from "./types";

export default function getRecipeImplementation(
    recipeImpleInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImpleInput.recipeId, recipeImpleInput.appInfo);
    return {
        verifyEmail: async function ({
            options,
            userContext,
        }: {
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const token = this.getEmailVerificationTokenFromURL({
                userContext,
            });

            const { jsonBody, fetchResponse } = await querier.post<{
                status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
            }>(
                "/user/email/verify",
                {
                    body: JSON.stringify({
                        method: "token",
                        token,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImpleInput.preAPIHook,
                    action: "VERIFY_EMAIL",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImpleInput.postAPIHook,
                    userContext,
                    action: "VERIFY_EMAIL",
                })
            );

            return {
                status: jsonBody.status,
                fetchResponse,
            };
        },

        isEmailVerified: async function ({
            options,
            userContext,
        }: {
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "OK";
            isVerified: boolean;
            fetchResponse: Response;
        }> {
            const { jsonBody, fetchResponse } = await querier.get<{ status: "OK"; isVerified: boolean }>(
                "/user/email/verify",
                {},
                undefined,
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImpleInput.preAPIHook,
                    action: "IS_EMAIL_VERIFIED",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImpleInput.postAPIHook,
                    userContext,
                    action: "IS_EMAIL_VERIFIED",
                })
            );

            return {
                status: "OK",
                isVerified: jsonBody.isVerified,
                fetchResponse,
            };
        },

        sendVerificationEmail: async function ({
            options,
            userContext,
        }: {
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const { jsonBody, fetchResponse } = await querier.post<{ status: "OK" | "EMAIL_ALREADY_VERIFIED_ERROR" }>(
                "/user/email/verify/token",
                { body: JSON.stringify({}) },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImpleInput.preAPIHook,
                    action: "SEND_VERIFY_EMAIL",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImpleInput.postAPIHook,
                    userContext,
                    action: "SEND_VERIFY_EMAIL",
                })
            );

            return {
                status: jsonBody.status,
                fetchResponse,
            };
        },

        getEmailVerificationTokenFromURL: function (): string {
            const token = getQueryParams("token");

            if (token === undefined) {
                return "";
            }

            return token;
        },
    };
}
