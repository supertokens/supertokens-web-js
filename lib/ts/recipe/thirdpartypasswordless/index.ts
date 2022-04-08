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

import { InputType, RecipeInterface, PreAPIHookContext, PostAPIHookContext, PreAndPostAPIHookAction } from "./types";
import Recipe from "./recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { getNormalisedUserContext } from "../../utils";
import { UserType as ThirdPartyUserType } from "../authRecipeWithEmailVerification/types";
import * as PasswordlessUtilsFunctions from "../passwordless/utils";
import { PasswordlessFlowType, PasswordlessUser } from "../passwordless/types";
import { StateObject } from "../thirdparty/types";

export default class RecipeWrapper {
    static init(config?: InputType) {
        return Recipe.init(config);
    }

    static signOut(input?: { userContext?: any }) {
        return Recipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: ThirdPartyUserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.thirdPartySignInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        userContext?: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        return Recipe.getInstanceOrThrow().recipeImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
            {
                ...input,
                userContext: getNormalisedUserContext(input.userContext),
            }
        );
    }

    static async createPasswordlessCode(
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

        return PasswordlessUtilsFunctions.createCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
        });
    }

    static async resendPasswordlessCode(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        const recipe: Recipe = Recipe.getInstanceOrThrow();

        return PasswordlessUtilsFunctions.resendCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
        });
    }

    static async consumePasswordlessCode(
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

        return PasswordlessUtilsFunctions.consumeCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
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

    static doesPasswordlessUserEmailExist(input: {
        email: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.doesPasswordlessUserEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesPasswordlessUserPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.doesPasswordlessUserPhoneNumberExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    RecipeWrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
const thirdPartySignInAndUp = RecipeWrapper.thirdPartySignInAndUp;
const verifyEmail = RecipeWrapper.verifyEmail;
const sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
const isEmailVerified = RecipeWrapper.isEmailVerified;
const createPasswordlessCode = RecipeWrapper.createPasswordlessCode;
const resendPasswordlessCode = RecipeWrapper.resendPasswordlessCode;
const consumePasswordlessCode = RecipeWrapper.consumePasswordlessCode;
const doesPasswordlessUserEmailExist = RecipeWrapper.doesPasswordlessUserEmailExist;
const doesPasswordlessUserPhoneNumberExist = RecipeWrapper.doesPasswordlessUserPhoneNumberExist;
const signOut = RecipeWrapper.signOut;

export {
    init,
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
    thirdPartySignInAndUp,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    createPasswordlessCode,
    resendPasswordlessCode,
    consumePasswordlessCode,
    doesPasswordlessUserEmailExist,
    doesPasswordlessUserPhoneNumberExist,
    signOut,
    PasswordlessUser,
    PasswordlessFlowType,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    StateObject,
    ThirdPartyUserType,
};
