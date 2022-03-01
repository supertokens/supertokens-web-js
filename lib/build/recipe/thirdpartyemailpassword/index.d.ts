import { RecipeFunctionOptions, UserType } from "../emailpassword";
import { InputType, RecipeInterface, PreAPIHookContext, PostAPIHookContext } from "./types";
export default class RecipeWrapper {
    static init(
        config?: InputType
    ): import("../../types").CreateRecipeFunction<import("./types").PreAndPostAPIHookAction>;
    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
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
    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static signInAndUp(
        input:
            | {
                  type: "thirdparty";
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  type: "emailpassword";
                  isSignIn: boolean;
                  formFields: {
                      id: string;
                      value: string;
                  }[];
                  options?: RecipeFunctionOptions;
                  userContext?: any;
              }
    ): Promise<
        | {
              type: "emailpassword" | "thirdparty";
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              type: "thirdparty";
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;
    static getAuthorizationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        userContext?: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    static verifyEmail(input: { token?: string; options?: RecipeFunctionOptions; userContext: any }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;
    static sendVerificationEmail(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    static isEmailVerified(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const submitNewPassword: typeof RecipeWrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof RecipeWrapper.sendPasswordResetEmail;
declare const doesEmailExist: typeof RecipeWrapper.doesEmailExist;
declare const signInAndUp: typeof RecipeWrapper.signInAndUp;
declare const getAuthorizationURLWithQueryParamsAndSetState: typeof RecipeWrapper.getAuthorizationURLWithQueryParamsAndSetState;
declare const verifyEmail: typeof RecipeWrapper.verifyEmail;
declare const sendVerificationEmail: typeof RecipeWrapper.sendVerificationEmail;
declare const isEmailVerified: typeof RecipeWrapper.isEmailVerified;
export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    doesEmailExist,
    signInAndUp,
    getAuthorizationURLWithQueryParamsAndSetState,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    UserType,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
