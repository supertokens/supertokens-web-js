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

import { WindowHandlerReference } from "supertokens-website/utils/windowHandler";
import Querier from "../../querier";
import { getQueryParams } from "../../utils";
import { RecipeFunctionOptions, RecipeImplementationInput } from "../recipeModule/types";
import { PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY } from "./constants";
import { PreAndPostAPIHookAction, RecipeInterface, PasswordlessFlowType, PasswordlessUser } from "./types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        createCode: async function (
            input:
                | { email: string; userContext: any; options?: RecipeFunctionOptions }
                | { phoneNumber: string; userContext: any; options?: RecipeFunctionOptions }
        ): Promise<{
            status: "OK";
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
            fetchResponse: Response;
        }> {
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
            deviceId: string;
            preAuthSessionId: string;
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
        consumeCode: async function (
            input:
                | {
                      userInputCode: string;
                      deviceId: string;
                      preAuthSessionId: string;
                      userContext: any;
                      options?: RecipeFunctionOptions;
                  }
                | {
                      preAuthSessionId: string;
                      linkCode: string;
                      userContext: any;
                      options?: RecipeFunctionOptions;
                  }
        ): Promise<
            | {
                  status: "OK";
                  createdUser: boolean;
                  user: PasswordlessUser;
                  fetchResponse: Response;
              }
            | {
                  status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
                  failedCodeInputAttemptCount: number;
                  maximumCodeInputAttempts: number;
                  fetchResponse: Response;
              }
            | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
        > {
            let bodyObj;
            if ("userInputCode" in input) {
                bodyObj = {
                    userInputCode: input.userInputCode,
                    deviceId: input.deviceId,
                    preAuthSessionId: input.preAuthSessionId,
                };
            } else {
                bodyObj = {
                    linkCode: input.linkCode,
                    preAuthSessionId: input.preAuthSessionId,
                };
            }

            type ResponseType =
                | {
                      status: "OK";
                      createdUser: boolean;
                      user: {
                          id: string;
                          email?: string;
                          phoneNumber?: string;
                          timeJoined: number;
                      };
                  }
                | {
                      status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
                      failedCodeInputAttemptCount: number;
                      maximumCodeInputAttempts: number;
                  }
                | { status: "RESTART_FLOW_ERROR" };

            const { jsonBody, fetchResponse } = await querier.post<ResponseType>(
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

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        getLinkCodeFromURL: function () {
            return WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash();
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
                "/signup/email/exists",
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
                "/signup/phoneNumber/exists",
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
                  preAuthSessionId: string;
                  flowType: PasswordlessFlowType;
              } & CustomLoginAttemptInfoProperties)
        > {
            const storedInfo = await recipeImplInput.storageHandlers.localStorage.getItem(
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
                preAuthSessionId: string;
                flowType: PasswordlessFlowType;
            } & CustomStateProperties;
            userContext: any;
        }): Promise<void> {
            await recipeImplInput.storageHandlers.localStorage.setItem(
                PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY,
                JSON.stringify({
                    // This can make future changes/migrations a lot cleaner
                    version: 1,
                    ...input.attemptInfo,
                })
            );
        },
        clearLoginAttemptInfo: async function (): Promise<void> {
            recipeImplInput.storageHandlers.localStorage.removeItem(PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY);
        },
    };
}

export { getRecipeImplementation };
