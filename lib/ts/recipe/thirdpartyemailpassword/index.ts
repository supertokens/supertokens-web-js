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

    static signOut(input?: { userContext?: any }) {
        return Recipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static doesSessionExist(input: { userContext: any }): Promise<boolean> {
        return Recipe.getInstanceOrThrow().doesSessionExist({
            userContext: input.userContext,
        });
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

    static emailPasswordSignUp(input: {
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
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.emailPasswordSignUp({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static emailPasswordSignIn(input: {
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
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.emailPasswordSignIn({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.thirdPartySignInAndUp({
            ...input,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input?.userContext),
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
const emailPasswordSignUp = RecipeWrapper.emailPasswordSignUp;
const emailPasswordSignIn = RecipeWrapper.emailPasswordSignIn;
const thirdPartySignInAndUp = RecipeWrapper.thirdPartySignInAndUp;
const getAuthorizationURLWithQueryParamsAndSetState = RecipeWrapper.getAuthorizationURLWithQueryParamsAndSetState;
const verifyEmail = RecipeWrapper.verifyEmail;
const sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
const isEmailVerified = RecipeWrapper.isEmailVerified;

const signOut = RecipeWrapper.signOut;
const doesSessionExist = RecipeWrapper.doesSessionExist;

export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    doesEmailExist,
    emailPasswordSignUp,
    emailPasswordSignIn,
    thirdPartySignInAndUp,
    getAuthorizationURLWithQueryParamsAndSetState,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    signOut,
    doesSessionExist,
    UserType,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
