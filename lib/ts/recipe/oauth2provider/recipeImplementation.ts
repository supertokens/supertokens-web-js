/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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

import Querier from "../../querier";
import Multitenancy from "../multitenancy/recipe";
import { LoginInfo, RecipeInterface } from "./types";
import { RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction } from "./types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        async getLoginChallengeInfo({ loginChallenge, options, userContext }) {
            const queryParams: Record<string, string> = {
                loginChallenge,
            };

            const { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                info: LoginInfo;
            }>(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext }),
                "/oauth2provider/login/info",
                {},
                queryParams,
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "GET_LOGIN_CHALLENGE_INFO",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "GET_LOGIN_CHALLENGE_INFO",
                    userContext: userContext,
                })
            );

            return {
                status: "OK",
                info: jsonBody.info,
                fetchResponse,
            };
        },
    };
}

export { getRecipeImplementation };