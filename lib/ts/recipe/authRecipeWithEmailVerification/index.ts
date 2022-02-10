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

import RecipeModule from "../recipeModule";
import EmailverificationRecipe from "../emailverification/recipe";
import { NormalisedInputType } from "./types";

// TODO NEMI: Change this to extends AuthRecipe after session recipe is added
export default abstract class AuthRecipeWithEmailVerification<
    Action,
    NormalisedConfig extends NormalisedInputType<Action>
> extends RecipeModule<Action> {
    emailVerificationRecipe: EmailverificationRecipe;

    constructor(config: NormalisedConfig, recipes: { emailVerification?: EmailverificationRecipe }) {
        super(config);
        this.emailVerificationRecipe =
            recipes.emailVerification === undefined
                ? new EmailverificationRecipe({
                      appInfo: config.appInfo,
                      recipeId: config.recipeId,
                      override: config.override === undefined ? undefined : config.override.emailVerification,
                  })
                : recipes.emailVerification;
    }
}
