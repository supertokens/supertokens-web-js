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
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
    UserType,
} from "../authRecipeWithEmailVerification/types";
import { RecipePostAPIHookContext, RecipePreAPIHookContext, RecipeFunctionOptions } from "../recipeModule/types";
import { InputTypeOverride as EmailVerificationOverride } from "../emailverification/types";
import OverrideableBuilder from "supertokens-js-override";

export type PreAndPostAPIHookAction = "GET_AUTHORISATION_URL" | "THIRD_PARTY_SIGN_IN_UP";

export type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;

export type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & {
    override?: {
        emailVerification?: EmailVerificationOverride;
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type StateObject = {
    state?: string;
    rid?: string;
    thirdPartyId?: string;
    redirectToPath?: string;
};

export type RecipeInterface = {
    getOAuthState: (input: { userContext: any; config: NormalisedInputType }) => {
        status: "OK";
        state: StateObject | undefined;
    };
    setOAuthState: (input: { state: StateObject; config: NormalisedInputType; userContext: any }) => {
        status: "OK";
    };

    getThirdPartyLoginRedirectURLWithQueryParams: (input: {
        thirdPartyProviderId: string;
        thirdPartyRedirectionURL: string;
        config: NormalisedInputType;
        state?: StateObject;
        userContext: any;
    }) => Promise<
        | {
              status: "ERROR";
          }
        | {
              status: "OK";
              url: string;
          }
    >;

    getOAuthAuthorisationURL: (input: {
        thirdPartyProviderId: string;
        config: NormalisedInputType;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;

    signInAndUp: (input: {
        thirdPartyProviderId: string;
        thirdPartyProviderClientId?: string;
        thirdPartyRedirectionURL: string;
        config: NormalisedInputType;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<
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
    >;
};
