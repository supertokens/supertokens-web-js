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

import { RecipeFunctionOptions, RecipeImplementationInput } from "../../recipeModule/types";
import { PreAndPostAPIHookAction, RecipeInterface } from "../types";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import PasswordlessRecipeImplementation from "../../passwordless/recipeImplementation";
import DerivedThirdParty from "./thirdparty";
import DerivedPasswordless from "./passwordless";
import { StateObject } from "../../thirdparty/types";
import { PasswordlessFlowType, PasswordlessUser } from "../../passwordless/types";
import { ThirdPartyUserType } from "../../thirdparty/types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const thirdPartyImpl = ThirdPartyRecipeImplementation(recipeImplInput);
    const passwordlessImpl = PasswordlessRecipeImplementation(recipeImplInput);

    return {
        getAuthorisationURLFromBackend: async function (input: {
            thirdPartyId: string;
            tenantId?: string;
            redirectURIOnProviderDashboard: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            url: string;
            pkceCodeVerifier?: string;
            fetchResponse: Response;
        }> {
            return thirdPartyImpl.getAuthorisationURLFromBackend.bind(DerivedThirdParty(this))(input);
        },

        thirdPartySignInAndUp: async function (input: { userContext: any; options?: RecipeFunctionOptions }): Promise<
            | {
                  status: "OK";
                  user: ThirdPartyUserType;
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

        getThirdPartyStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: {
            userContext: any;
        }): (StateObject & CustomStateProperties) | undefined {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(DerivedThirdParty(this))(input);
        },

        setThirdPartyStateAndOtherInfoToStorage: function <CustomStateProperties>(input: {
            state: StateObject & CustomStateProperties;
            userContext: any;
        }): Promise<void> {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(DerivedThirdParty(this))(input);
        },

        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: async function (input: {
            thirdPartyId: string;
            tenantId?: string;
            frontendRedirectURI: string;
            redirectURIOnProviderDashboard?: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<string> {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(DerivedThirdParty(this))(input);
        },

        generateThirdPartyStateToSendToOAuthProvider: function (input?: {
            frontendRedirectURI?: string;
            userContext: any;
        }): string {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(DerivedThirdParty(this))(input);
        },

        verifyAndGetThirdPartyStateOrThrowError: async function <CustomStateProperties>(input: {
            stateFromAuthProvider: string | undefined;
            stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
            userContext: any;
        }): Promise<StateObject & CustomStateProperties> {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(DerivedThirdParty(this))(input);
        },

        getThirdPartyAuthErrorFromURL: function (input: { userContext: any }): string | undefined {
            return thirdPartyImpl.getAuthErrorFromURL.bind(DerivedThirdParty(this))(input);
        },

        getThirdPartyAuthStateFromURL: function (input: { userContext: any }): string {
            return thirdPartyImpl.getAuthStateFromURL.bind(DerivedThirdParty(this))(input);
        },

        createPasswordlessCode: async function (
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

        resendPasswordlessCode: async function (input: {
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

        consumePasswordlessCode: async function (
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
                  createdNewUser: boolean;
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

        getPasswordlessLoginAttemptInfo: function <CustomLoginAttemptInfoProperties>(input: {
            userContext: any;
        }): Promise<
            | undefined
            | ({
                  deviceId: string;
                  preAuthSessionId: string;
                  flowType: PasswordlessFlowType;
              } & CustomLoginAttemptInfoProperties)
        > {
            return passwordlessImpl.getLoginAttemptInfo.bind(DerivedPasswordless(this))(input);
        },

        setPasswordlessLoginAttemptInfo: function <CustomStateProperties>(input: {
            attemptInfo: {
                deviceId: string;
                preAuthSessionId: string;
                flowType: PasswordlessFlowType;
            } & CustomStateProperties;
            userContext: any;
        }): Promise<void> {
            return passwordlessImpl.setLoginAttemptInfo.bind(DerivedPasswordless(this))(input);
        },

        clearPasswordlessLoginAttemptInfo: function (input: { userContext: any }): Promise<void> {
            return passwordlessImpl.clearLoginAttemptInfo.bind(DerivedPasswordless(this))(input);
        },
    };
}

export { getRecipeImplementation };
