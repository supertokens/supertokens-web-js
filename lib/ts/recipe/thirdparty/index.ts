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
import { InputType, StateObject, PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext } from "./types";

export default class Wrapper {
    static init(config?: InputType) {
        return Recipe.init(config);
    }

    static getOAuthState(input?: { userContext?: any }): {
        status: "OK";
        state: StateObject | undefined;
    } {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.getOAuthState({
            userContext: getNormalisedUserContext(input?.userContext),
            config: recipeInstance.config,
        });
    }

    static setOAuthState(input: { state: StateObject; userContext?: any }): {
        status: "OK";
    } {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.setOAuthState({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
            config: recipeInstance.config,
        });
    }

    static getThirdPartyLoginRedirectURLWithQueryParams(input: {
        thirdPartyProviderId: string;
        thirdPartyRedirectionURL: string;
        state?: StateObject;
        userContext?: any;
    }): Promise<
        | {
              status: "ERROR";
          }
        | {
              status: "OK";
              url: string;
          }
    > {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.getThirdPartyLoginRedirectURLWithQueryParams({
            ...input,
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getOAuthAuthorisationURL(input: {
        thirdPartyProviderId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }> {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.getOAuthAuthorisationURL({
            ...input,
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signInAndUp(input: {
        thirdPartyProviderId: string;
        thirdPartyRedirectionURL: string;
        thirdPartyProviderClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<
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
        | {
              status: "FIELD_ERROR";
              error: string;
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
const getOAuthState = Wrapper.getOAuthState;
const setOAuthState = Wrapper.setOAuthState;
const getThirdPartyLoginRedirectURLWithQueryParams = Wrapper.getThirdPartyLoginRedirectURLWithQueryParams;
const getOAuthAuthorisationURL = Wrapper.getOAuthAuthorisationURL;
const signInAndUp = Wrapper.signInAndUp;

export {
    init,
    getOAuthState,
    setOAuthState,
    getThirdPartyLoginRedirectURLWithQueryParams,
    getOAuthAuthorisationURL,
    signInAndUp,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    InputType,
};
