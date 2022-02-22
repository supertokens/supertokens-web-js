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
import { RecipeInterface } from "../types";
import EmailPasswordImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyImplementation from "../../thirdparty/recipeImplementation";
import DerivedEmailPassword from "./emailpassword";
import DerivedThirdParty from "./thirdparty";
import { NormalisedInputType as NormalisedEmailPasswordConfig } from "../../emailpassword/types";
import { StateObject, NormalisedInputType as NormalisedThirdPartyConfig } from "../../thirdparty/types";
import { RecipeFunctionOptions, UserType } from "../../emailpassword";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const emailPasswordImpl = EmailPasswordImplementation(recipeId, appInfo);
    const thirdPartyImpl = ThirdPartyImplementation(recipeId, appInfo);

    return {
        submitNewPassword: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedEmailPasswordConfig;
            options?: RecipeFunctionOptions;
            userContext: any;
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
            return emailPasswordImpl.submitNewPassword.bind(DerivedEmailPassword(this))(input);
        },
        sendPasswordResetEmail: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedEmailPasswordConfig;
            options?: RecipeFunctionOptions;
            userContext: any;
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
            return emailPasswordImpl.sendPasswordResetEmail.bind(DerivedEmailPassword(this))(input);
        },
        doesEmailExist: async function (input: {
            email: string;
            config: NormalisedEmailPasswordConfig;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            return emailPasswordImpl.doesEmailExist.bind(DerivedEmailPassword(this))(input);
        },
        getOAuthAuthorisationURL: async function (input: {
            thirdPartyProviderId: string;
            config: NormalisedThirdPartyConfig;
            userContext: any;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            return thirdPartyImpl.getOAuthAuthorisationURL.bind(DerivedThirdParty(this))(input);
        },
        signInAndUp: async function (
            input:
                | {
                      type: "thirdparty";
                      thirdPartyProviderId: string;
                      thirdPartyProviderClientId?: string;
                      thirdPartyRedirectionURL: string;
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
            if (input.type === "emailpassword") {
                if (input.isSignIn) {
                    // User is signing in
                    const response = await emailPasswordImpl.signIn.bind(DerivedEmailPassword(this))(input);

                    if (response.status === "OK") {
                        return {
                            ...response,
                            createdNewUser: false,
                            type: "emailpassword",
                        };
                    }

                    return {
                        ...response,
                        type: "emailpassword",
                    };
                } else {
                    // User is signing up
                    const response = await emailPasswordImpl.signUp.bind(DerivedEmailPassword(this))(input);

                    if (response.status === "OK") {
                        return {
                            ...response,
                            createdNewUser: true,
                            type: "emailpassword",
                        };
                    } else {
                        return {
                            ...response,
                            type: "emailpassword",
                        };
                    }
                }
            } else {
                // Called for third party recipe
                const response = await thirdPartyImpl.signInAndUp.bind(DerivedThirdParty(this))(input);

                return {
                    ...response,
                    type: "thirdparty",
                };
            }
        },
        getOAuthState: function (input: { userContext: any; config: NormalisedThirdPartyConfig }): {
            status: "OK";
            state: StateObject | undefined;
        } {
            return thirdPartyImpl.getOAuthState.bind(DerivedThirdParty(this))(input);
        },
        setOAuthState: function (input: { state: StateObject; config: NormalisedThirdPartyConfig; userContext: any }): {
            status: "OK";
        } {
            return thirdPartyImpl.setOAuthState.bind(DerivedThirdParty(this))(input);
        },
        getThirdPartyLoginRedirectURLWithQueryParams: async function (input: {
            thirdPartyProviderId: string;
            thirdPartyRedirectionURL: string;
            config: NormalisedThirdPartyConfig;
            state?: StateObject;
            userContext: any;
        }): Promise<{
            status: "OK";
            url: string;
        }> {
            return thirdPartyImpl.getThirdPartyLoginRedirectURLWithQueryParams.bind(DerivedThirdParty(this))(input);
        },
    };
}
