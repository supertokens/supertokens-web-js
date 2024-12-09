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

import { GeneralErrorResponse, User } from "../../types";
import { getNormalisedUserContext } from "../../utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import Recipe from "./recipe";
import { CredentialPayload, ResidentKey, UserInput, UserVerification } from "./types";

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
    static registerOptions(
        input: { options?: RecipeFunctionOptions; userContext: any } & (
            | { email: string }
            | { recoverAccountToken: string }
        )
    ): Promise<
        | {
              status: "OK";
              webauthnGeneratedOptionsId: string;
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
        return Recipe.getInstanceOrThrow().recipeImplementation.registerOptions({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * TODO: Add description once Victor shares the difference between registerOptions and this.
     *
     * @param email Email to add signin options against.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the webauthn options (challenge, etc.)
     */
    static signinOptions(input: { email: string; options?: RecipeFunctionOptions; userContext: any }): Promise<
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
        return Recipe.getInstanceOrThrow().recipeImplementation.signInOptions({
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
        credential: CredentialPayload;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
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
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.signUp({
            ...input,
            userContext: input?.userContext,
        });
    }
}

const init = RecipeWrapper.init;
const registerOptions = RecipeWrapper.registerOptions;

export { init, registerOptions };
