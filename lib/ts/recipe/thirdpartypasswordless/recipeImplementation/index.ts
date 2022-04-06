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

import { NormalisedAppInfo } from "../../../types";
import { RecipeFunctionOptions, RecipePostAPIHookFunction, RecipePreAPIHookFunction } from "../../recipeModule/types";
import { PreAndPostAPIHookAction, RecipeInterface } from "../types";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import PasswordlessRecipeImplementation from "../../passwordless/recipeImplementation";
import DerivedThirdParty from "./thirdparty";
import DerivedPasswordless from "./passwordless";
import { UserType } from "../../authRecipeWithEmailVerification/types";
import { StateObject } from "../../thirdparty/types";
import { PasswordlessFlowType, PasswordlessUser } from "../../passwordless/types";

export default function getRecipeImplementation(
    recipeId: string,
    appInfo: NormalisedAppInfo,
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>,
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>
): RecipeInterface {
    const thirdPartyImpl = ThirdPartyRecipeImplementation(recipeId, appInfo, preAPIHook, postAPIHook);
    const passwordlessImpl = PasswordlessRecipeImplementation(recipeId, appInfo, preAPIHook, postAPIHook);

    return {
        getAuthorisationURLFromBackend: async function (input: {
            providerId: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            return thirdPartyImpl.getAuthorisationURLFromBackend.bind(DerivedThirdParty(this))(input);
        },

        thirdPartySignInAndUp: async function (input: { userContext: any; options?: RecipeFunctionOptions }): Promise<
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
            return thirdPartyImpl.signInAndUp.bind(DerivedThirdParty(this))(input);
        },

        getStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: {
            userContext: any;
        }): (StateObject & CustomStateProperties) | undefined {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(DerivedThirdParty(this))(input);
        },

        setStateAndOtherInfoToStorage: function <CustomStateProperties>(input: {
            state: StateObject & CustomStateProperties;
            userContext: any;
        }): void {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(DerivedThirdParty(this))(input);
        },

        getAuthorizationURLWithQueryParamsAndSetState: async function (input: {
            providerId: string;
            authorisationURL: string;
            userContext: any;
            providerClientId?: string;
            options?: RecipeFunctionOptions;
        }): Promise<string> {
            return thirdPartyImpl.getAuthorizationURLWithQueryParamsAndSetState.bind(DerivedThirdParty(this))(input);
        },

        generateStateToSendToOAuthProvider: function (input: { userContext: any }): string {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(DerivedThirdParty(this))(input);
        },

        verifyAndGetStateOrThrowError: async function <CustomStateProperties>(input: {
            stateFromAuthProvider: string | undefined;
            stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
            userContext: any;
        }): Promise<StateObject & CustomStateProperties> {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(DerivedThirdParty(this))(input);
        },

        getAuthCodeFromURL: function (input: { userContext: any }): string {
            return thirdPartyImpl.getAuthCodeFromURL.bind(DerivedThirdParty(this))(input);
        },

        getAuthErrorFromURL: function (input: { userContext: any }): string | undefined {
            return thirdPartyImpl.getAuthErrorFromURL.bind(DerivedThirdParty(this))(input);
        },

        getAuthStateFromURL: function (input: { userContext: any }): string {
            return thirdPartyImpl.getAuthStateFromURL.bind(DerivedThirdParty(this))(input);
        },

        createCode: async function (
            input:
                | { email: string; userContext: any; options?: RecipeFunctionOptions }
                | { phoneNumber: string; userContext: any; options?: RecipeFunctionOptions }
        ): Promise<{
            status: "OK";
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
            fetchResponse: Response;
        }> {
            return passwordlessImpl.createCode.bind(DerivedPasswordless(this))(input);
        },

        resendCode: async function (input: {
            userContext: any;
            deviceId: string;
            preAuthSessionId: string;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK" | "RESTART_FLOW_ERROR";
            fetchResponse: Response;
        }> {
            return passwordlessImpl.resendCode.bind(DerivedPasswordless(this))(input);
        },

        consumeCode: async function (
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
        ): Promise<
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
        > {
            return passwordlessImpl.consumeCode.bind(DerivedPasswordless(this))(input);
        },

        getPasswordlessLinkCodeFromURL: function (input: { userContext: any }): string {
            return passwordlessImpl.getLinkCodeFromURL.bind(DerivedPasswordless(this))(input);
        },

        getPasswordlessPreAuthSessionIdFromURL: function (input: { userContext: any }): string {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind(DerivedPasswordless(this))(input);
        },

        doesPasswordlessUserEmailExist: async function (input: {
            email: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            return passwordlessImpl.doesEmailExist.bind(DerivedPasswordless(this))(input);
        },

        doesPasswordlessUserPhoneNumberExist: async function (input: {
            phoneNumber: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            return passwordlessImpl.doesPhoneNumberExist.bind(DerivedPasswordless(this))(input);
        },

        getPasswordlessLoginAttemptInfo: function <CustomLoginAttemptInfoProperties>(input: { userContext: any }):
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
            | undefined {
            return passwordlessImpl.getLoginAttemptInfo.bind(DerivedPasswordless(this))(input);
        },

        setPasswordlessLoginAttemptInfo: function <CustomStateProperties>(input: {
            attemptInfo: {
                deviceId: string;
                preAuthSessionId: string;
                flowType: PasswordlessFlowType;
            } & CustomStateProperties;
            userContext: any;
        }): Promise<void> | void {
            return passwordlessImpl.setLoginAttemptInfo.bind(DerivedPasswordless(this))(input);
        },

        clearPasswordlessLoginAttemptInfo: function (input: { userContext: any }): Promise<void> | void {
            return passwordlessImpl.clearLoginAttemptInfo.bind(DerivedPasswordless(this))(input);
        },
    };
}
