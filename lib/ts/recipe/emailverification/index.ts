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
import { InputType, RecipeInterface, PreAPIHookContext } from "./types";
import Recipe from "./recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";

export default class RecipeWrapper {
    static init(config: InputType) {
        return Recipe.init(config);
    }

    static verifyEmail(input: { token?: string; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "CUSTOM_RESPONSE" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }> {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.verifyEmail({
            token: input.token,
            options: input.options,
            config: recipeInstance.config,
        });
    }

    static sendVerificationEmail(input: { options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" | "CUSTOM_RESPONSE";
        fetchResponse: Response;
    }> {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.sendVerificationEmail({
            options: input.options,
            config: recipeInstance.config,
        });
    }

    static isEmailVerified(input: { options?: RecipeFunctionOptions }): Promise<
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
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.isEmailVerified({
            options: input.options,
            config: recipeInstance.config,
        });
    }
}

const init = RecipeWrapper.init;
const verifyEmail = RecipeWrapper.verifyEmail;
const sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
const isEmailVerified = RecipeWrapper.isEmailVerified;

export {
    init,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
};
