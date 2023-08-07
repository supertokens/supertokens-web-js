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
import EmailPasswordRecipe from "../emailpassword/recipe";
import ThirdPartyRecipe from "../thirdparty/recipe";
import { normaliseUserInput } from "./utils";
import OverrideableBuilder from "supertokens-js-override";
import RecipeImplementation from "./recipeImplementation";
import DerivedEmailPasswordImplementation from "./recipeImplementation/emailpassword";
import DerivedThirdPartyRecipeImplementation from "./recipeImplementation/thirdparty";
import { checkForSSRErrorAndAppendIfNeeded, isTest } from "../../utils";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import AuthRecipe from "../authRecipe";

export default class Recipe extends AuthRecipe<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID = "thirdpartyemailpassword";

    recipeImplementation: RecipeInterface;
    emailPasswordRecipe: EmailPasswordRecipe;
    thirdPartyRecipe: ThirdPartyRecipe;

    constructor(
        config: InputType,
        recipes: {
            thirdParty: ThirdPartyRecipe | undefined;
            emailPassword: EmailPasswordRecipe | undefined;
        }
    ) {
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
        const _recipeImplementation = builder.override(this.config.override.functions).build();
        this.recipeImplementation = _recipeImplementation;

        /**
         * We need this recipe instance so that we can pass the email password config when
         * calling recipe functions from index.ts
         */
        this.emailPasswordRecipe =
            recipes.emailPassword === undefined
                ? new EmailPasswordRecipe({
                      recipeId: this.config.recipeId,
                      appInfo: this.config.appInfo,
                      clientType: this.config.clientType,
                      preAPIHook: config.preAPIHook,
                      postAPIHook: config.postAPIHook,
                      override: {
                          functions: function () {
                              return DerivedEmailPasswordImplementation(_recipeImplementation);
                          },
                      },
                  })
                : recipes.emailPassword;

        /**
         * We need this recipe instance so that we can pass the third party config when
         * calling recipe functions from index.ts
         */
        this.thirdPartyRecipe =
            recipes.thirdParty === undefined
                ? new ThirdPartyRecipe({
                      recipeId: this.config.recipeId,
                      appInfo: this.config.appInfo,
                      clientType: this.config.clientType,
                      preAPIHook: config.preAPIHook,
                      postAPIHook: config.postAPIHook,
                      override: {
                          functions: function () {
                              return DerivedThirdPartyRecipeImplementation(_recipeImplementation);
                          },
                      },
                  })
                : recipes.thirdParty;
    }

    static getInstanceOrThrow(): Recipe {
        if (Recipe.instance === undefined) {
            let error =
                "No instance of ThirdPartyEmailPassword found. Make sure to call the ThirdPartyEmailPassword.init method.";
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
                    emailPassword: undefined,
                    thirdParty: undefined,
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
