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

import { normaliseStorageHandlerInput } from "./common/storage/utils";
import RecipeModule from "./recipe/recipeModule";
import { NormalisedAppInfo, NormalisedStorageHandlers, SuperTokensConfig } from "./types";
import { checkForSSRErrorAndAppendIfNeeded, isTest, normaliseInputAppInfoOrThrowError } from "./utils";
import { CookieHandlerReference } from "supertokens-website/utils/cookieHandler";
import { WindowHandlerReference } from "supertokens-website/utils/windowHandler";

export default class SuperTokens {
    /*
     * Static Attributes.
     */
    private static instance?: SuperTokens;

    /*
     * Instance Attributes.
     */
    appInfo: NormalisedAppInfo;
    storageHandlers: NormalisedStorageHandlers;
    recipeList: RecipeModule<any, any>[] = [];

    constructor(config: SuperTokensConfig) {
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        this.storageHandlers = normaliseStorageHandlerInput(config.storageHandlers);

        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }

        this.recipeList = config.recipeList.map((recipe) => {
            return recipe(this.appInfo, this.storageHandlers);
        });
    }

    /**
     * Initialise the SuperTokens SDK. Calling this function multiple times results
     * in a warning and has no other effect
     *
     * @param config The configuration the SDK should use
     */
    static init(config: SuperTokensConfig): void {
        CookieHandlerReference.init(config.cookieHandler);
        WindowHandlerReference.init(config.windowHandler);

        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }

        SuperTokens.instance = new SuperTokens(config);
    }

    /**
     * Retrieve an instance of SuperTokens
     *
     * @returns An instance of SuperTokens
     *
     * @throws If SuperTokens.init has not been called before using this function
     */
    static getInstanceOrThrow(): SuperTokens {
        if (SuperTokens.instance === undefined) {
            let error = "SuperTokens must be initialized before calling this method.";
            error = checkForSSRErrorAndAppendIfNeeded(error);

            throw new Error(error);
        }

        return SuperTokens.instance;
    }

    static reset(): void {
        if (!isTest()) {
            console.warn("Calling reset() is only supported during testing");
            return;
        }

        SuperTokens.instance = undefined;
        return;
    }
}
