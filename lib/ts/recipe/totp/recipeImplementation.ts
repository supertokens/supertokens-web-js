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
import { RecipeInterface } from "./types";
import { RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction } from "./types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        createDevice: async function ({ deviceName, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      deviceName: string;
                      secret: string;
                      qrCodeString: string;
                  }
                | { status: "DEVICE_ALREADY_EXISTS_ERROR" }
            >(
                undefined,
                "/totp/device",
                {
                    body: JSON.stringify({
                        deviceName,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "CREATE_DEVICE",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "CREATE_DEVICE",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        verifyCode: async function ({ totp, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | { status: "OK" }
                | {
                      status: "INVALID_TOTP_ERROR";
                      currentNumberOfFailedAttempts: number;
                      maxNumberOfFailedAttempts: number;
                  }
                | { status: "LIMIT_REACHED_ERROR"; retryAfterMs: number }
            >(
                undefined,
                "/totp/verify",
                {
                    body: JSON.stringify({
                        totp,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "VERIFY_CODE",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "VERIFY_CODE",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        verifyDevice: async function ({ deviceName, totp, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | { status: "OK"; wasAlreadyVerified: boolean }
                | { status: "UNKNOWN_DEVICE_ERROR" }
                | {
                      status: "INVALID_TOTP_ERROR";
                      currentNumberOfFailedAttempts: number;
                      maxNumberOfFailedAttempts: number;
                  }
                | { status: "LIMIT_REACHED_ERROR"; retryAfterMs: number }
            >(
                undefined,
                "/totp/device/verify",
                {
                    body: JSON.stringify({
                        deviceName,
                        totp,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "VERIFY_DEVICE",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "VERIFY_DEVICE",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        removeDevice: async function ({ deviceName, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<{ status: "OK"; didDeviceExist: boolean }>(
                undefined,
                "/totp/device/remove",
                {
                    body: JSON.stringify({
                        deviceName,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "REMOVE_DEVICE",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "REMOVE_DEVICE",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        listDevices: async function ({ options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                devices: { name: string; period: number; skew: number; verified: boolean }[];
            }>(
                undefined,
                "/totp/device/list",
                {},
                undefined,
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "LIST_DEVICES",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    userContext,
                    action: "LIST_DEVICES",
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
    };
}

export { getRecipeImplementation };
