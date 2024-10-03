import { User } from "../../types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    PasswordlessFlowType,
    PostAPIHookContext,
    PreAPIHookContext,
    RecipeInterface,
    PreAndPostAPIHookAction,
    UserInput,
} from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    /**
     * Create and send a code to the user for passwordless auth
     *
     * @param email Email of the user, ignored if `phoneNumber` is provided
     *
     * @param phoneNumber Phone number of the user
     *
     * @param shouldTryLinkingWithSessionUser (OPTIONAL) Whether the backend should try to link the user to the session user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", deviceId, preAuthSessionId, flowType}` If successful
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static createCode(
        input:
            | {
                  email: string;
                  shouldTryLinkingWithSessionUser?: boolean;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  shouldTryLinkingWithSessionUser?: boolean;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    >;
    /**
     * Resend the code to the user
     *
     * @param deviceId The device if from the reponse of `createCode`
     *
     * @param preAuthSessionId The id from the response of `createCode`
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if succesful
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static resendCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    /**
     * Log the user in using the input code or link code
     *
     * @param userInputCode Code that the user inputs
     *
     * @param deviceId The device if from the reponse of `createCode`. (Not required when using `linkCode`)
     *
     * @param preAuthSessionId The id from the response of `createCode`.
     *
     * @param linkCode The code from the URL to use when logging the user in. Ignored if `userInputCode` is provided
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", user, createdNewRecipeUser: bool}` if succesful
     *
     * @returns `{status: "INCORRECT_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is incorrect
     *
     * @returns `{status: "EXPIRED_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is expired
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     * @returns `{status: "SIGN_IN_UP_NOT_ALLOWED", reason: string}` if sign in or up is not allowed because of account-linking conflicts
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static consumeCode(
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
              createdNewRecipeUser: boolean;
              user: User;
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
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    >;
    /**
     * Reads and returns the link code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The hash (#) property of the current URL
     */
    static getLinkCodeFromURL(input?: { userContext?: any }): string;
    /**
     * Reads and returns the pre auth session id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "preAuthSessionId" query parameter from the current URL
     */
    static getPreAuthSessionIdFromURL(input?: { userContext?: any }): string;
    /**
     * Reads and returns the tenant id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "tenantId" query parameter from the current location
     */
    static getTenantIdFromURL(input?: { userContext?: any }): string | undefined;
    /**
     * Check if a user with the given email exists
     *
     * @param email Email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static doesEmailExist(input: { email: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    /**
     * Check if a user with the given phone number exists
     *
     * @param phoneNumber Phone number to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static doesPhoneNumberExist(input: {
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
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns `{deviceId, preAuthSessionId, flowType}` if present, returns undefined otherwise
     */
    static getLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              tenantId?: string | string;
              shouldTryLinkingWithSessionUser?: boolean;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    >;
    /**
     * Set information about the current login attempt to storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    static setLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            shouldTryLinkingWithSessionUser?: boolean;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void>;
    /**
     * Clear any information about login attempts from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    static clearLoginAttemptInfo(input?: { userContext?: any }): Promise<void>;
    static signOut(input?: { userContext?: any }): Promise<void>;
}
declare const init: typeof RecipeWrapper.init;
declare const createCode: typeof RecipeWrapper.createCode;
declare const resendCode: typeof RecipeWrapper.resendCode;
declare const consumeCode: typeof RecipeWrapper.consumeCode;
declare const doesEmailExist: typeof RecipeWrapper.doesEmailExist;
declare const doesPhoneNumberExist: typeof RecipeWrapper.doesPhoneNumberExist;
declare const signOut: typeof RecipeWrapper.signOut;
declare const getLinkCodeFromURL: typeof RecipeWrapper.getLinkCodeFromURL;
declare const getPreAuthSessionIdFromURL: typeof RecipeWrapper.getPreAuthSessionIdFromURL;
declare const getTenantIdFromURL: typeof RecipeWrapper.getTenantIdFromURL;
declare const getLoginAttemptInfo: typeof RecipeWrapper.getLoginAttemptInfo;
declare const setLoginAttemptInfo: typeof RecipeWrapper.setLoginAttemptInfo;
declare const clearLoginAttemptInfo: typeof RecipeWrapper.clearLoginAttemptInfo;
export {
    init,
    createCode,
    resendCode,
    consumeCode,
    doesEmailExist,
    doesPhoneNumberExist,
    signOut,
    getLinkCodeFromURL,
    getPreAuthSessionIdFromURL,
    getTenantIdFromURL,
    getLoginAttemptInfo,
    setLoginAttemptInfo,
    clearLoginAttemptInfo,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
};
