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
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { NormalisedRecipeConfig } from "./recipe/recipeModule/types";
import { StorageHandler } from "./common/storage/types";
import { CookieHandlerInput } from "supertokens-website/utils/cookieHandler/types";
import { WindowHandlerInput } from "supertokens-website/utils/windowHandler/types";

/**
 * The configuration object to be passed when calling SuperTokens.init
 */
export type SuperTokensConfig = {
    /**
     * The information specific to your application, this helps the SDK understand
     * how SuperTokens is setup in your system
     */
    appInfo: AppInfoUserInput;

    /**
     * List of recipes that you want to use. Refer to the documentation for the recipe
     * that you want to use to know how this property should be set.
     */
    recipeList: CreateRecipeFunction<any>[];

    /**
     * Custom handlers that the SDK should use whn accessing the Web Storage API.
     *
     * In most cases you should not need to provide these. When provided, the SDK
     * will rely on these functions instead of using the Window.Storage API directly.
     *
     * When using this feature, take extra care to use the correct function version (sync/async).
     * The interface by default uses all storage methods as async, but specific parts of the
     * SDK may rely on using the sync versions.
     */
    storageHandlers?: StorageHandlerInput;

    /**
     * Custom handlers that the SDK should use when trying to read or write to document.cookie
     *
     * In most cases you should not need to provide these. When provided, the SDK will rely on
     * these functions instead of using document.cookie directly
     *
     * When using this feature, take extra care to use the correct function version (async/async).
     * The interface by default uses async versions of the functions when possible but specific parts
     * of the SDK may rely on using the sync versions instead.
     */
    cookieHandler?: CookieHandlerInput;

    /**
     * Custom handlers that the SDK should use when trying to access Window APIs
     *
     * In most cases you should not need to provide these. When provided, the SDK will rely on
     * these functions instead of using any Window APIs directly
     */
    windowHandler?: WindowHandlerInput;
};

export type CreateRecipeFunction<Action> = (
    appInfo: NormalisedAppInfo,
    storageHandlers: NormalisedStorageHandlers
) => RecipeModule<Action, NormalisedRecipeConfig<Action>>;

export type AppInfoUserInput = {
    /**
     * The name of your application
     */
    appName: string;

    /**
     * The domain at which you host your backend SDKs. This is used by the SDK when making
     * network requests. For example if your API server is running on http://localhost:8080
     * then when calling SuperTokens.init the value for `apiDomain` should be set to
     * `http://localhost:8080`
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiDomain: string;

    /**
     * The path at which the SuperTokens APIs are exposed by your backend. Defaults to `/auth`.
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiBasePath?: string;

    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};

/**
 * Normalised version of the config passed to SuperTokens.init
 */
export type NormalisedAppInfo = {
    /**
     * The name of your application
     */
    appName: string;

    /**
     * The domain at which you host your backend SDKs. This is used by the SDK when making
     * network requests. For example if your API server is running on http://localhost:8080
     * then when calling SuperTokens.init the value for `apiDomain` should be set to
     * `http://localhost:8080`
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiDomain: NormalisedURLDomain;

    /**
     * The path at which the SuperTokens APIs are exposed by your backend. Defaults to `/auth`.
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiBasePath: NormalisedURLPath;
};

export type StorageHandlerFunction = (original: StorageHandler) => StorageHandler;

export type StorageHandlerInput = {
    /**
     * Handlers to be used as a replacement for `window.sessionStorage`
     */
    sessionStorage?: StorageHandlerFunction;
    /**
     * Handlers to be used as a replacement for `window.localStorage`
     */
    localStorage?: StorageHandlerFunction;
};

export type NormalisedStorageHandlers = {
    /**
     * Handlers to be used as a replacement for `window.sessionStorage`
     */
    sessionStorage: StorageHandler;
    /**
     * Handlers to be used as a replacement for `window.localStorage`
     */
    localStorage: StorageHandler;
};
