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
import {
    PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction,
    NormalisedInputType as NormalisedEmailPasswordConfig,
} from "../emailpassword/types";
import { RecipePostAPIHookContext, RecipePreAPIHookContext } from "../recipeModule/types";
import {
    PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction,
    StateObject,
    NormalisedInputType as NormalisedThirdPartyConfig,
} from "../thirdparty/types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    UserType,
    InputType as AuthRecipeInputType,
    NormalisedInputType as AuthRecipeNormalisedInputType,
} from "../authRecipeWithEmailVerification/types";
import OverrideableBuilder from "supertokens-js-override";
import { InputTypeOverride as EmailVerificationOverride } from "../emailverification/types";

export type PreAndPostAPIHookAction = EmailPasswordPreAndPostAPIHookAction | ThirdPartyPreAndPostAPIHookAction;

export type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;

export type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & {
    disableEmailPassword?: boolean;
    override?: {
        emailVerification?: EmailVerificationOverride;
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    disableEmailPassword: boolean;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedEmailPasswordConfig;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
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
    >;

    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedEmailPasswordConfig;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
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
    >;

    doesEmailExist: (input: {
        email: string;
        config: NormalisedEmailPasswordConfig;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;

    getResetPasswordTokenFromURL: (input: { config: NormalisedEmailPasswordConfig; userContext: any }) => string;

    getAuthorisationURLFromBackend: (input: {
        providerId: string;
        config: NormalisedThirdPartyConfig;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;

    signInAndUp: (
        input:
            | {
                  type: "thirdparty";
                  config: NormalisedThirdPartyConfig;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  type: "emailpassword";
                  isSignIn: boolean;
                  formFields: {
                      id: string;
                      value: string;
                  }[];
                  config: NormalisedEmailPasswordConfig;
                  options?: RecipeFunctionOptions;
                  userContext: any;
              }
    ) => Promise<
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
    >;

    getStateAndOtherInfoFromStorage: <CustomStateProperties>(input: {
        userContext: any;
        config: NormalisedThirdPartyConfig;
    }) => (StateObject & CustomStateProperties) | undefined;

    setStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        config: NormalisedThirdPartyConfig;
        userContext: any;
    }) => void;

    getAuthorizationURLWithQueryParamsAndSetState: (input: {
        providerId: string;
        authorisationURL: string;
        config: NormalisedThirdPartyConfig;
        userContext: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;

    generateStateToSendToOAuthProvider: (input: { userContext: any; config: NormalisedThirdPartyConfig }) => string;

    verifyAndGetStateOrThrowError: <CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        config: NormalisedThirdPartyConfig;
        userContext: any;
    }) => Promise<StateObject & CustomStateProperties>;

    getAuthCodeFromURL: (input: { config: NormalisedThirdPartyConfig; userContext: any }) => string;

    getAuthErrorFromURL: (input: { config: NormalisedThirdPartyConfig; userContext: any }) => string | undefined;

    getAuthStateFromURL: (input: { config: NormalisedThirdPartyConfig; userContext: any }) => string | undefined;
};
