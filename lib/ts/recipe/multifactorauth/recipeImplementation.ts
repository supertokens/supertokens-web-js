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

import Querier from "../../querier";
import { MFAInfo, RecipeInterface } from "./types";
import { RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction } from "./types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        getMFAInfo: async function ({ options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                info: MFAInfo;
            }>(
                undefined,
                "/getMFAInfo",
                {},
                undefined,
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "GET_MFA_INFO",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "GET_MFA_INFO",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },

        checkFactorRequirement({ completedFactors, req }) {
            if (typeof req === "string") {
                return {
                    id: req,
                    isValid: completedFactors[req] !== undefined,
                    message: "Not completed",
                };
            } else {
                // We could loop through factor validators added by other recipes here.
                if (req.params === undefined) {
                    return {
                        id: req.id,
                        isValid: completedFactors[req.id] !== undefined,
                        message: "Not completed",
                    };
                }

                if (req.params.maxAge !== undefined) {
                    if (completedFactors[req.id] === undefined) {
                        return {
                            id: req.id,
                            isValid: false,
                            message: "Not completed",
                        };
                    }

                    return {
                        id: req.id,
                        isValid: completedFactors[req.id] >= Math.floor(Date.now() / 1000) - req.params.maxAgeInSeconds,
                        message: "Completed too long ago",
                    };
                }
                return {
                    id: req.id,
                    isValid: false,
                    message: "Factor checker not configured for " + req.id,
                };
            }
        },
    };
}

export { getRecipeImplementation };
