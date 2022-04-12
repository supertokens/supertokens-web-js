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
    PasswordlessFlowType,
    PasswordlessUser,
    PostAPIHookContext,
    PreAPIHookContext,
    RecipeInterface,
    PreAndPostAPIHookAction,
    UserInput,
} from "./types";
import * as UtilFunctions from "./utils";
export default class RecipeWrapper {
    static init(config?: UserInput) {
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

        return UtilFunctions.createCode({
            ...input,
            recipeImplementation: recipe.recipeImplementation,
        });
    }

    static async resendCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        const recipe: Recipe = Recipe.getInstanceOrThrow();

        return UtilFunctions.resendCode({
            ...input,
            recipeImplementation: recipe.recipeImplementation,
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

        return UtilFunctions.consumeCode({
            ...input,
            recipeImplementation: recipe.recipeImplementation,
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
const createCode = RecipeWrapper.createCode;
const resendCode = RecipeWrapper.resendCode;
const consumeCode = RecipeWrapper.consumeCode;
const doesEmailExist = RecipeWrapper.doesEmailExist;
const doesPhoneNumberExist = RecipeWrapper.doesPhoneNumberExist;
const signOut = RecipeWrapper.signOut;

export {
    init,
    createCode,
    resendCode,
    consumeCode,
    doesEmailExist,
    doesPhoneNumberExist,
    signOut,
    PasswordlessUser,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
};
