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
import { normaliseAuthRecipe } from "../authRecipe/utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { InputType, NormalisedInputType, PasswordlessFlowType, PasswordlessUser, RecipeInterface } from "./types";

export function normaliseUserInput(config: InputType): NormalisedInputType {
    let override = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseAuthRecipe(config),
        override,
    };
}

export async function createCode(
    input:
        | { email: string; userContext?: any; options?: RecipeFunctionOptions; recipeImplementation: RecipeInterface }
        | {
              phoneNumber: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
): Promise<{
    status: "OK";
    deviceId: string;
    preAuthSessionId: string;
    flowType: PasswordlessFlowType;
    fetchResponse: Response;
}> {
    const normalisedUserContext = getNormalisedUserContext(input.userContext);

    const createCodeResponse = await input.recipeImplementation.createCode({
        ...input,
        userContext: normalisedUserContext,
    });

    await input.recipeImplementation.setLoginAttemptInfo({
        attemptInfo: {
            deviceId: createCodeResponse.deviceId,
            preAuthSessionId: createCodeResponse.preAuthSessionId,
            flowType: createCodeResponse.flowType,
        },
        userContext: normalisedUserContext,
    });

    return createCodeResponse;
}

export async function resendCode(input: {
    userContext?: any;
    options?: RecipeFunctionOptions;
    recipeImplementation: RecipeInterface;
}): Promise<{
    status: "OK" | "RESTART_FLOW_ERROR";
    fetchResponse: Response;
}> {
    const normalisedUserContext = getNormalisedUserContext(input.userContext);

    const previousAttemptInfo = await input.recipeImplementation.getLoginAttemptInfo({
        userContext: normalisedUserContext,
    });

    /**
     * If previousAttemptInfo is undefined then local storage was probably cleared by another tab.
     * In this case we use empty strings when calling the API because we want to
     * return "RESTART_FLOW_ERROR"
     */
    return input.recipeImplementation.resendCode({
        ...input,
        userContext: normalisedUserContext,
        deviceId: previousAttemptInfo === undefined ? "" : previousAttemptInfo.deviceId,
        preAuthSessionId: previousAttemptInfo === undefined ? "" : previousAttemptInfo.preAuthSessionId,
    });
}

export async function consumeCode(
    input:
        | {
              userInputCode: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
        | {
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
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
        const attemptInfoFromStorage = await input.recipeImplementation.getLoginAttemptInfo({
            userContext: normalisedUserContext,
        });

        /**
         * If attemptInfoFromStorage is undefined then local storage was probably cleared by another tab.
         * In this case we use empty strings when calling the API because we want to
         * return "RESTART_FLOW_ERROR"
         *
         * Note: We dont do this for the linkCode flow because that does not depend on local storage.
         */

        additionalParams = {
            userInputCode: input.userInputCode,
            deviceId: attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.deviceId,
            preAuthSessionId: attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.preAuthSessionId,
        };
    } else {
        const linkCode = input.recipeImplementation.getLinkCodeFromURL({
            userContext: input.userContext,
        });

        const preAuthSessionId = input.recipeImplementation.getPreAuthSessionIdFromURL({
            userContext: input.userContext,
        });

        additionalParams = {
            linkCode,
            preAuthSessionId,
        };
    }

    return input.recipeImplementation.consumeCode({
        userContext: normalisedUserContext,
        options: input.options,
        ...additionalParams,
    });
}
