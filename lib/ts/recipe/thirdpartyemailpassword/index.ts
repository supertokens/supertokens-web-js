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
import Multitenancy from "../multitenancy/recipe";
import { StateObject } from "../thirdparty/types";
import Recipe from "./recipe";
import { UserInput, RecipeInterface, PreAPIHookContext, PostAPIHookContext } from "./types";
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
     * Submit a new password for the user
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more)
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "RESET_PASSWORD_INVALID_TOKEN_ERROR"}` if the token in the URL is invalid
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the form field values are incorrect
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static submitNewPassword(input: {
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
              status: "RESET_PASSWORD_INVALID_TOKEN_ERROR";
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

    /**
     * Send an email to the user for password reset
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more)
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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
              status: "PASSWORD_RESET_NOT_ALLOWED";
              reason: string;
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

    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Check if an email exists
     *
     * @param email The email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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

    /**
     * Sign up a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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
              user: User;
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
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.emailPasswordSignUp({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Sign in a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "WRONG_CREDENTIALS_ERROR"}` if the credentials are invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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
              user: User;
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
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.emailPasswordSignIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Reads and returns the reset password token from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "token" query parameter from the current location
     */
    static getResetPasswordTokenFromURL(input?: { userContext?: any }): string {
        return Recipe.getInstanceOrThrow().recipeImplementation.getResetPasswordTokenFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Reads and returns the tenant id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
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
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewRecipeUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     * @returns `{status: "SIGN_IN_UP_NOT_ALLOWED", reason: string}` if signing in with this user is not allowed if because of account linking conflicts
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async getAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        const userContext = getNormalisedUserContext(input.userContext);
        const tenantId = await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext });
        return Recipe.getInstanceOrThrow().recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
            tenantId,
            ...input,
            userContext,
        });
    }
}

const init = RecipeWrapper.init;
const submitNewPassword = RecipeWrapper.submitNewPassword;
const sendPasswordResetEmail = RecipeWrapper.sendPasswordResetEmail;
const getStateAndOtherInfoFromStorage = RecipeWrapper.getStateAndOtherInfoFromStorage;
const doesEmailExist = RecipeWrapper.doesEmailExist;
const emailPasswordSignUp = RecipeWrapper.emailPasswordSignUp;
const emailPasswordSignIn = RecipeWrapper.emailPasswordSignIn;
const thirdPartySignInAndUp = RecipeWrapper.thirdPartySignInAndUp;
const getAuthorisationURLWithQueryParamsAndSetState = RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState;
const getResetPasswordTokenFromURL = RecipeWrapper.getResetPasswordTokenFromURL;
const getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;
const signOut = RecipeWrapper.signOut;

export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    getStateAndOtherInfoFromStorage,
    doesEmailExist,
    emailPasswordSignUp,
    emailPasswordSignIn,
    thirdPartySignInAndUp,
    getAuthorisationURLWithQueryParamsAndSetState,
    signOut,
    getResetPasswordTokenFromURL,
    getTenantIdFromURL,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
