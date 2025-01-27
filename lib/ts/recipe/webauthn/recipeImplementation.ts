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

import Querier from "../../querier";
import { RecipeInterface, ResidentKey, UserVerification } from "./types";
import { RecipeFunctionOptions, RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction } from "./types";
import { GeneralErrorResponse, User } from "../../types";
import Multitenancy from "../multitenancy/recipe";
import {
    AuthenticationResponseJSON,
    RegistrationResponseJSON,
    startAuthentication,
    startRegistration,
} from "@simplewebauthn/browser";

export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface {
    const querier = new Querier(recipeImplInput.recipeId, recipeImplInput.appInfo);

    return {
        getRegisterOptions: async function ({
            options,
            userContext,
            email,
            recoverAccountToken,
        }: { options?: RecipeFunctionOptions; userContext: any } & (
            | { email: string; recoverAccountToken?: never }
            | { recoverAccountToken: string; email?: never }
        )) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      webauthnGeneratedOptionsId: string;
                      createdAt: string;
                      expiresAt: string;
                      rp: {
                          id: string;
                          name: string;
                      };
                      user: {
                          id: string;
                          name: string;
                          displayName: string;
                      };
                      challenge: string;
                      timeout: number;
                      excludeCredentials: {
                          id: string;
                          type: "public-key";
                          transports: ("ble" | "hybrid" | "internal" | "nfc" | "usb")[];
                      }[];
                      attestation: "none" | "indirect" | "direct" | "enterprise";
                      pubKeyCredParams: {
                          alg: number;
                          type: "public-key";
                      }[];
                      authenticatorSelection: {
                          requireResidentKey: boolean;
                          residentKey: ResidentKey;
                          userVerification: UserVerification;
                      };
                      fetchResponse: Response;
                  }
                | {
                      status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
                      fetchResponse: Response;
                  }
                | {
                      status: "INVALID_EMAIL_ERROR";
                      err: string;
                      fetchResponse: Response;
                  }
                | {
                      status: "INVALID_GENERATED_OPTIONS_ERROR";
                      fetchResponse: Response;
                  }
            >(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: userContext,
                }),
                "/webauthn/options/register",
                {
                    body: JSON.stringify({
                        email,
                        recoverAccountToken,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "REGISTER_OPTIONS",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "REGISTER_OPTIONS",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        getSignInOptions: async function ({ options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      webauthnGeneratedOptionsId: string;
                      challenge: string;
                      timeout: number;
                      userVerification: UserVerification;
                      fetchResponse: Response;
                  }
                | {
                      status: "INVALID_GENERATED_OPTIONS_ERROR";
                      fetchResponse: Response;
                  }
                | GeneralErrorResponse
            >(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: userContext,
                }),
                "/webauthn/options/signin",
                {
                    body: JSON.stringify({}),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SIGN_IN_OPTIONS",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SIGN_IN_OPTIONS",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        signUp: async function ({ webauthnGeneratedOptionsId, credential, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      user: User;
                  }
                | GeneralErrorResponse
                | {
                      status: "SIGN_UP_NOT_ALLOWED";
                      reason: string;
                  }
                | { status: "INVALID_CREDENTIALS_ERROR" }
                | { status: "GENERATED_OPTIONS_NOT_FOUND_ERROR" }
                | { status: "INVALID_GENERATED_OPTIONS_ERROR" }
                | { status: "INVALID_AUTHENTICATOR_ERROR"; reason: string }
                | { status: "EMAIL_ALREADY_EXISTS_ERROR" }
            >(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: userContext,
                }),
                "/webauthn/signup",
                {
                    body: JSON.stringify({
                        webauthnGeneratedOptionsId,
                        credential,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SIGN_UP",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SIGN_UP",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        signIn: async function ({ webauthnGeneratedOptionsId, credential, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      user: User;
                  }
                | { status: "INVALID_CREDENTIALS_ERROR" }
                | {
                      status: "SIGN_IN_NOT_ALLOWED";
                      reason: string;
                  }
                | GeneralErrorResponse
            >(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: userContext,
                }),
                "/webauthn/signin",
                {
                    body: JSON.stringify({
                        webauthnGeneratedOptionsId,
                        credential,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "SIGN_IN",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "SIGN_IN",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        getEmailExists: async function ({ email, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.get<
                | {
                      status: "OK";
                      exists: boolean;
                  }
                | GeneralErrorResponse
            >(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: userContext,
                }),
                "/webauthn/email/exists",
                {},
                { email: email },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "EMAIL_EXISTS",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "EMAIL_EXISTS",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        generateRecoverAccountToken: async function ({ email, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                  }
                | { status: "RECOVER_ACCOUNT_NOT_ALLOWED"; reason: string }
                | GeneralErrorResponse
            >(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: userContext,
                }),
                "/user/webauthn/reset/token",
                {
                    body: JSON.stringify({
                        email,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "GENERATE_RECOVER_ACCOUNT_TOKEN",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "GENERATE_RECOVER_ACCOUNT_TOKEN",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        recoverAccount: async function ({ token, webauthnGeneratedOptionsId, credential, options, userContext }) {
            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      user: User;
                      email: string;
                  }
                | GeneralErrorResponse
                | { status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR" }
                | { status: "INVALID_CREDENTIALS_ERROR" }
                | { status: "GENERATED_OPTIONS_NOT_FOUND_ERROR" }
                | { status: "INVALID_GENERATED_OPTIONS_ERROR" }
                | { status: "INVALID_AUTHENTICATOR_ERROR"; reason: string }
            >(
                await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
                    userContext: userContext,
                }),
                "/user/webauthn/reset",
                {
                    body: JSON.stringify({
                        token,
                        webauthnGeneratedOptionsId,
                        credential,
                    }),
                },
                Querier.preparePreAPIHook({
                    recipePreAPIHook: recipeImplInput.preAPIHook,
                    action: "RECOVER_ACCOUNT",
                    options: options,
                    userContext: userContext,
                }),
                Querier.preparePostAPIHook({
                    recipePostAPIHook: recipeImplInput.postAPIHook,
                    action: "RECOVER_ACCOUNT",
                    userContext: userContext,
                })
            );

            return {
                ...jsonBody,
                fetchResponse,
            };
        },
        registerCredential: async function ({ registrationOptions }) {
            let registrationResponse: RegistrationResponseJSON;
            try {
                registrationResponse = await startRegistration({ optionsJSON: registrationOptions });
            } catch (error: any) {
                if (error.name === "InvalidStateError") {
                    return { status: "AUTHENTICATOR_ALREADY_REGISTERED" };
                }

                return {
                    status: "FAILED_TO_REGISTER_USER",
                    error: error,
                };
            }

            return {
                status: "OK",
                registrationResponse,
            };
        },
        registerCredentialWithSignUp: async function ({ email, options, userContext }) {
            // Get the registration options by using the passed email ID.
            const registrationOptions = await this.getRegisterOptions({ options, userContext, email });
            if (registrationOptions?.status !== "OK") {
                // If we did not get an OK status, we need to return the error as is.

                // If the `status` is `RECOVER_ACCOUNT_TOKEN_INVALID_ERROR`, we need to throw an
                // error since that should never happen as we are registering with an email
                // and not a token.
                if (registrationOptions?.status === "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR") {
                    throw new Error("Got `RECOVER_ACCOUNT_TOKEN_INVALID_ERROR` status that should never happen");
                }

                return registrationOptions;
            }

            // We should have received a valid registration options response.
            const registerCredentialResponse = await this.registerCredential({ registrationOptions });
            if (registerCredentialResponse.status !== "OK") {
                return registerCredentialResponse;
            }

            // We should have a valid registration response for the passed credentials
            // and we are good to go ahead and verify them.
            return await this.signUp({
                webauthnGeneratedOptionsId: registrationOptions.webauthnGeneratedOptionsId,
                credential: registerCredentialResponse.registrationResponse,
                options,
                userContext,
            });
        },
        authenticateCredential: async function ({ authenticationOptions }) {
            let authenticationResponse: AuthenticationResponseJSON;
            try {
                authenticationResponse = await startAuthentication({ optionsJSON: authenticationOptions });
            } catch (error: any) {
                return {
                    status: "FAILED_TO_AUTHENTICATE_USER",
                    error: error,
                };
            }

            return {
                status: "OK",
                authenticationResponse: authenticationResponse,
            };
        },
        authenticateCredentialWithSignIn: async function ({ options, userContext }) {
            // Make a call to get the sign in options using the entered email ID.
            const signInOptions = await this.getSignInOptions({ options, userContext });
            if (signInOptions?.status !== "OK") {
                // We want to return the error as is if status was not "OK"
                return signInOptions;
            }

            // We should have the options ready and are good to start the authentication
            const authenticateCredentialResponse = await this.authenticateCredential({
                authenticationOptions: signInOptions,
            });
            if (authenticateCredentialResponse.status !== "OK") {
                return authenticateCredentialResponse;
            }

            // We should have a valid authentication response at this point so we can
            // go ahead and sign in the user.
            return await this.signIn({
                webauthnGeneratedOptionsId: signInOptions.webauthnGeneratedOptionsId,
                credential: authenticateCredentialResponse.authenticationResponse,
                options: options,
                userContext: userContext,
            });
        },
        registerCredentialWithRecoverAccount: async function ({ recoverAccountToken, options, userContext }) {
            // Get the registration options based on the recoverAccountToken and
            // register the device against the user.
            const registrationOptions = await this.getRegisterOptions({ options, userContext, recoverAccountToken });
            if (registrationOptions?.status !== "OK") {
                // If we did not get an OK status, we need to return the error as is.

                // If the `status` is `INVALID_EMAIL_ERROR`, we need to throw an
                // error since that should never happen as we are registering with a recover account token
                // and not an email ID.
                if (registrationOptions?.status === "INVALID_EMAIL_ERROR") {
                    throw new Error("Got `INVALID_EMAIL_ERROR` status that should never happen");
                }

                return registrationOptions;
            }

            // We should have received a valid registration options response.
            const registerCredentialResponse = await this.registerCredential({ registrationOptions });
            if (registerCredentialResponse.status !== "OK") {
                return registerCredentialResponse;
            }

            return await this.recoverAccount({
                token: recoverAccountToken,
                webauthnGeneratedOptionsId: registrationOptions.webauthnGeneratedOptionsId,
                credential: registerCredentialResponse.registrationResponse,
                options,
                userContext,
            });
        },
    };
}

export { getRecipeImplementation };
