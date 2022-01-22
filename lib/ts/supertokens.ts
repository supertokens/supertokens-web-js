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

import { SSR_ERROR } from "./constants";
import RecipeModule from "./recipe/recipeModule";
import { NormalisedAppInfo, SuperTokensConfig } from "./types";
import { isTest, normaliseInputAppInfoOrThrowError } from "./utils";
import { NormalisedRecipeConfig } from "./recipe/recipeModule/types";

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

        this.recipeList = config.recipeList.map((recipe) => {
            return recipe(this.appInfo);
        });
    }

    static init(config: SuperTokensConfig): void {
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }

        SuperTokens.instance = new SuperTokens(config);
    }

    static getInstanceOrThrow(): SuperTokens {
        if (SuperTokens.instance === undefined) {
            let error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw new Error(error);
        }

        return SuperTokens.instance;
    }

    getRecipeOrThrow<PreAPIHookContext, Config extends NormalisedRecipeConfig<PreAPIHookContext>>(
        recipeId: string
    ): RecipeModule<PreAPIHookContext, Config> {
        const recipe = this.recipeList.find((recipe) => {
            return recipe.config.recipeId === recipeId;
        });

        if (recipe === undefined) {
            throw new Error(`Missing recipe: ${recipeId}`);
        }

        return recipe as RecipeModule<PreAPIHookContext, Config>;
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
