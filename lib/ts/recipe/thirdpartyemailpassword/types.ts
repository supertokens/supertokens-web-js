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
    UserType as EmailPasswordUserType,
    PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction,
} from "../emailpassword/types";
import {
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import { PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction, StateObject } from "../thirdparty/types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    InputType as AuthRecipeInputType,
    NormalisedInputType as AuthRecipeNormalisedInputType,
} from "../authRecipe/types";

import OverrideableBuilder from "supertokens-js-override";
import { ThirdPartyUserType } from "../thirdparty/types";

export type PreAndPostAPIHookAction = EmailPasswordPreAndPostAPIHookAction | ThirdPartyPreAndPostAPIHookAction;

export type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;

export type UserInput = {
    /**
     * Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/frontend-functions-override/about the documentation}
     */
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;

export type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;

export type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type RecipeInterface = {
    /**
     * Submit a new password for the user
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more)
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "RESET_PASSWORD_INVALID_TOKEN_ERROR"}` if the token in the URL is invalid
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the form field values are incorrect
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
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

    /**
     * Send an email to the user for password reset
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more)
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
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

    /**
     * Check if an email exists
     *
     * @param email The email to check
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    doesEmailExist: (input: { email: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;

    /**
     * Sign up a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    emailPasswordSignUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: EmailPasswordUserType;
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

    /**
     * Sign in a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "WRONG_CREDENTIALS_ERROR"}` if the credentials are invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    emailPasswordSignIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: EmailPasswordUserType;
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
    >;

    /**
     * Reads and returns the reset password token from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "token" query parameter from the current location
     */
    getResetPasswordTokenFromURL: (input: { userContext: any }) => string;

    /**
     * Get the URL to be used by the third party provider for redirecting after the auth flow. Also returns PKCE Code Verifier if using PKCE.
     *
     * @param thirdPartyId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param redirectURIOnProviderDashboard The redirect URL that is configured on the provider dashboard
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", url, pkceCodeVerifier?}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    getAuthorisationURLFromBackend: (input: {
        thirdPartyId: string;
        redirectURIOnProviderDashboard: string;
        tenantId?: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        pkceCodeVerifier?: string;
        fetchResponse: Response;
    }>;

    /**
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    thirdPartySignInAndUp: (input: { userContext: any; options?: RecipeFunctionOptions }) => Promise<
        | {
              status: "OK";
              user: ThirdPartyUserType;
              createdNewUser: boolean;
              tenantId?: string;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;

    /**
     * Get the list of configured third party providers from the backend
     *
     * @param tenantId (OPTIONAL) The tenant ID for which the providers should be fetched
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, providers: Array<{id: string, name: string}>}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    thirdPartyGetConfiguredProviders: (input: {
        tenantId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        providers: {
            id: string;
            name?: string;
        }[];
        fetchResponse: Response;
    }>;

    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    getStateAndOtherInfoFromStorage: <CustomStateProperties>(input: {
        userContext: any;
    }) => (StateObject & CustomStateProperties) | undefined;

    /**
     * Set the login state to storage
     *
     * @param state
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     */
    setStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext: any;
    }) => Promise<void>;

    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param authorisationURL The URL that should be used for redirection after the third party flow finishes. This is ignored if the backend has a pre-configured redirect_url
     *
     * @param providerClientId (OPTIONAL) Client id to be used for the third party provider
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     */
    getAuthorisationURLWithQueryParamsAndSetState: (input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        tenantId?: string;
        redirectURIOnProviderDashboard?: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;

    /**
     * Generate a new state that will be sent to the thirs party provider
     *
     * @param frontendRedirectURI (OPTIONAL) The URL that should be saved in the state object which can be used for redirection from the backend
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns string
     */
    generateStateToSendToOAuthProvider: (input?: { frontendRedirectURI?: string; userContext: any }) => string;

    /**
     * Verify that the state recieved from the third party provider matches the one in storage
     *
     * @param stateForAuthProvider State recieved as query param after redirection from third party provider
     *
     * @param stateObjectFromStorage State object from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     */
    verifyAndGetStateOrThrowError: <CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext: any;
    }) => Promise<StateObject & CustomStateProperties>;

    /**
     * Returns the error from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "error" query param from the current URL. Returns undefined if no error exists
     */
    getAuthErrorFromURL: (input: { userContext: any }) => string | undefined;

    /**
     * Returns the auth state from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "state" query param from the current URL. Returns an empty string if no state exists
     */
    getAuthStateFromURL: (input: { userContext: any }) => string;
};
