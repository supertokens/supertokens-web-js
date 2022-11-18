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

import { getNormalisedUserContext } from "../../utils";
import { RecipeFunctionOptions } from "../emailpassword";
import Recipe from "./recipe";
import {
    PreAndPostAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext,
    StateObject,
    RecipeInterface,
    UserInput,
    ThirdPartyUserType,
    ProviderInfo,
} from "./types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    static signOut(input?: { userContext?: any }) {
        return Recipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Set the login state to storage
     *
     * @param state
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     */
    static setStateAndOtherInfoToStorage<CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        return Recipe.getInstanceOrThrow().recipeImplementation.setStateAndOtherInfoToStorage({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param thirdPartyId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param frontendRedirectURI The URL that should be used for redirection after the third party flow finishes.
     *
     * @param redirectURIOnProviderDashboard (OPTIONAL) The redirect URL that is configured on the provider dashboard. Optional if this is same as frontendRedirectURI
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        return Recipe.getInstanceOrThrow().recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Get the URL to be used by the third party provider for redirecting after the auth flow
     *
     * @param thirdPartyId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param redirectURIOnProviderDashboard The redirect URL that is configured on the provider dashboard
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", url}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getAuthorisationURLFromBackend(input: {
        thirdPartyId: string;
        redirectURIOnProviderDashboard: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        pkceCodeVerifier?: string;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.getAuthorisationURLFromBackend({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static signInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
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
        return Recipe.getInstanceOrThrow().recipeImplementation.signInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Generate a new state that will be sent to the third party provider
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns string
     */
    static generateStateToSendToOAuthProvider(input?: {
        includeOriginInState?: boolean;
        authorisationURL?: string;
        userContext?: any;
    }): string {
        return Recipe.getInstanceOrThrow().recipeImplementation.generateStateToSendToOAuthProvider({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Verify that the state recieved from the third party provider matches the one in storage
     *
     * @param stateForAuthProvider State recieved as query param after redirection from third party provider
     *
     * @param stateObjectFromStorage State object from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     */
    static verifyAndGetStateOrThrowError<CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext?: any;
    }): Promise<StateObject & CustomStateProperties> {
        return Recipe.getInstanceOrThrow().recipeImplementation.verifyAndGetStateOrThrowError({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Returns the query params from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "URLSearchParams" that contains all the query params from the current URL
     */
    static getQueryParamsFromURL(input?: { userContext?: any }): URLSearchParams {
        return Recipe.getInstanceOrThrow().recipeImplementation.getQueryParamsFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Returns the error from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "error" query param from the current URL. Returns undefined if no error exists
     */
    static getAuthErrorFromURL(input?: { userContext?: any }): string | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getAuthErrorFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Returns the auth state from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "state" query param from the current URL. Returns an empty string if no state exists
     */
    static getAuthStateFromURL(input?: { userContext?: any }): string {
        return Recipe.getInstanceOrThrow().recipeImplementation.getAuthStateFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getProviders(input?: { userContext?: any }): Promise<{
        status: "OK";
        providers: ProviderInfo[];
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.getProviders({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const getAuthorisationURLWithQueryParamsAndSetState = RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState;
const signInAndUp = RecipeWrapper.signInAndUp;
const getStateAndOtherInfoFromStorage = RecipeWrapper.getStateAndOtherInfoFromStorage;
const setStateAndOtherInfoToStorage = RecipeWrapper.setStateAndOtherInfoToStorage;
const getAuthorisationURLFromBackend = RecipeWrapper.getAuthorisationURLFromBackend;
const generateStateToSendToOAuthProvider = RecipeWrapper.generateStateToSendToOAuthProvider;
const verifyAndGetStateOrThrowError = RecipeWrapper.verifyAndGetStateOrThrowError;
const getQueryParamsFromURL = RecipeWrapper.getQueryParamsFromURL;
const getAuthErrorFromURL = RecipeWrapper.getAuthErrorFromURL;
const getAuthStateFromURL = RecipeWrapper.getAuthStateFromURL;
const getProviders = RecipeWrapper.getProviders;
const signOut = RecipeWrapper.signOut;

export {
    init,
    getAuthorisationURLWithQueryParamsAndSetState,
    signInAndUp,
    signOut,
    getStateAndOtherInfoFromStorage,
    setStateAndOtherInfoToStorage,
    getAuthorisationURLFromBackend,
    generateStateToSendToOAuthProvider,
    verifyAndGetStateOrThrowError,
    getQueryParamsFromURL,
    getAuthErrorFromURL,
    getAuthStateFromURL,
    getProviders,
    RecipeInterface,
    StateObject,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    ThirdPartyUserType,
};
