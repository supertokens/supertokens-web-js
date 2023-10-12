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
import { normaliseAuthRecipe } from "../authRecipe/utils";
import { InputType, MFAClaimValue, MFARequirement, NormalisedInputType, RecipeInterface } from "./types";

export function normaliseUserInput(config: InputType): NormalisedInputType {
    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseAuthRecipe(config),
        override,
        customFactorChecker: config.customFactorChecker ?? (() => undefined),
    };
}

export function checkFactorRequirement(req: MFARequirement, completedFactors: MFAClaimValue["c"]) {
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

        return {
            id: req.id,
            isValid: false,
            message: "Factor checker not configured for " + req.id,
        };
    }
}
