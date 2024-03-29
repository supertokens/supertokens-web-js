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

import { UserInput, RecipeInterface, PreAPIHookContext, PostAPIHookContext, PreAndPostAPIHookAction } from "./types";
import Recipe from "./recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { getNormalisedUserContext } from "../../utils";
import { StateObject } from "../thirdparty/types";
import Multitenancy from "../multitenancy/recipe";
import * as PasswordlessUtilsFunctions from "../passwordless/utils";
import { PasswordlessFlowType } from "../passwordless/types";
import { User } from "../../types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    static signOut(input?: { userContext?: any }) {
        return Recipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewRecipeUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     * @returns `{status: "SIGN_IN_UP_NOT_ALLOWED", reason: string}` if signing in with this user is not allowed if because of account linking conflicts
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: User;
              createdNewRecipeUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.thirdPartySignInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param thirdPartyId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param frontendRedirectURI The URL that should be used for redirection after the third party flow finishes.
     *
     * @param redirectURIOnProviderDashboard (OPTIONAL) The redirect URL that is configured on the provider dashboard. Not required if the value is same as frontendRedirectURI
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        const userContext = getNormalisedUserContext(input.userContext);
        const recipe = Recipe.getInstanceOrThrow();
        const tenantId = await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext });

        return recipe.recipeImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
            tenantId,
            ...input,
            userContext,
        });
    }

    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    static getThirdPartyStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getThirdPartyStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Create and send a code to the user for passwordless auth
     *
     * @param email Email of the user, ignored if `phoneNumber` is provided
     *
     * @param phoneNumber Phone number of the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", deviceId, preAuthSessionId, flowType}` If successful
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async createPasswordlessCode(
        input:
            | { email: string; userContext?: any; options?: RecipeFunctionOptions }
            | { phoneNumber: string; userContext?: any; options?: RecipeFunctionOptions }
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
        const recipe: Recipe = Recipe.getInstanceOrThrow();

        return PasswordlessUtilsFunctions.createCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
        });
    }

    /**
     * Resend the code to the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if succesful
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async resendPasswordlessCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        const recipe: Recipe = Recipe.getInstanceOrThrow();

        return PasswordlessUtilsFunctions.resendCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
        });
    }

    /**
     * Log the user in using the input code or link code
     *
     * @param userInputCode Code that the user inputs
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", user, createdNewRecipeUser: bool}` if succesful
     *
     * @returns `{status: "INCORRECT_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is incorrect
     *
     * @returns `{status: "EXPIRED_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is expired
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     * @returns `{status: "SIGN_IN_UP_NOT_ALLOWED", reason: string}` if sign in or up is not allowed because of account-linking conflicts
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async consumePasswordlessCode(
        input?:
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
        const recipe: Recipe = Recipe.getInstanceOrThrow();

        return PasswordlessUtilsFunctions.consumeCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
        });
    }

    /**
     * Reads and returns the link code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The hash (#) property of the current URL
     */
    static getPasswordlessLinkCodeFromURL(input?: { userContext?: any }): string {
        return Recipe.getInstanceOrThrow().recipeImplementation.getPasswordlessLinkCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Reads and returns the pre auth session id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "preAuthSessionId" query parameter from the current URL
     */
    static getPasswordlessPreAuthSessionIdFromURL(input?: { userContext?: any }): string {
        return Recipe.getInstanceOrThrow().recipeImplementation.getPasswordlessPreAuthSessionIdFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Reads and returns the tenant id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "tenantId" query parameter from the current location
     */
    static getTenantIdFromURL(input?: { userContext?: any }): string | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Check if a user with the given email exists
     *
     * @param email Email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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

    /**
     * Check if a user with the given phone number exists
     *
     * @param phoneNumber Phone number to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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

    /**
     * Get information about the current login attempt from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns `{deviceId, preAuthSessionId, flowType}` if present, returns undefined otherwise
     */
    static getPasswordlessLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              tenantId: string | undefined;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.getPasswordlessLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Set information about the current login attempt to storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    static async setPasswordlessLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        const userContext = getNormalisedUserContext(input.userContext);
        const recipe = Recipe.getInstanceOrThrow();
        const tenantId = await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext });

        return recipe.recipeImplementation.setPasswordlessLoginAttemptInfo({
            attemptInfo: {
                tenantId,
                ...input.attemptInfo,
            },
            userContext,
        });
    }

    /**
     * Clear any information about login attempts from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    static clearPasswordlessLoginAttemptInfo(input?: { userContext?: any }): Promise<void> {
        return Recipe.getInstanceOrThrow().recipeImplementation.clearPasswordlessLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    RecipeWrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
const getThirdPartyStateAndOtherInfoFromStorage = RecipeWrapper.getThirdPartyStateAndOtherInfoFromStorage;
const thirdPartySignInAndUp = RecipeWrapper.thirdPartySignInAndUp;
const createPasswordlessCode = RecipeWrapper.createPasswordlessCode;
const resendPasswordlessCode = RecipeWrapper.resendPasswordlessCode;
const consumePasswordlessCode = RecipeWrapper.consumePasswordlessCode;
const doesPasswordlessUserEmailExist = RecipeWrapper.doesPasswordlessUserEmailExist;
const doesPasswordlessUserPhoneNumberExist = RecipeWrapper.doesPasswordlessUserPhoneNumberExist;
const getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;
const getPasswordlessLinkCodeFromURL = RecipeWrapper.getPasswordlessLinkCodeFromURL;
const getPasswordlessPreAuthSessionIdFromURL = RecipeWrapper.getPasswordlessPreAuthSessionIdFromURL;
const getPasswordlessLoginAttemptInfo = RecipeWrapper.getPasswordlessLoginAttemptInfo;
const setPasswordlessLoginAttemptInfo = RecipeWrapper.setPasswordlessLoginAttemptInfo;
const clearPasswordlessLoginAttemptInfo = RecipeWrapper.clearPasswordlessLoginAttemptInfo;
const signOut = RecipeWrapper.signOut;

export {
    init,
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
    getThirdPartyStateAndOtherInfoFromStorage,
    thirdPartySignInAndUp,
    createPasswordlessCode,
    resendPasswordlessCode,
    consumePasswordlessCode,
    doesPasswordlessUserEmailExist,
    doesPasswordlessUserPhoneNumberExist,
    signOut,
    getTenantIdFromURL,
    getPasswordlessLinkCodeFromURL,
    getPasswordlessPreAuthSessionIdFromURL,
    getPasswordlessLoginAttemptInfo,
    setPasswordlessLoginAttemptInfo,
    clearPasswordlessLoginAttemptInfo,
    PasswordlessFlowType,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
};
