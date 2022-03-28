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
    NormalisedRecipeConfig,
    RecipeConfig,
    RecipeFunctionOptions,
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";

export type PreAndPostAPIHookAction =
    | "PASSWORDLESS_CREATE_CODE"
    | "PASSWORDLESS_CONSUME_CODE"
    | "PASSWORDLESS_RESEND_CODE"
    | "EMAIL_EXISTS"
    | "PHONE_NUMBER_EXISTS";

export type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;

export type InputType = RecipeConfig<PreAndPostAPIHookAction> & {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type NormalisedInputType = NormalisedRecipeConfig<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type PasswordlessUser = {
    id: string;
    email?: string;
    phoneNumber?: string;
    timeJoined: number;
};

export type PasswordlessFlowType = "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";

export type RecipeInterface = {
    createCode: (
        input:
            | { email: string; userContext: any; options?: RecipeFunctionOptions }
            | { phoneNumber: string; userContext: any; options?: RecipeFunctionOptions }
    ) => Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;

    resendCode: (input: {
        userContext: any;
        deviceId: string;
        preAuthSessionId: string;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;

    consumeCode: (
        input:
            | {
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  preAuthSessionId: string;
                  linkCode: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
    ) => Promise<
        | {
              status: "OK";
              createdUser: boolean;
              user: PasswordlessUser;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
    >;

    getLinkCodeFromURL: (input: { userContext: any }) => string;

    getPreAuthSessionIdFromURL: (input: { userContext: any }) => string;

    doesEmailExist: (input: { email: string; userContext: any; options?: RecipeFunctionOptions }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;

    doesPhoneNumberExist: (input: {
        phoneNumber: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;

    // TODO NEMI: Wouldnt it make more sense for this to just be a promise?
    getLoginAttemptInfo: <CustomLoginAttemptInfoProperties>(input: { userContext: any }) =>
        | Promise<
              | undefined
              | ({
                    deviceId: string;
                    preAuthSessionId: string;
                    flowType: PasswordlessFlowType;
                } & CustomLoginAttemptInfoProperties)
          >
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
        | undefined;

    // TODO NEMI: Wouldnt it make more sense for this to just be a promise?
    setLoginAttemptInfo: <CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext: any;
    }) => Promise<void> | void;

    // TODO NEMI: Wouldnt it make more sense for this to just be a promise?
    clearLoginAttemptInfo: (input: { userContext: any }) => Promise<void> | void;
};
