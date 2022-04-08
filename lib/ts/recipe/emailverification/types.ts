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
import {
    NormalisedRecipeConfig,
    RecipeConfig,
    RecipeFunctionOptions,
    RecipePreAPIHookContext,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";

export type PreAndPostAPIHookAction = "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";

export type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export type PostAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;

export type InputTypeOverride = {
    functions?: (
        originalImplementation: RecipeInterface,
        builder: OverrideableBuilder<RecipeInterface>
    ) => RecipeInterface;
};

export type UserInput = {
    override?: InputTypeOverride;
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;

export type InputType = RecipeConfig<PreAndPostAPIHookAction> & UserInput;

export type NormalisedInputType = NormalisedRecipeConfig<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type RecipeInterface = {
    /**
     * Verify an email
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"}` if token is invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    verifyEmail: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;

    /**
     * Send an email to the user for verification.
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_ALREADY_VERIFIED_ERROR"}` if the email has already been verified
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    sendVerificationEmail: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;

    /**
     * Check if an email has been verified
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns `{status: "OK", isVerified: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    isEmailVerified: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;

    /**
     * Reads and returns the email verification token from the current URL
     *
     * @returns The "token" query parameter from the current location
     */
    getEmailVerificationTokenFromURL: (input: { userContext: any }) => string;
};
