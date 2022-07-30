import {
    NormalisedRecipeConfig,
    RecipeConfig,
    RecipeFunctionOptions,
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction =
    | "PASSWORDLESS_CREATE_CODE"
    | "PASSWORDLESS_CONSUME_CODE"
    | "PASSWORDLESS_RESEND_CODE"
    | "EMAIL_EXISTS"
    | "PHONE_NUMBER_EXISTS";
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type UserInput = {
    /**
     * Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/frontend-functions-override/about the documentation}
     */
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;
export declare type InputType = RecipeConfig<PreAndPostAPIHookAction> & UserInput;
export declare type NormalisedInputType = NormalisedRecipeConfig<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type PasswordlessUser = {
    id: string;
    email?: string;
    phoneNumber?: string;
    timeJoined: number;
};
export declare type PasswordlessFlowType = "USER_INPUT_CODE" | "MAGIC_LINK" | "USER_INPUT_CODE_AND_MAGIC_LINK";
export declare type RecipeInterface = {
    /**
     * Create and send a code to the user for passwordless auth
     *
     * @param email Email of the user, ignored if `phoneNumber` is provided
     *
     * @param phoneNumber Phone number of the user
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", deviceId, preAuthSessionId, flowType}` If successful
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    createCode: (
        input:
            | {
                  email: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
    ) => Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;
    /**
     * Resend the code to the user
     *
     * @param deviceId The device if from the reponse of `createCode`
     *
     * @param preAuthSessionId The id from the response of `createCode`
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if succesful
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    resendCode: (input: {
        userContext: any;
        deviceId: string;
        preAuthSessionId: string;
        options?: RecipeFunctionOptions;
    }) => Promise<{
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
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
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
    consumeCode: (
        input:
            | {
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  preAuthSessionId: string;
                  linkCode: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
    ) => Promise<
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
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The hash (#) property of the current URL
     */
    getLinkCodeFromURL: (input: { userContext: any }) => string;
    /**
     * Reads and returns the pre auth session id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "preAuthSessionId" query parameter from the current URL
     */
    getPreAuthSessionIdFromURL: (input: { userContext: any }) => string;
    /**
     * Check if a user with the given email exists
     *
     * @param email Email to check
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    doesEmailExist: (input: { email: string; userContext: any; options?: RecipeFunctionOptions }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    /**
     * Check if a user with the given phone number exists
     *
     * @param phoneNumber Phone number to check
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    doesPhoneNumberExist: (input: {
        phoneNumber: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
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
    getLoginAttemptInfo: <CustomLoginAttemptInfoProperties>(input: { userContext: any }) => Promise<
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
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    setLoginAttemptInfo: <CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext: any;
    }) => Promise<void>;
    /**
     * Clear any information about login attempts from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    clearLoginAttemptInfo: (input: { userContext: any }) => Promise<void>;
};
