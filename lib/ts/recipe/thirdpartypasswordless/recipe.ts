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

import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface, UserInput } from "./types";
import EmailVerificationRecipe from "../emailverification/recipe";
import ThirdPartyRecipe from "../thirdparty/recipe";
import PasswordlessRecipe from "../passwordless/recipe";
import { normaliseUserInput } from "./utils";
import OverrideableBuilder from "supertokens-js-override";
import RecipeImplementation from "./recipeImplementation";
import { checkForSSRErrorAndAppendIfNeeded, isTest } from "../../utils";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import DerivedThirdPartyRecipeImplementation from "./recipeImplementation/thirdparty";
import DerivedPasswordlessRecipeImplementation from "./recipeImplementation/passwordless";

export default class Recipe extends AuthRecipeWithEmailVerification<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID = "thirdpartypasswordless";

    recipeImplementation: RecipeInterface;
    thirdPartyRecipe: ThirdPartyRecipe;
    passwordlessRecipe: PasswordlessRecipe;

    constructor(
        config: InputType,
        recipes: {
            emailVerification: EmailVerificationRecipe | undefined;
            thirdParty: ThirdPartyRecipe | undefined;
            passwordless: PasswordlessRecipe | undefined;
        }
    ) {
        super(normaliseUserInput(config), recipes);

        const builder = new OverrideableBuilder(
            RecipeImplementation({
                recipeId: this.config.recipeId,
                appInfo: this.config.appInfo,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
            })
        );

        const _recipeImplementation = builder.override(this.config.override.functions).build();
        this.recipeImplementation = _recipeImplementation;

        this.thirdPartyRecipe =
            recipes.thirdParty === undefined
                ? new ThirdPartyRecipe(
                      {
                          recipeId: this.config.recipeId,
                          appInfo: this.config.appInfo,
                          preAPIHook: config.preAPIHook,
                          postAPIHook: config.postAPIHook,
                          override: {
                              emailVerification: config.override?.emailVerification,
                              functions: function () {
                                  return DerivedThirdPartyRecipeImplementation(_recipeImplementation);
                              },
                          },
                      },
                      {
                          emailVerification: this.emailVerificationRecipe,
                      }
                  )
                : recipes.thirdParty;

        this.passwordlessRecipe =
            recipes.passwordless === undefined
                ? new PasswordlessRecipe({
                      recipeId: this.config.recipeId,
                      appInfo: this.config.appInfo,
                      preAPIHook: config.preAPIHook,
                      postAPIHook: config.postAPIHook,
                      override: {
                          functions: function () {
                              return DerivedPasswordlessRecipeImplementation(_recipeImplementation);
                          },
                      },
                  })
                : recipes.passwordless;
    }

    static getInstanceOrThrow(): Recipe {
        if (Recipe.instance === undefined) {
            let error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method.";
            error = checkForSSRErrorAndAppendIfNeeded(error);

            throw Error(error);
        }

        return Recipe.instance;
    }

    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction> {
        return (appInfo: NormalisedAppInfo) => {
            Recipe.instance = new Recipe(
                {
                    ...config,
                    recipeId: Recipe.RECIPE_ID,
                    appInfo,
                },
                {
                    emailVerification: undefined,
                    thirdParty: undefined,
                    passwordless: undefined,
                }
            );

            return Recipe.instance;
        };
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
