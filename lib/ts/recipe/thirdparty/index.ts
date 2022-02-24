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

import { getNormalisedUserContext } from "../../utils";
import { UserType } from "../authRecipeWithEmailVerification/types";
import { RecipeFunctionOptions } from "../emailpassword";
import Recipe from "./recipe";
import { InputType, PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, StateObject } from "./types";

export default class Wrapper {
    static init(config: InputType) {
        return Recipe.init(config);
    }

    static getAuthorizationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        redirectionURL: string;
        providerClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.getAuthorizationURLWithQueryParamsAndSetState({
            ...input,
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signInAndUp(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.signInAndUp({
            ...input,
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }
}

const init = Wrapper.init;
const getAuthorizationURLWithQueryParamsAndSetState = Wrapper.getAuthorizationURLWithQueryParamsAndSetState;
const signInAndUp = Wrapper.signInAndUp;

export {
    init,
    getAuthorizationURLWithQueryParamsAndSetState,
    signInAndUp,
    StateObject,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    InputType,
};
