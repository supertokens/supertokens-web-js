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

import { normaliseAuthRecipeWithEmailVerificationConfig } from "../authRecipeWithEmailVerification/utils";
import { RecipeFunctionOptions } from "../emailverification";
import { InputType, NormalisedInputType, RecipeInterface } from "./types";

export function normaliseUserInput(config: InputType): NormalisedInputType {
    let override = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseAuthRecipeWithEmailVerificationConfig(config),
        override,
    };
}

export async function executePreAPIHooks({
    config,
    context,
    action,
    options,
    userContext,
}: {
    config: NormalisedInputType;
    context: { requestInit: RequestInit; url: string };
    action:
        | "EMAIL_PASSWORD_SIGN_UP"
        | "EMAIL_PASSWORD_SIGN_IN"
        | "SEND_RESET_PASSWORD_EMAIL"
        | "SUBMIT_NEW_PASSWORD"
        | "EMAIL_EXISTS";
    options?: RecipeFunctionOptions;
    userContext: any;
}): Promise<{ url: string; requestInit: RequestInit }> {
    let postRecipeHookContext = await config.preAPIHook({
        ...context,
        action,
        userContext,
    });

    if (options === undefined || options.preAPIHook === undefined) {
        return postRecipeHookContext;
    }

    return options.preAPIHook({
        url: postRecipeHookContext.url,
        requestInit: postRecipeHookContext.requestInit,
    });
}
