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

import { PreAndPostAPIHookAction, RecipeInterface } from "../types";
import EmailPasswordImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyImplementation from "../../thirdparty/recipeImplementation";
import DerivedEmailPassword from "./emailpassword";
import DerivedThirdParty from "./thirdparty";
import { StateObject } from "../../thirdparty/types";
import { RecipeFunctionOptions } from "../../emailpassword";
import { RecipeImplementationInput } from "../../recipeModule/types";
import { User } from "../../../types";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const emailPasswordImpl = EmailPasswordImplementation(recipeImplInput);
    const thirdPartyImpl = ThirdPartyImplementation(recipeImplInput);

    return {
        submitNewPassword: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK";
                  fetchResponse: Response;
              }
            | {
                  status: "RESET_PASSWORD_INVALID_TOKEN_ERROR";
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
            return emailPasswordImpl.submitNewPassword.bind(DerivedEmailPassword(this))(input);
        },
        sendPasswordResetEmail: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK";
                  fetchResponse: Response;
              }
            | {
                  status: "PASSWORD_RESET_NOT_ALLOWED";
                  reason: string;
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
            return emailPasswordImpl.sendPasswordResetEmail.bind(DerivedEmailPassword(this))(input);
        },
        doesEmailExist: async function (input: {
            email: string;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            return emailPasswordImpl.doesEmailExist.bind(DerivedEmailPassword(this))(input);
        },

        emailPasswordSignUp: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK";
                  user: User;
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
            return emailPasswordImpl.signUp.bind(DerivedEmailPassword(this))(input);
        },

        emailPasswordSignIn: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK";
                  user: User;
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
            | {
                  status: "WRONG_CREDENTIALS_ERROR";
                  fetchResponse: Response;
              }
        > {
            return emailPasswordImpl.signIn.bind(DerivedEmailPassword(this))(input);
        },

        getResetPasswordTokenFromURL: function (input: { userContext: any }): string {
            return emailPasswordImpl.getResetPasswordTokenFromURL.bind(DerivedEmailPassword(this))(input);
        },

        getAuthorisationURLFromBackend: async function (input: {
            thirdPartyId: string;
            tenantId: string | undefined;
            redirectURIOnProviderDashboard: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            urlWithQueryParams: string;
            pkceCodeVerifier?: string;
            fetchResponse: Response;
        }> {
            return thirdPartyImpl.getAuthorisationURLFromBackend.bind(DerivedThirdParty(this))(input);
        },

        thirdPartySignInAndUp: async function (input: { userContext: any; options?: RecipeFunctionOptions }): Promise<
            | {
                  status: "OK";
                  user: User;
                  createdNewRecipeUser: boolean;
                  fetchResponse: Response;
              }
            | {
                  status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                  fetchResponse: Response;
              }
            | {
                  status: "SIGN_IN_UP_NOT_ALLOWED" | "EMAIL_ALREADY_USED_IN_ANOTHER_ACCOUNT";
                  reason: string;
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
        setStateAndOtherInfoToStorage: async function (input: { state: StateObject; userContext: any }): Promise<void> {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(DerivedThirdParty(this))(input);
        },
        getAuthorisationURLWithQueryParamsAndSetState: async function (input: {
            thirdPartyId: string;
            tenantId: string | undefined;
            frontendRedirectURI: string;
            redirectURIOnProviderDashboard?: string;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<string> {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(DerivedThirdParty(this))(input);
        },

        generateStateToSendToOAuthProvider: function (input?: {
            frontendRedirectURI?: string;
            userContext: any;
        }): string {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(DerivedThirdParty(this))(input);
        },

        verifyAndGetStateOrThrowError: async function <CustomStateProperties>(input: {
            stateFromAuthProvider: string | undefined;
            stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
            userContext: any;
        }): Promise<StateObject & CustomStateProperties> {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(DerivedThirdParty(this))(input);
        },

        getAuthErrorFromURL: function (input: { userContext: any }): string | undefined {
            return thirdPartyImpl.getAuthErrorFromURL.bind(DerivedThirdParty(this))(input);
        },

        getAuthStateFromURL: function (input: { userContext: any }): string {
            return thirdPartyImpl.getAuthStateFromURL.bind(DerivedThirdParty(this))(input);
        },
        getTenantIdFromURL: function (input: { userContext: any }): string | undefined {
            return emailPasswordImpl.getTenantIdFromURL.bind(DerivedEmailPassword(this))(input);
        },
    };
}

export { getRecipeImplementation };
