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
import { NormalisedAppInfo, SuperTokensConfig, SuperTokensPlugin } from "./types";
import { checkForSSRErrorAndAppendIfNeeded, isTest, normaliseInputAppInfoOrThrowError } from "./utils";
import { CookieHandlerReference } from "./cookieHandler";
import { WindowHandlerReference } from "./windowHandler";
import { PostSuperTokensInitCallbacks } from "./postSuperTokensInitCallbacks";
import { Recipe as MultitenancyRecipe } from "./recipe/multitenancy/recipe";
import { DateProviderReference } from "./dateProvider";
import { package_version } from "./version";

export default class SuperTokens {
    /*
     * Static Attributes.
     */
    private static instance?: SuperTokens;

    /*
     * Instance Attributes.
     */
    appInfo: NormalisedAppInfo;
    recipeList: RecipeModule<any, any>[] = [];

    constructor(config: SuperTokensConfig) {
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);

        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }

        const finalPluginList: SuperTokensPlugin[] = [];
        if (config.plugins) {
            for (const plugin of config.plugins) {
                const versionContraints = Array.isArray(plugin.compatibleWebJSSDKVersions)
                    ? plugin.compatibleWebJSSDKVersions
                    : [plugin.compatibleWebJSSDKVersions];
                if (!versionContraints.includes(package_version)) {
                    // TODO: better checks
                    throw new Error("Plugin version mismatch");
                }
                if (plugin.dependencies) {
                    const result = plugin.dependencies(finalPluginList, package_version);
                    if (result.status === "ERROR") {
                        throw new Error(result.message);
                    }
                    if (result.pluginsToAdd) {
                        finalPluginList.push(...result.pluginsToAdd);
                    }
                    finalPluginList.push(plugin);
                }
            }
        }

        const overrideMaps = finalPluginList
            .filter((p) => p.overrideMap !== undefined)
            .map((p) => p.overrideMap) as NonNullable<SuperTokensPlugin["overrideMap"]>[];

        let enableDebugLogs = false;
        if (config.enableDebugLogs !== undefined) {
            enableDebugLogs = config.enableDebugLogs;
        }

        let multitenancyFound = false;

        this.recipeList = config.recipeList.map((recipe) => {
            const recipeInstance = recipe(this.appInfo, config.clientType, enableDebugLogs, overrideMaps);
            if (recipeInstance.config.recipeId === MultitenancyRecipe.RECIPE_ID) {
                multitenancyFound = true;
            }
            return recipeInstance;
        });

        if (!multitenancyFound) {
            this.recipeList.push(
                MultitenancyRecipe.init()(this.appInfo, config.clientType, enableDebugLogs, overrideMaps)
            );
        }
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
        DateProviderReference.init(config.dateProvider);

        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }

        SuperTokens.instance = new SuperTokens(config);
        PostSuperTokensInitCallbacks.runPostInitCallbacks();
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

        // We reset the multitenancy recipe here because we are auto-initializing it
        // and we should always be resetting it when we reset the SDK
        MultitenancyRecipe.reset();

        SuperTokens.instance = undefined;
        return;
    }
}
