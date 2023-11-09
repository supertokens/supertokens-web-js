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

import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim";
import Recipe from "./recipe";
import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    /**
     * Loads information about what factors the current session can set up/complete and updates the requirements in the session payload
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful
     */
    static getMFAInfo(input: { options?: RecipeFunctionOptions; userContext?: any }) {
        return Recipe.getInstanceOrThrow().recipeImplementation.getMFAInfo({
            options: input.options,
            userContext: input.userContext ?? {},
        });
    }

    static MultiFactorAuthClaim = Recipe.MultiFactorAuthClaim;
}

const init = RecipeWrapper.init;
const getMFAInfo = RecipeWrapper.getMFAInfo;
const MultiFactorAuthClaim = RecipeWrapper.MultiFactorAuthClaim;

export {
    init,
    getMFAInfo,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    MultiFactorAuthClaim,
    MultiFactorAuthClaimClass,
    RecipeFunctionOptions,
};
