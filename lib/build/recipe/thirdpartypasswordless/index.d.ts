import { UserInput, RecipeInterface, PreAPIHookContext, PostAPIHookContext, PreAndPostAPIHookAction } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { ThirdPartyUserType } from "../thirdparty/types";
import { PasswordlessFlowType, PasswordlessUser } from "../passwordless/types";
import { StateObject } from "../thirdparty/types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    static signOut(input?: { userContext?: any }): Promise<void>;
    /**
     * Get the URL to be used by the third party provider for redirecting after the auth flow
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
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
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    static getThirdPartyStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined;
    /**
     * Set the login state to storage
     *
     * @param state
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    static setThirdPartyStateAndOtherInfoToStorage<CustomStateProperties>(input: {
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        userContext?: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    /**
     * Generate a new state that will be sent to the thirs party provider
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns string
     */
    static generateThirdPartyStateToSendToOAuthProvider(input?: { userContext?: any }): string;
    /**
     * Verify that the state recieved from the third party provider matches the one in storage
     *
     * @param stateForAuthProvider State recieved as query param after redirection from third party provider
     *
     * @param stateObjectFromStorage State object from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    static verifyAndGetThirdPartyStateOrThrowError<CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext?: any;
    }): Promise<StateObject & CustomStateProperties>;
    /**
     * Returns the auth code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "code" query param from the current URL. Returns an empty string if no code exists
     */
    static getThirdPartyAuthCodeFromURL(input?: { userContext?: any }): string;
    /**
     * Returns the error from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "error" query param from the current URL. Returns undefined if no error exists
     */
    static getThirdPartyAuthErrorFromURL(input?: { userContext?: any }): string | undefined;
    /**
     * Returns the auth state from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "state" query param from the current URL. Returns an empty string if no state exists
     */
    static getThirdPartyAuthStateFromURL(input?: { userContext?: any }): string;
    /**
     * Create and send a code to the user for passwordless auth
     *
     * @param email Email of the user, ignored if `phoneNumber` is provided
     *
     * @param phoneNumber Phone number of the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", deviceId, preAuthSessionId, flowType}` If successful
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static createPasswordlessCode(
        input:
            | {
                  email: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;
    /**
     * Resend the code to the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if succesful
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static resendPasswordlessCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    /**
     * Log the user in using the input code or link code
     *
     * @param userInputCode Code that the user inputs
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", user, createdNewUser: bool}` if succesful
     *
     * @returns `{status: "INCORRECT_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is incorrect
     *
     * @returns `{status: "EXPIRED_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is expired
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static consumePasswordlessCode(
        input?:
            | {
                  userInputCode: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: any;
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
        | {
              status: "RESTART_FLOW_ERROR";
              fetchResponse: Response;
          }
    >;
    /**
     * Reads and returns the link code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The hash (#) property of the current URL
     */
    static getPasswordlessLinkCodeFromURL(input?: { userContext?: any }): string;
    /**
     * Reads and returns the pre auth session id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "preAuthSessionId" query parameter from the current URL
     */
    static getPasswordlessPreAuthSessionIdFromURL(input?: { userContext?: any }): string;
    /**
     * Check if a user with the given email exists
     *
     * @param email Email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static doesPasswordlessUserEmailExist(input: {
        email: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    /**
     * Check if a user with the given phone number exists
     *
     * @param phoneNumber Phone number to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static doesPasswordlessUserPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    /**
     * Get information about the current login attempt from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns `{deviceId, preAuthSessionId, flowType}` if present, returns undefined otherwise
     */
    static getPasswordlessLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    >;
    /**
     * Set information about the current login attempt to storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    static setPasswordlessLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void>;
    /**
     * Clear any information about login attempts from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    static clearPasswordlessLoginAttemptInfo(input?: { userContext?: any }): Promise<void>;
}
declare const init: typeof RecipeWrapper.init;
declare const getThirdPartyAuthorisationURLWithQueryParamsAndSetState: typeof RecipeWrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
declare const thirdPartySignInAndUp: typeof RecipeWrapper.thirdPartySignInAndUp;
declare const createPasswordlessCode: typeof RecipeWrapper.createPasswordlessCode;
declare const resendPasswordlessCode: typeof RecipeWrapper.resendPasswordlessCode;
declare const consumePasswordlessCode: typeof RecipeWrapper.consumePasswordlessCode;
declare const doesPasswordlessUserEmailExist: typeof RecipeWrapper.doesPasswordlessUserEmailExist;
declare const doesPasswordlessUserPhoneNumberExist: typeof RecipeWrapper.doesPasswordlessUserPhoneNumberExist;
declare const getAuthorisationURLFromBackend: typeof RecipeWrapper.getAuthorisationURLFromBackend;
declare const getThirdPartyStateAndOtherInfoFromStorage: typeof RecipeWrapper.getThirdPartyStateAndOtherInfoFromStorage;
declare const setThirdPartyStateAndOtherInfoToStorage: typeof RecipeWrapper.setThirdPartyStateAndOtherInfoToStorage;
declare const generateThirdPartyStateToSendToOAuthProvider: typeof RecipeWrapper.generateThirdPartyStateToSendToOAuthProvider;
declare const verifyAndGetThirdPartyStateOrThrowError: typeof RecipeWrapper.verifyAndGetThirdPartyStateOrThrowError;
declare const getThirdPartyAuthCodeFromURL: typeof RecipeWrapper.getThirdPartyAuthCodeFromURL;
declare const getThirdPartyAuthErrorFromURL: typeof RecipeWrapper.getThirdPartyAuthErrorFromURL;
declare const getThirdPartyAuthStateFromURL: typeof RecipeWrapper.getThirdPartyAuthStateFromURL;
declare const getPasswordlessLinkCodeFromURL: typeof RecipeWrapper.getPasswordlessLinkCodeFromURL;
declare const getPasswordlessPreAuthSessionIdFromURL: typeof RecipeWrapper.getPasswordlessPreAuthSessionIdFromURL;
declare const getPasswordlessLoginAttemptInfo: typeof RecipeWrapper.getPasswordlessLoginAttemptInfo;
declare const setPasswordlessLoginAttemptInfo: typeof RecipeWrapper.setPasswordlessLoginAttemptInfo;
declare const clearPasswordlessLoginAttemptInfo: typeof RecipeWrapper.clearPasswordlessLoginAttemptInfo;
declare const signOut: typeof RecipeWrapper.signOut;
export {
    init,
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
    thirdPartySignInAndUp,
    createPasswordlessCode,
    resendPasswordlessCode,
    consumePasswordlessCode,
    doesPasswordlessUserEmailExist,
    doesPasswordlessUserPhoneNumberExist,
    signOut,
    getAuthorisationURLFromBackend,
    getThirdPartyStateAndOtherInfoFromStorage,
    setThirdPartyStateAndOtherInfoToStorage,
    generateThirdPartyStateToSendToOAuthProvider,
    verifyAndGetThirdPartyStateOrThrowError,
    getThirdPartyAuthCodeFromURL,
    getThirdPartyAuthErrorFromURL,
    getThirdPartyAuthStateFromURL,
    getPasswordlessLinkCodeFromURL,
    getPasswordlessPreAuthSessionIdFromURL,
    getPasswordlessLoginAttemptInfo,
    setPasswordlessLoginAttemptInfo,
    clearPasswordlessLoginAttemptInfo,
    PasswordlessUser,
    PasswordlessFlowType,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    StateObject,
    ThirdPartyUserType,
};
