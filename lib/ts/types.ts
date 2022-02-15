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

/*
 * Recipe Module Manager Config Types.
 */

export type SuperTokensConfig = {
    /*
     * App Info configurations.
     */
    appInfo: AppInfoUserInput;

    /*
     * List of recipes for authentication and session management.
     */
    recipeList: CreateRecipeFunction<any>[];
};

export type CreateRecipeFunction<Action> = (
    appInfo: NormalisedAppInfo
) => RecipeModule<Action, NormalisedRecipeConfig<Action>>;

export type AppInfoUserInput = {
    /*
     * The name of the application.
     */
    appName: string;

    /*
     * The API that connects with the application.
     */
    apiDomain: string;

    /*
     * The domain on which the application runs.
     */
    websiteDomain: string;

    /*
     * The base path for SuperTokens middleware in the API.
     * Default to `/auth`
     */
    apiBasePath?: string;

    /*
     * The base path for SuperTokens middleware in the front end application.
     * Default to `/auth`
     */
    websiteBasePath?: string;

    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};

export type NormalisedAppInfo = {
    /*
     * The name of the application.
     */
    appName: string;

    /*
     * The API that connects with the application.
     */
    apiDomain: NormalisedURLDomain;

    /*
     * The domain on which the application runs.
     */
    websiteDomain: NormalisedURLDomain;

    /*
     * The base path for SuperTokens middleware in the API.
     * Default to `/auth`
     */
    apiBasePath: NormalisedURLPath;

    /*
     * The base path for SuperTokens middleware in the front end application.
     * Default to `/auth`
     */
    websiteBasePath: NormalisedURLPath;
};
