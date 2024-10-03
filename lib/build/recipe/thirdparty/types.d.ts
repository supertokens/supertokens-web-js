import { User } from "../../types";
import {
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
} from "../authRecipe/types";
import {
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    RecipeFunctionOptions,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction = "GET_AUTHORISATION_URL" | "THIRD_PARTY_SIGN_IN_UP";
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type UserInput = {
    /**
     * Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/frontend-functions-override/about the documentation}
     */
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type StateObject = {
    stateForAuthProvider: string;
    thirdPartyId: string;
    tenantId?: string;
    expiresAt: number;
    redirectURIOnProviderDashboard: string;
    shouldTryLinkingWithSessionUser?: boolean;
    pkceCodeVerifier?: string;
};
export declare type RecipeInterface = {
    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
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
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     */
    setStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext: any;
    }) => Promise<void>;
    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param thirdPartyId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param frontendRedirectURI The URL that should be used for redirection after the third party flow finishes.
     *
     * @param redirectURIOnProviderDashboard (OPTIONAL) The redirect URL that is configured on the provider dashboard. Not required if the value is same as frontendRedirectURI
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant, in case you are using multi-tenancy
     *
     * @param shouldTryLinkingWithSessionUser Whether the backend should try to link the user to the session user
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    getAuthorisationURLWithQueryParamsAndSetState: (input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        tenantId: string | undefined;
        shouldTryLinkingWithSessionUser: boolean | undefined;
        redirectURIOnProviderDashboard?: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;
    /**
     * Get the URL to be used by the third party provider for redirecting after the auth flow. Also returns PKCE Code Verifier if using PKCE.
     *
     * @param thirdPartyId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param redirectURIOnProviderDashboard The redirect URL that is configured on the provider dashboard
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant, in case you are using multi-tenancy
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
        tenantId: string | undefined;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        urlWithQueryParams: string;
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
     * @returns `{status: OK, user, createdNewRecipeUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     * @returns `{status: "SIGN_IN_UP_NOT_ALLOWED", reason: string}` if signing in with this user is not allowed if because of account linking conflicts
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    signInAndUp: (input: { userContext: any; options?: RecipeFunctionOptions }) => Promise<
        | {
              status: "OK";
              user: User;
              createdNewRecipeUser: boolean;
              tenantId?: string;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    >;
    /**
     * Generate a new state that will be sent to the third party provider
     *
     * @param frontendRedirectURI (OPTIONAL) The URL that should be saved in the state object which can be used for redirection from the backend
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
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
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     */
    verifyAndGetStateOrThrowError: <CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext: any;
    }) => Promise<StateObject & CustomStateProperties>;
    /**
     * Returns the error from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "error" query param from the current URL. Returns undefined if no error exists
     */
    getAuthErrorFromURL: (input: { userContext: any }) => string | undefined;
    /**
     * Returns the auth state from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "state" query param from the current URL. Returns an empty string if no state exists
     */
    getAuthStateFromURL: (input: { userContext: any }) => string;
};
