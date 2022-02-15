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

import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface } from "./types";
import EmailVerificationRecipe from "../emailverification/recipe";
import { normaliseUserInput } from "./utils";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import RecipeImplementation from "./recipeImplementation";
import OverrideableBuilder from "supertokens-js-override";
import { checkForSSRErrorAndAppendIfNeeded } from "../../utils";

export default class Recipe extends AuthRecipeWithEmailVerification<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID = "emailpassword";

    recipeImplementation: RecipeInterface;

    constructor(config: InputType, recipes: { emailVerification: EmailVerificationRecipe | undefined }) {
        super(normaliseUserInput(config), recipes);

        const builder = new OverrideableBuilder(RecipeImplementation(this.config.recipeId, this.config.appInfo));
        this.recipeImplementation = builder.override(this.config.override.functions).build();
    }

    static init(config?: InputType): CreateRecipeFunction<PreAndPostAPIHookAction> {
        return (appInfo: NormalisedAppInfo) => {
            Recipe.instance = new Recipe(
                {
                    ...config,
                    recipeId: Recipe.RECIPE_ID,
                    appInfo,
                },
                {
                    emailVerification: undefined,
                }
            );

            return Recipe.instance;
        };
    }

    static getInstanceOrThrow(): Recipe {
        if (Recipe.instance === undefined) {
            let error = "No instance of EmailPassword found. Make sure to call the EmailPassword.init method.";
            error = checkForSSRErrorAndAppendIfNeeded(error);

            throw Error(error);
        }

        return Recipe.instance;
    }
}
