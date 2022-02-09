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
import { RecipeFunctionOptions } from "../recipeModule/types";
import { NormalisedInputType, PreAPIHookAction, RecipeInterface } from "./types";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        verifyEmail: async function ({
            token,
            config,
            options,
            userContext,
        }: {
            token?: string;
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            networkResponse: {
                jsonBody: any;
                fetchResponse: Response;
            };
        }> {
            token = token === undefined ? getQueryParams("token") : token;

            if (token === undefined) {
                token = "";
            }

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
                userContext,
                Querier.preparePreAPIHook<PreAPIHookAction>({
                    config,
                    action: "VERIFY_EMAIL",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook<PreAPIHookAction>({
                    config,
                    action: "VERIFY_EMAIL",
                })
            );

            return {
                status: jsonBody.status,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
            };
        },

        isEmailVerified: async function ({
            config,
            options,
            userContext,
        }: {
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "OK";
            isVerified: boolean;
            networkResponse: {
                jsonBody: any;
                fetchResponse: Response;
            };
        }> {
            const { jsonBody, fetchResponse } = await querier.get<{ status: "OK"; isVerified: boolean }>(
                "/user/email/verify",
                {},
                undefined,
                userContext,
                Querier.preparePreAPIHook<PreAPIHookAction>({
                    config,
                    action: "IS_EMAIL_VERIFIED",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook<PreAPIHookAction>({
                    config,
                    action: "IS_EMAIL_VERIFIED",
                })
            );

            return {
                status: "OK",
                isVerified: jsonBody.isVerified,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
            };
        },

        sendVerificationEmail: async function ({
            config,
            options,
            userContext,
        }: {
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
            networkResponse: {
                jsonBody: any;
                fetchResponse: Response;
            };
        }> {
            const { jsonBody, fetchResponse } = await querier.post<{ status: "OK" | "EMAIL_ALREADY_VERIFIED_ERROR" }>(
                "/user/email/verify/token",
                { body: JSON.stringify({}) },
                userContext,
                Querier.preparePreAPIHook<PreAPIHookAction>({
                    config,
                    action: "SEND_VERIFY_EMAIL",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook<PreAPIHookAction>({
                    config,
                    action: "SEND_VERIFY_EMAIL",
                })
            );

            return {
                status: jsonBody.status,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
            };
        },
    };
}
