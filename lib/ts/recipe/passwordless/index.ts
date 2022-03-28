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

import { getNormalisedUserContext } from "../../utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import Recipe from "./recipe";
import {
    InputType,
    PasswordlessFlowType,
    PasswordlessUser,
    PostAPIHookContext,
    PreAPIHookContext,
    RecipeInterface,
} from "./types";

export default class RecipeWrapper {
    static init(config?: InputType) {
        return Recipe.init(config);
    }

    static async createCode(
        input:
            | { email: string; userContext?: any; options?: RecipeFunctionOptions }
            | { phoneNumber: string; userContext?: any; options?: RecipeFunctionOptions }
    ): Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }> {
        const recipe: Recipe = Recipe.getInstanceOrThrow();
        const normalisedUserContext = getNormalisedUserContext(input.userContext);

        const createCodeResponse = await recipe.recipeImplementation.createCode({
            ...input,
            userContext: normalisedUserContext,
        });

        await recipe.recipeImplementation.setLoginAttemptInfo({
            attemptInfo: {
                deviceId: createCodeResponse.deviceId,
                preAuthSessionId: createCodeResponse.preAuthSessionId,
                flowType: createCodeResponse.flowType,
            },
            userContext: normalisedUserContext,
        });

        return createCodeResponse;
    }

    static async resendCode(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        const recipe: Recipe = Recipe.getInstanceOrThrow();
        const normalisedUserContext = getNormalisedUserContext(input.userContext);

        const previousAttemptInfo = await recipe.recipeImplementation.getLoginAttemptInfo({
            userContext: normalisedUserContext,
        });

        return recipe.recipeImplementation.resendCode({
            ...input,
            userContext: normalisedUserContext,
            deviceId: previousAttemptInfo === undefined ? "" : previousAttemptInfo.deviceId,
            preAuthSessionId: previousAttemptInfo === undefined ? "" : previousAttemptInfo.preAuthSessionId,
        });
    }

    static async consumeCode(
        input:
            | {
                  userInputCode: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: any;
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
        const recipe: Recipe = Recipe.getInstanceOrThrow();
        const normalisedUserContext = getNormalisedUserContext(input.userContext);

        let additionalParams:
            | {
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
              }
            | {
                  linkCode: string;
                  preAuthSessionId: string;
              };

        if ("userInputCode" in input) {
            const attemptInfoFromStorage = await recipe.recipeImplementation.getLoginAttemptInfo({
                userContext: normalisedUserContext,
            });

            additionalParams = {
                userInputCode: input.userInputCode,
                deviceId: attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.deviceId,
                preAuthSessionId: attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.preAuthSessionId,
            };
        } else {
            const linkCode = recipe.recipeImplementation.getLinkCodeFromURL({
                userContext: input.userContext,
            });

            const preAuthSessionId = recipe.recipeImplementation.getPreAuthSessionIdFromURL({
                userContext: input.userContext,
            });

            additionalParams = {
                linkCode,
                preAuthSessionId,
            };
        }

        return recipe.recipeImplementation.consumeCode({
            userContext: normalisedUserContext,
            options: input.options,
            ...additionalParams,
        });
    }

    static doesEmailExist(input: { email: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.doesPhoneNumberExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signOut(input?: { userContext?: any }) {
        return Recipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const createCodeAndSetState = RecipeWrapper.createCode;
const resendCodeAndUpdateState = RecipeWrapper.resendCode;
const consumeCode = RecipeWrapper.consumeCode;
const doesEmailExist = RecipeWrapper.doesEmailExist;
const doesPhoneNumberExist = RecipeWrapper.doesPhoneNumberExist;
const signOut = RecipeWrapper.signOut;

export {
    init,
    createCodeAndSetState,
    resendCodeAndUpdateState,
    consumeCode,
    doesEmailExist,
    doesPhoneNumberExist,
    signOut,
    PasswordlessUser,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
