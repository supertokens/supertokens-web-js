import { InputType, RecipeInterface, PreAPIHookContext, PostAPIHookContext } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { UserType } from "../authRecipeWithEmailVerification/types";
export default class RecipeWrapper {
    static init(
        config?: InputType
    ): import("../../types").CreateRecipeFunction<import("./types").PreAndPostAPIHookAction>;
    static signOut(input?: { userContext?: any }): Promise<void>;
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
    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static verifyEmail(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;
    static sendVerificationEmail(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    static isEmailVerified(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const submitNewPassword: typeof RecipeWrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof RecipeWrapper.sendPasswordResetEmail;
declare const signUp: typeof RecipeWrapper.signUp;
declare const signIn: typeof RecipeWrapper.signIn;
declare const doesEmailExist: typeof RecipeWrapper.doesEmailExist;
declare const verifyEmail: typeof RecipeWrapper.verifyEmail;
declare const sendVerificationEmail: typeof RecipeWrapper.sendVerificationEmail;
declare const isEmailVerified: typeof RecipeWrapper.isEmailVerified;
declare const signOut: typeof RecipeWrapper.signOut;
export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    signOut,
    UserType,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
