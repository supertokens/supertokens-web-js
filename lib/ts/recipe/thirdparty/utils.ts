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
import { normaliseAuthRecipeWithEmailVerificationConfig } from "../authRecipeWithEmailVerification/utils";
import Provider from "./providers";
import Custom from "./providers/custom";
import {
    InputType,
    NormalisedInputType,
    RecipeInterface,
    SignInUpFeatureInputType,
    SignInUpFeatureNormalisedInputType,
} from "./types";

export function normaliseUserInput(config: InputType): NormalisedInputType {
    const signInAndUpFeature: SignInUpFeatureNormalisedInputType = normaliseSignInUpFeature(config.signInAndUpFeature);

    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        components: {},
        ...config.override,
    };

    return {
        ...normaliseAuthRecipeWithEmailVerificationConfig(config),
        signInAndUpFeature,
        override,
    };
}

function normaliseSignInUpFeature(config: SignInUpFeatureInputType | undefined): SignInUpFeatureNormalisedInputType {
    if (config === undefined) {
        config = {};
    }

    if (config.providers === undefined) {
        config.providers = [];
    }

    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }

    const providersWithCustom = config.providers.map((provider) => {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });

    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    const providers = Array.from(new Set(providersWithCustom.map((provider) => provider.id))).map(
        (id) => providersWithCustom.find((provider) => provider.id === id) as Provider
    );

    return {
        providers,
    };
}
