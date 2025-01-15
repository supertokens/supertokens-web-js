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

import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface, UserInput } from "./types";
import { normaliseUserInput } from "./utils";
import OverrideableBuilder from "supertokens-js-override";
import RecipeImplementation from "./recipeImplementation";
import { CreateRecipeFunction } from "../../types";
import { applyPlugins, checkForSSRErrorAndAppendIfNeeded, isTest } from "../../utils";
import AuthRecipe from "../authRecipe";
import { PostSuperTokensInitCallbacks } from "../../postSuperTokensInitCallbacks";
import { SessionClaimValidatorStore } from "supertokens-website/utils/sessionClaimValidatorStore";
import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim";

export default class Recipe extends AuthRecipe<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID = "multifactorauth" as const;

    recipeImplementation: RecipeInterface;

    static MultiFactorAuthClaim = new MultiFactorAuthClaimClass(() => Recipe.getInstanceOrThrow().recipeImplementation);

    constructor(config: InputType) {
        super(normaliseUserInput(config));

        const builder = new OverrideableBuilder(
            RecipeImplementation({
                recipeId: this.config.recipeId,
                appInfo: this.config.appInfo,
                clientType: this.config.clientType,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
            })
        );
        this.recipeImplementation = builder.override(this.config.override.functions).build();

        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                Recipe.MultiFactorAuthClaim.validators.hasCompletedMFARequirementsForAuth()
            );
        });
    }

    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction> {
        return (appInfo, clientType, _enableDebugLogs, overrideMaps) => {
            Recipe.instance = new Recipe({
                ...applyPlugins(Recipe.RECIPE_ID, config as any, overrideMaps ?? []),
                recipeId: Recipe.RECIPE_ID,
                appInfo,
                clientType,
            });

            return Recipe.instance;
        };
    }

    static getInstanceOrThrow(): Recipe {
        if (Recipe.instance === undefined) {
            let error = "No instance of MultiFactorAuth found. Make sure to call the MultiFactorAuth.init method.";
            error = checkForSSRErrorAndAppendIfNeeded(error);

            throw Error(error);
        }

        return Recipe.instance;
    }

    static reset(): void {
        if (!isTest()) {
            return;
        }
        Recipe.instance = undefined;
        return;
    }
}

export { Recipe };
