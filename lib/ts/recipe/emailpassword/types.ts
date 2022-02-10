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

import { RecipePostAPIHookContext, RecipePreAPIHookContext, UserType } from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    NormalisedInputType as NormalisedAuthRecipeType,
    InputType as AuthRecipeInputType,
} from "../authRecipeWithEmailVerification/types";

export type PreAndPostAPIHookAction =
    | "EMAIL_PASSWORD_SIGN_UP"
    | "EMAIL_PASSWORD_SIGN_IN"
    | "SEND_RESET_PASSWORD_EMAIL"
    | "SUBMIT_NEW_PASSWORD"
    | "EMAIL_EXISTS";

export type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;

export type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type NormalisedInputType = NormalisedAuthRecipeType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;

    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;

    signUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: UserType;
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;

    signIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: UserType;
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;

    doesEmailExist: (input: {
        email: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
};
