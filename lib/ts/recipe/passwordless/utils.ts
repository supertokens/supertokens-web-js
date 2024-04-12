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

import { User } from "../../types";
import { getNormalisedUserContext } from "../../utils";
import { normaliseAuthRecipe } from "../authRecipe/utils";
import Multitenancy from "../multitenancy/recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { InputType, NormalisedInputType, PasswordlessFlowType, RecipeInterface } from "./types";

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

/**
 * These functions are helper functions so that the logic can be exposed from both
 * passwordless and thirdpartypasswordless recipes without having to duplicate code.
 * After removing the combination recipes these could be moved into the index file,
 * but it is not necessary
 * TODO
 */

export async function createCode(
    input:
        | {
              email: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
        | {
              phoneNumber: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
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
    const normalisedUserContext = getNormalisedUserContext(input.userContext);

    const tenantId = await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
        userContext: input.userContext,
    });
    const createCodeResponse = await input.recipeImplementation.createCode({
        ...input,
        userContext: normalisedUserContext,
    });

    if (createCodeResponse.status === "OK") {
        await input.recipeImplementation.setLoginAttemptInfo({
            attemptInfo: {
                tenantId,
                deviceId: createCodeResponse.deviceId,
                preAuthSessionId: createCodeResponse.preAuthSessionId,
                flowType: createCodeResponse.flowType,
            },
            userContext: normalisedUserContext,
        });
    }

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
        tenantId: previousAttemptInfo?.tenantId,
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
    const normalisedUserContext = getNormalisedUserContext(input.userContext);

    let additionalParams:
        | {
              tenantId: string | undefined;
              userInputCode: string;
              deviceId: string;
              preAuthSessionId: string;
          }
        | {
              tenantId: string | undefined;
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
            tenantId: attemptInfoFromStorage?.tenantId,
        };
    } else {
        const linkCode = input.recipeImplementation.getLinkCodeFromURL({
            userContext: input.userContext,
        });

        const tenantId = input.recipeImplementation.getTenantIdFromURL({
            userContext: input.userContext,
        });

        const preAuthSessionId = input.recipeImplementation.getPreAuthSessionIdFromURL({
            userContext: input.userContext,
        });

        additionalParams = {
            tenantId,
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
