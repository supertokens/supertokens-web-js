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
import { RecipeFunctionOptions, UserType } from "../emailpassword";
import Recipe from "./recipe";
import { InputType, RecipeInterface, PreAPIHookContext, PostAPIHookContext } from "./types";

export default class RecipeWrapper {
    static init(config?: InputType) {
        return Recipe.init(config);
    }

    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
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
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.submitNewPassword({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
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
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.sendPasswordResetEmail({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.doesEmailExist({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signInAndUp(
        input:
            | {
                  type: "thirdparty";
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  type: "emailpassword";
                  isSignIn: boolean;
                  formFields: {
                      id: string;
                      value: string;
                  }[];
                  options?: RecipeFunctionOptions;
                  userContext?: any;
              }
    ): Promise<
        | {
              type: "emailpassword" | "thirdparty";
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              type: "thirdparty";
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        const recipeInstance = Recipe.getInstanceOrThrow();

        if (input.type === "emailpassword") {
            return recipeInstance.recipeImplementation.signInAndUp({
                ...input,
                config: recipeInstance.emailPasswordRecipe.config,
                userContext: getNormalisedUserContext(input.userContext),
            });
        }

        return recipeInstance.recipeImplementation.signInAndUp({
            ...input,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getAuthorizationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        userContext?: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.getAuthorizationURLWithQueryParamsAndSetState({
            ...input,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async verifyEmail(input: { token?: string; options?: RecipeFunctionOptions; userContext: any }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }> {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.emailVerificationRecipe.recipeImplementation.verifyEmail({
            ...input,
            config: recipeInstance.emailVerificationRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async sendVerificationEmail(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.emailVerificationRecipe.recipeImplementation.sendVerificationEmail({
            ...input,
            config: recipeInstance.emailVerificationRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async isEmailVerified(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.emailVerificationRecipe.recipeImplementation.isEmailVerified({
            ...input,
            config: recipeInstance.emailVerificationRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const submitNewPassword = RecipeWrapper.submitNewPassword;
const sendPasswordResetEmail = RecipeWrapper.sendPasswordResetEmail;
const doesEmailExist = RecipeWrapper.doesEmailExist;
const signInAndUp = RecipeWrapper.signInAndUp;
const getAuthorizationURLWithQueryParamsAndSetState = RecipeWrapper.getAuthorizationURLWithQueryParamsAndSetState;
const verifyEmail = RecipeWrapper.verifyEmail;
const sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
const isEmailVerified = RecipeWrapper.isEmailVerified;

export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    doesEmailExist,
    signInAndUp,
    getAuthorizationURLWithQueryParamsAndSetState,
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
