import { RecipeFunctionOptions } from "../emailpassword";
import {
    PreAndPostAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext,
    StateObject,
    RecipeInterface,
    UserInput,
    ThirdPartyUserType,
} from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    static signOut(input?: { userContext?: any }): Promise<void>;
    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined;
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
    }): Promise<void>;
    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param authorisationURL The URL that should be used for redirection after the third party flow finishes. This is ignored if the backend has a pre-configured redirect_url
     *
     * @param providerClientId (OPTIONAL) Client id to be used for the third party provider
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
        providerId: string;
        authorisationURL: string;
        providerClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    /**
     * Get the URL to be used by the third party provider for redirecting after the auth flow
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
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
        providerId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
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
    >;
    /**
     * Generate a new state that will be sent to the third party provider
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns string
     */
    static generateStateToSendToOAuthProvider(input?: { userContext?: any }): string;
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
    }): Promise<StateObject & CustomStateProperties>;
    /**
     * Returns the auth code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "code" query param from the current URL. Returns an empty string if no code exists
     */
    static getAuthCodeFromURL(input?: { userContext?: any }): string;
    /**
     * Returns the error from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "error" query param from the current URL. Returns undefined if no error exists
     */
    static getAuthErrorFromURL(input?: { userContext?: any }): string | undefined;
    /**
     * Returns the auth state from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @returns The "state" query param from the current URL. Returns an empty string if no state exists
     */
    static getAuthStateFromURL(input?: { userContext?: any }): string;
}
declare const init: typeof RecipeWrapper.init;
declare const getAuthorisationURLWithQueryParamsAndSetState: typeof RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState;
declare const signInAndUp: typeof RecipeWrapper.signInAndUp;
declare const getStateAndOtherInfoFromStorage: typeof RecipeWrapper.getStateAndOtherInfoFromStorage;
declare const setStateAndOtherInfoToStorage: typeof RecipeWrapper.setStateAndOtherInfoToStorage;
declare const getAuthorisationURLFromBackend: typeof RecipeWrapper.getAuthorisationURLFromBackend;
declare const generateStateToSendToOAuthProvider: typeof RecipeWrapper.generateStateToSendToOAuthProvider;
declare const verifyAndGetStateOrThrowError: typeof RecipeWrapper.verifyAndGetStateOrThrowError;
declare const getAuthCodeFromURL: typeof RecipeWrapper.getAuthCodeFromURL;
declare const getAuthErrorFromURL: typeof RecipeWrapper.getAuthErrorFromURL;
declare const getAuthStateFromURL: typeof RecipeWrapper.getAuthStateFromURL;
declare const signOut: typeof RecipeWrapper.signOut;
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
    getAuthCodeFromURL,
    getAuthErrorFromURL,
    getAuthStateFromURL,
    RecipeInterface,
    StateObject,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    ThirdPartyUserType,
};
