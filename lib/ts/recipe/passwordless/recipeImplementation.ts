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

import { WindowHandlerReference } from "../../windowHandler";
import Querier from "../../querier";
import { getHashFromLocation, getQueryParams, normaliseUserResponse } from "../../utils";
import Multitenancy from "../multitenancy/recipe";
import { RecipeFunctionOptions, RecipeImplementationInput } from "../recipeModule/types";
import { PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY } from "./constants";
import { PreAndPostAPIHookAction, RecipeInterface, PasswordlessFlowType } from "./types";
import { User } from "../../types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        createCode: async function (
            input:
                | { email: string; userContext: any; options?: RecipeFunctionOptions }
                | { phoneNumber: string; userContext: any; options?: RecipeFunctionOptions }
        ): Promise<
            | {
                  status: "OK";
                  deviceId: string;
                  preAuthSessionId: string;
                  flowType: PasswordlessFlowType;
                  fetchResponse: Response;
              }
            | {
                  status: "SIGN_IN_UP_NOT_ALLOWED";
                  reason: string;
                  fetchResponse: Response;
              }
        > {
            let bodyObj;

            if ("email" in input) {
                bodyObj = {
                    email: input.email,
                };
            }

            if ("phoneNumber" in input) {
                bodyObj = {
                    phoneNumber: input.phoneNumber,
                };
            }

            const { jsonBody, fetchResponse } = await querier.post<{
                status: "OK";
                deviceId: string;
                preAuthSessionId: string;
                flowType: PasswordlessFlowType;
            }>(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: input.userContext,
                }),
                "/signinup/code",
                { body: JSON.stringify(bodyObj) },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "PASSWORDLESS_CREATE_CODE",
                    userContext: input.userContext,
                    options: input.options,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "PASSWORDLESS_CREATE_CODE",
                    userContext: input.userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        resendCode: async function (input: {
            tenantId: string | undefined;
            deviceId: string;
            preAuthSessionId: string;
            shouldTryLinkingWithSessionUser: boolean | undefined;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK" | "RESTART_FLOW_ERROR";
            fetchResponse: Response;
        }> {
            const bodyObj = {
                deviceId: input.deviceId,
                preAuthSessionId: input.preAuthSessionId,
            };

            const { jsonBody, fetchResponse } = await querier.post<{
                status: "OK" | "RESTART_FLOW_ERROR";
            }>(
                input.tenantId,
                "/signinup/code/resend",
                { body: JSON.stringify(bodyObj) },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "PASSWORDLESS_RESEND_CODE",
                    userContext: input.userContext,
                    options: input.options,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "PASSWORDLESS_RESEND_CODE",
                    userContext: input.userContext,
                })
            );

            return {
                status: jsonBody.status,
                fetchResponse,
            };
        },
        consumeCode: async function (input): Promise<
            | {
                  status: "OK";
                  createdNewRecipeUser: boolean;
                  user: User;
                  fetchResponse: Response;
              }
            | {
                  status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
                  failedCodeInputAttemptCount: number;
                  maximumCodeInputAttempts: number;
                  fetchResponse: Response;
              }
            | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
            | { status: "SIGN_IN_UP_NOT_ALLOWED"; reason: string; fetchResponse: Response }
        > {
            let bodyObj;
            if ("userInputCode" in input) {
                bodyObj = {
                    userInputCode: input.userInputCode,
                    deviceId: input.deviceId,
                    preAuthSessionId: input.preAuthSessionId,
                    shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                };
            } else {
                bodyObj = {
                    linkCode: input.linkCode,
                    preAuthSessionId: input.preAuthSessionId,
                    shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                };
            }

            type ResponseType =
                | {
                      status: "OK";
                      createdNewRecipeUser: boolean;
                      user: User;
                  }
                | {
                      status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
                      failedCodeInputAttemptCount: number;
                      maximumCodeInputAttempts: number;
                  }
                | { status: "RESTART_FLOW_ERROR" }
                | { status: "SIGN_IN_UP_NOT_ALLOWED"; reason: string };

            const { jsonBody, fetchResponse } = await querier.post<ResponseType>(
                input.tenantId,
                "/signinup/code/consume",
                { body: JSON.stringify(bodyObj) },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "PASSWORDLESS_CONSUME_CODE",
                    userContext: input.userContext,
                    options: input.options,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "PASSWORDLESS_CONSUME_CODE",
                    userContext: input.userContext,
                })
            );

            if (jsonBody.status !== "OK") {
                return {
                    ...jsonBody,
                    fetchResponse,
                };
            }

            return {
                status: "OK",
                ...normaliseUserResponse("passwordless", jsonBody),
                fetchResponse,
            };
        },
        getTenantIdFromURL: function () {
            return getQueryParams("tenantId");
        },
        getLinkCodeFromURL: function () {
            return getHashFromLocation();
        },
        getPreAuthSessionIdFromURL: function () {
            const idFromQuery = getQueryParams("preAuthSessionId");

            if (idFromQuery === undefined) {
                return "";
            }

            return idFromQuery;
        },
        doesEmailExist: async function (input: {
            email: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            const { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                exists: boolean;
            }>(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: input.userContext,
                }),
                "/passwordless/email/exists",
                {},
                { email: input.email },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "EMAIL_EXISTS",
                    userContext: input.userContext,
                    options: input.options,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "EMAIL_EXISTS",
                    userContext: input.userContext,
                })
            );

            return {
                status: jsonBody.status,
                doesExist: jsonBody.exists,
                fetchResponse,
            };
        },
        doesPhoneNumberExist: async function (input: {
            phoneNumber: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            const { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                exists: boolean;
            }>(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: input.userContext,
                }),
                "/passwordless/phonenumber/exists",
                {},
                { phoneNumber: input.phoneNumber },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "PHONE_NUMBER_EXISTS",
                    userContext: input.userContext,
                    options: input.options,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "PHONE_NUMBER_EXISTS",
                    userContext: input.userContext,
                })
            );

            return {
                status: jsonBody.status,
                doesExist: jsonBody.exists,
                fetchResponse,
            };
        },
        getLoginAttemptInfo: async function <CustomLoginAttemptInfoProperties>(): Promise<
            | undefined
            | ({
                  deviceId: string;
                  tenantId?: string;
                  preAuthSessionId: string;
                  flowType: PasswordlessFlowType;
                  shouldTryLinkingWithSessionUser?: boolean;
              } & CustomLoginAttemptInfoProperties)
        > {
            const storedInfo = await WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(
                PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY
            );

            if (storedInfo === null) {
                return undefined;
            }

            try {
                return JSON.parse(storedInfo);
            } catch (ex) {
                return undefined;
            }
        },
        setLoginAttemptInfo: async function <CustomStateProperties>(input: {
            attemptInfo: {
                deviceId: string;
                tenantId?: string;
                preAuthSessionId: string;
                flowType: PasswordlessFlowType;
            } & CustomStateProperties;
            userContext: any;
        }): Promise<void> {
            await WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(
                PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY,
                JSON.stringify({
                    // This can make future changes/migrations a lot cleaner
                    version: 1,
                    ...input.attemptInfo,
                })
            );
        },
        clearLoginAttemptInfo: async function (): Promise<void> {
            WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(
                PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY
            );
        },
    };
}

export { getRecipeImplementation };
