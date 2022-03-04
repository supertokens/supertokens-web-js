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
import { InputType, RecipeInterface, PreAPIHookContext, PostAPIHookContext } from "./types";
import Recipe from "./recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { getNormalisedUserContext } from "../../utils";
import { UserType } from "../authRecipeWithEmailVerification/types";

export default class RecipeWrapper {
    static init(config?: InputType) {
        return Recipe.init(config);
    }

    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.submitNewPassword({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.sendPasswordResetEmail({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.signUp({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.signIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async verifyEmail(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().emailVerificationRecipe.recipeImplementation.verifyEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async sendVerificationEmail(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().emailVerificationRecipe.recipeImplementation.sendVerificationEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async isEmailVerified(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().emailVerificationRecipe.recipeImplementation.isEmailVerified({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const submitNewPassword = RecipeWrapper.submitNewPassword;
const sendPasswordResetEmail = RecipeWrapper.sendPasswordResetEmail;
const signUp = RecipeWrapper.signUp;
const signIn = RecipeWrapper.signIn;
const doesEmailExist = RecipeWrapper.doesEmailExist;
const verifyEmail = RecipeWrapper.verifyEmail;
const sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
const isEmailVerified = RecipeWrapper.isEmailVerified;

export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    UserType,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
