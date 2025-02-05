/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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

import { AuthenticationResponseJSON, RegistrationResponseJSON } from "@simplewebauthn/browser";
import { GeneralErrorResponse, User } from "../../types";
import { getNormalisedUserContext } from "../../utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import Recipe from "./recipe";
import {
    ResidentKey,
    UserInput,
    UserVerification,
    RegistrationOptions,
    AuthenticationOptions,
    RecipeInterface,
} from "./types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    /**
     * Registers a new device based on the passed options and returns the
     * challenge to be fulfilled in order for successful addition of the identity.
     *
     * @param email (OPTIONAL) Email to register the options against. This cannot be passed along with recoverAccountToken.
     *
     * @param recoverAccountToken (OPTIONAL) Recover account token in case this is being generated in that context. This cannot be passed along with email.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the created webauthn details (challenge, etc.)
     */
    static getRegisterOptions(
        input: { options?: RecipeFunctionOptions; userContext: any } & (
            | { email: string }
            | { recoverAccountToken: string }
        )
    ): Promise<
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
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.getRegisterOptions({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Returns details about how the authenticator to should verify that a signin
     * is correct.
     *
     * @param email Email to add signin options against.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the webauthn options (challenge, etc.)
     */
    static getSignInOptions(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<
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
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.getSignInOptions({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Signup to ST with the webauthn options ID and the credential received from the
     * device.
     *
     * @param webauthnGeneratedOptionsId ID of the stored options
     *
     * @param credential Details of the credential
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the user details (id, etc.)
     */
    static signUp(input: {
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | { status: "INVALID_CREDENTIALS_ERROR"; fetchResponse: Response }
        | { status: "GENERATED_OPTIONS_NOT_FOUND_ERROR"; fetchResponse: Response }
        | { status: "INVALID_GENERATED_OPTIONS_ERROR"; fetchResponse: Response }
        | { status: "INVALID_AUTHENTICATOR_ERROR"; reason: string; fetchResponse: Response }
        | { status: "EMAIL_ALREADY_EXISTS_ERROR"; fetchResponse: Response }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.signUp({
            ...input,
            userContext: input?.userContext,
        });
    }

    /**
     * Sign in with the credential and the generated options ID.
     *
     * @param webauthnGeneratedOptionsId ID of the stored options
     *
     * @param credential Details of the credential
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the user details (id, etc.)
     */
    static signIn(input: {
        webauthnGeneratedOptionsId: string;
        credential: AuthenticationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | { status: "INVALID_CREDENTIALS_ERROR"; fetchResponse: Response }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.signIn({
            ...input,
            userContext: input?.userContext,
        });
    }

    /**
     * Checks whether there is an webauthn user with the passed email.
     *
     * @param email Email to check for existence
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along with a boolean indicating existence
     */
    static getEmailExists(input: { email: string; options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              exists: boolean;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.getEmailExists({
            ...input,
            userContext: input?.userContext,
        });
    }

    /**
     * Generate and send a recover account token.
     *
     * @param email Email to send the recover account token to.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful
     */
    static generateRecoverAccountToken(input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | { status: "RECOVER_ACCOUNT_NOT_ALLOWED"; reason: string; fetchResponse: Response }
        | GeneralErrorResponse
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.generateRecoverAccountToken({
            ...input,
            userContext: input?.userContext,
        });
    }

    /**
     * Recover the account using the token received in email.
     *
     * @param token Recovery token received in email
     *
     * @param webauthnGeneratedOptionsId Stored options ID for webauthn
     *
     * @param credential Details of the credential
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the user details (id, etc.) and email
     */
    static recoverAccount(input: {
        token: string;
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | { status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR"; fetchResponse: Response }
        | { status: "INVALID_CREDENTIALS_ERROR"; fetchResponse: Response }
        | { status: "GENERATED_OPTIONS_NOT_FOUND_ERROR"; fetchResponse: Response }
        | { status: "INVALID_GENERATED_OPTIONS_ERROR"; fetchResponse: Response }
        | { status: "INVALID_AUTHENTICATOR_ERROR"; reason: string; fetchResponse: Response }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.recoverAccount({
            ...input,
            userContext: input?.userContext,
        });
    }

    /**
     * Register credential with the passed options by using native webauthn functions.
     *
     * It uses `@simplewebauthn/browser` to make the webauthn calls.
     *
     * @param registrationOptions Options to pass for the registration.
     *
     * @returns `{ status: "OK", ...}` if successful along with registration response received
     */
    static registerCredential(input: { registrationOptions: RegistrationOptions }): Promise<
        | {
              status: "OK";
              registrationResponse: RegistrationResponseJSON;
          }
        | { status: "AUTHENTICATOR_ALREADY_REGISTERED" }
        | { status: "FAILED_TO_REGISTER_USER"; error: any }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.registerCredential(input);
    }

    /**
     * Authenticate the credential with the passed options by using native webauthn functions.
     *
     * It uses `@simplewebauthn/browser` to make the webauthn calls.
     *
     * @param authenticationOptions Options to pass for the authentication.
     *
     * @returns `{ status: "OK", ...}` if successful along with authentication response received
     */
    static authenticateCredential(input: { authenticationOptions: AuthenticationOptions }): Promise<
        | {
              status: "OK";
              authenticationResponse: AuthenticationResponseJSON;
          }
        | { status: "FAILED_TO_AUTHENTICATE_USER"; error: any }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.authenticateCredential(input);
    }

    /**
     * Register the new device and signup the user with the passed email ID.
     *
     * It uses `@simplewebauthn/browser` to make the webauthn calls.
     *
     * @param email Email of the user to register and signup
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the user details (id, etc.) and email
     */
    static registerCredentialWithSignUp(input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
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
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | { status: "INVALID_CREDENTIALS_ERROR"; fetchResponse: Response }
        | { status: "GENERATED_OPTIONS_NOT_FOUND_ERROR"; fetchResponse: Response }
        | { status: "INVALID_GENERATED_OPTIONS_ERROR"; fetchResponse: Response }
        | { status: "INVALID_AUTHENTICATOR_ERROR"; reason: string; fetchResponse: Response }
        | { status: "EMAIL_ALREADY_EXISTS_ERROR"; fetchResponse: Response }
        | { status: "AUTHENTICATOR_ALREADY_REGISTERED" }
        | { status: "FAILED_TO_REGISTER_USER"; error: any }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.registerCredentialWithSignUp({
            ...input,
            userContext: input?.userContext,
        });
    }

    /**
     * Authenticate the user and sign them in after verifying their identity.
     *
     * It uses `@simplewebauthn/browser` to make the webauthn calls.
     *
     * @param email Email of the user to authenticate and signin
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the user details (id, etc.) and email
     */
    static authenticateCredentialWithSignIn(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | { status: "INVALID_CREDENTIALS_ERROR"; fetchResponse: Response }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | { status: "FAILED_TO_AUTHENTICATE_USER"; error: any }
        | GeneralErrorResponse
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.authenticateCredentialWithSignIn({
            ...input,
            userContext: input?.userContext,
        });
    }

    /**
     * Register the new device and recover the user's account with the recover token.
     *
     * It uses `@simplewebauthn/browser` to make the webauthn calls.
     *
     * @param recoverAccountToken Recovery token for the user's account
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the user details (id, etc.) and email
     */
    static registerCredentialWithRecoverAccount(input: {
        recoverAccountToken: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | { status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR"; fetchResponse: Response }
        | { status: "INVALID_CREDENTIALS_ERROR"; fetchResponse: Response }
        | { status: "GENERATED_OPTIONS_NOT_FOUND_ERROR"; fetchResponse: Response }
        | { status: "INVALID_GENERATED_OPTIONS_ERROR"; fetchResponse: Response }
        | { status: "INVALID_AUTHENTICATOR_ERROR"; reason: string; fetchResponse: Response }
        | { status: "AUTHENTICATOR_ALREADY_REGISTERED" }
        | { status: "FAILED_TO_REGISTER_USER"; error: any }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.registerCredentialWithRecoverAccount({
            ...input,
            userContext: input?.userContext,
        });
    }
}

const init = RecipeWrapper.init;
const getRegisterOptions = RecipeWrapper.getRegisterOptions;
const getSignInOptions = RecipeWrapper.getSignInOptions;
const signUp = RecipeWrapper.signUp;
const signIn = RecipeWrapper.signIn;
const getEmailExists = RecipeWrapper.getEmailExists;
const generateRecoverAccountToken = RecipeWrapper.generateRecoverAccountToken;
const recoverAccount = RecipeWrapper.recoverAccount;
const registerCredentialWithSignUp = RecipeWrapper.registerCredentialWithSignUp;
const authenticateCredentialWithSignIn = RecipeWrapper.authenticateCredentialWithSignIn;
const registerCredentialWithRecoverAccount = RecipeWrapper.registerCredentialWithRecoverAccount;
const registerCredential = RecipeWrapper.registerCredential;
const authenticateCredential = RecipeWrapper.authenticateCredential;

export {
    init,
    getRegisterOptions,
    getSignInOptions,
    signUp,
    signIn,
    getEmailExists,
    generateRecoverAccountToken,
    recoverAccount,
    registerCredentialWithSignUp,
    authenticateCredentialWithSignIn,
    registerCredentialWithRecoverAccount,
    registerCredential,
    authenticateCredential,
    RecipeInterface,
};
