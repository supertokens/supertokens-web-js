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
import { NormalisedRecipeConfig, RecipeConfig, RecipeFunctionOptions } from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";

export type PreAPIHookAction = "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";

export type PreAPIHookContext = {
    action: PreAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};

export type PostAPIHookContext = {
    action: PreAPIHookAction;
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: any;
};

export type InputType = RecipeConfig<PreAPIHookAction, PreAPIHookContext, PostAPIHookContext> & {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type NormalisedInputType = NormalisedRecipeConfig<PreAPIHookAction, PreAPIHookContext, PostAPIHookContext> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
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
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;

    sendVerificationEmail: (input: {
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;

    isEmailVerified: (input: {
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        isVerified: boolean;
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
};
