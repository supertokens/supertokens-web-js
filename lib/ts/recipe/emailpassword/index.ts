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
import { RecipeInterface, PreAPIHookContext, PostAPIHookContext, UserInput } from "./types";
import Recipe from "./recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { getNormalisedUserContext } from "../../utils";
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
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
        passwordToken?: string;
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
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
     * Sign up a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "SIGN_UP_NOT_ALLOWED"}` if the user can't sign up because of security reasons
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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
        return Recipe.getInstanceOrThrow().recipeImplementation.signUp({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Sign in a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "WRONG_CREDENTIALS_ERROR"}` if the credentials are invalid
     *
     * @returns `{status: "SIGN_IN_NOT_ALLOWED"}` if the user can't sign in because of security reasons
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
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
        return Recipe.getInstanceOrThrow().recipeImplementation.signIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Check if an email exists
     *
     * @param email The email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
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
     * Reads and returns the reset password token from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
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
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "tenantId" query parameter from the current location
     */
    static getTenantIdFromURL(input?: { userContext?: any }): string | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL({
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
const signOut = RecipeWrapper.signOut;
const getResetPasswordTokenFromURL = RecipeWrapper.getResetPasswordTokenFromURL;
const getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;

export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    getTenantIdFromURL,
    signOut,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
