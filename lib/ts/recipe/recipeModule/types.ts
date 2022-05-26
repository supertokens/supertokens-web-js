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
import { NormalisedAppInfo } from "../../types";

/**
 * This context object is passed as an argument to pre API hook functions.
 *
 * You can use this object to access information about network requests
 * and SDK actions.
 */
export type RecipePreAPIHookContext<Action> = {
    /**
     * The configuration for the network request. You can use this to access
     * information such as request headers, body etc
     */
    requestInit: RequestInit;

    /**
     * The URL for the network request
     */
    url: string;

    /**
     * Use this to identify what action the SDK is performing.
     * This can be useful for conditionally handling this hook.
     */
    action: Action;

    /**
     * Refer to the documentation for the recipe you are using
     */
    userContext: any;
};

/**
 * This context object is passed to post API hook functions.
 *
 * You can use this object to read information from the network
 * response such as custom response properties
 */
export type RecipePostAPIHookContext<Action> = {
    action: Action;
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: any;
};

export type PreAPIHookFunction = (context: {
    requestInit: RequestInit;
    url: string;
}) => Promise<{ url: string; requestInit: RequestInit }>;

export type PostAPIHookFunction = (context: {
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
}) => Promise<void>;

export type RecipePreAPIHookFunction<Action> = (
    context: RecipePreAPIHookContext<Action>
) => Promise<{ url: string; requestInit: RequestInit }>;

export type RecipePostAPIHookFunction<Action> = (context: RecipePostAPIHookContext<Action>) => Promise<void>;

export type UserInput<Action> = {
    /**
     * Pre API hooks allow yuo to do some processing before the SuperTokens SDK makes
     * a network request. You can use the context object to gain access to additional
     * information about the request.
     *
     * Pre API Hooks also allow you to modify request parameters by returning a custom
     * request config.
     */
    preAPIHook?: RecipePreAPIHookFunction<Action>;

    /**
     * Post API hooks allow you to do some processing after immediately after a network
     * request has finished. The context object allows you to access the response properties.
     *
     * Example usage of this would be to handle custom response properties from your backend APIs
     * that the SDK does not expose directly
     */
    postAPIHook?: RecipePostAPIHookFunction<Action>;
};

export type RecipeConfig<Action> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
} & UserInput<Action>;

export type NormalisedRecipeConfig<Action> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<Action>;
    postAPIHook: RecipePostAPIHookFunction<Action>;
};

/**
 * For the options object passed to recipe functions, we do not need a postAPIHook.
 *
 * This is because these functions will be called manually, so the user always knows which API is called (making the
 * postAPIHook redundant). They can consume the networkResponse returned by recipe functions as a way to handle post
 * API logic
 */
export type RecipeFunctionOptions = {
    preAPIHook?: (input: {
        url: string;
        requestInit: RequestInit;
        userContext: any;
    }) => Promise<{ url: string; requestInit: RequestInit }>;
};

export type RecipeImplementationInput<PrePostAPIHookAction> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PrePostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PrePostAPIHookAction>;
};
