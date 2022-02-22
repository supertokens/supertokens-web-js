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
import { RecipeFunctionOptions, UserType } from "../emailpassword";
import { StateObject } from "../thirdparty/types";
import Recipe from "./recipe";
import { InputType, RecipeInterface, PreAPIHookContext, PostAPIHookContext } from "./types";

export default class Wrapper {
    static init(config?: InputType) {
        return Recipe.init(config);
    }

    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.submitNewPassword({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.sendPasswordResetEmail({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.doesEmailExist({
            ...input,
            config: recipeInstance.emailPasswordRecipe.config,
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
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signInAndUp(
        input:
            | {
                  type: "thirdparty";
                  thirdPartyProviderId: string;
                  thirdPartyRedirectionURL: string;
                  thirdPartyProviderClientId?: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  type: "emailpassword";
                  isSignIn: boolean;
                  formFields: {
                      id: string;
                      value: string;
                  }[];
                  options?: RecipeFunctionOptions;
                  userContext?: any;
              }
    ): Promise<
        | {
              type: "emailpassword" | "thirdparty";
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              type: "thirdparty";
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              type: "thirdparty";
              status: "FIELD_ERROR";
              error: string;
              fetchResponse: Response;
          }
    > {
        const recipeInstance = Recipe.getInstanceOrThrow();

        if (input.type === "emailpassword") {
            return recipeInstance.recipeImplementation.signInAndUp({
                ...input,
                config: recipeInstance.emailPasswordRecipe.config,
                userContext: getNormalisedUserContext(input.userContext),
            });
        }

        return recipeInstance.recipeImplementation.signInAndUp({
            ...input,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getOAuthState(input: { userContext?: any }): {
        status: "OK";
        state: StateObject | undefined;
    } {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.getOAuthState({
            ...input,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static setOAuthState(input: { state: StateObject; userContext?: any }): {
        status: "OK";
    } {
        const recipeInstance = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.setOAuthState({
            ...input,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
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
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }
}

const init = Wrapper.init;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const doesEmailExist = Wrapper.doesEmailExist;
const getOAuthAuthorisationURL = Wrapper.getOAuthAuthorisationURL;
const signInAndUp = Wrapper.signInAndUp;
const getOAuthState = Wrapper.getOAuthState;
const setOAuthState = Wrapper.setOAuthState;
const getThirdPartyLoginRedirectURLWithQueryParams = Wrapper.getThirdPartyLoginRedirectURLWithQueryParams;

export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    doesEmailExist,
    getOAuthAuthorisationURL,
    signInAndUp,
    getOAuthState,
    setOAuthState,
    getThirdPartyLoginRedirectURLWithQueryParams,
    UserType,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
