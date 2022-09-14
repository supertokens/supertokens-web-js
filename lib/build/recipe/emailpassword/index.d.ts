import { RecipeInterface, PreAPIHookContext, PostAPIHookContext, UserInput } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { UserType } from "./types";
export default class RecipeWrapper {
    static init(
        config?: UserInput
    ): import("../../types").CreateRecipeFunction<import("./types").PreAndPostAPIHookAction>;
    static signOut(input?: { userContext?: any }): Promise<void>;
    /**
     * Submit a new password for the user
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more)
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "RESET_PASSWORD_INVALID_TOKEN_ERROR"}` if the token in the URL is invalid
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the form field values are incorrect
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
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
     * Sign up a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static signUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "WRONG_CREDENTIALS_ERROR"}` if the credentials are invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
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
     * Check if an email exists
     *
     * @param email The email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    /**
     * Reads and returns the reset password token from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "token" query parameter from the current location
     */
    static getResetPasswordTokenFromURL(input?: { userContext?: any }): string;
}
declare const init: typeof RecipeWrapper.init;
declare const submitNewPassword: typeof RecipeWrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof RecipeWrapper.sendPasswordResetEmail;
declare const signUp: typeof RecipeWrapper.signUp;
declare const signIn: typeof RecipeWrapper.signIn;
declare const doesEmailExist: typeof RecipeWrapper.doesEmailExist;
declare const signOut: typeof RecipeWrapper.signOut;
declare const getResetPasswordTokenFromURL: typeof RecipeWrapper.getResetPasswordTokenFromURL;
export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    signOut,
    UserType,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
