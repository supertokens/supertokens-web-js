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
import {
    NormalisedRecipeConfig,
    RecipeConfig,
    RecipeFunctionOptions,
    RecipePreAPIHookContext,
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

export type InputType = RecipeConfig<PreAndPostAPIHookAction> & {
    override?: InputTypeOverride;
};

export type NormalisedInputType = NormalisedRecipeConfig<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type RecipeInterface = {
    verifyEmail: (input: {
        token?: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;

    sendVerificationEmail: (input: {
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;

    isEmailVerified: (input: {
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
};
