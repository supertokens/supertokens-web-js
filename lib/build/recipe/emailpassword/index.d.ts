import { InputType, RecipeInterface, PreAPIHookContext, NormalisedInputType } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
export default class RecipeWrapper {
    static init(config: InputType): import("../../types").CreateRecipeFunction<PreAPIHookContext, NormalisedInputType>;
    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              jsonBody: any;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              jsonBody: any;
              fetchResponse: Response;
          }
    >;
    static sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              jsonBody: any;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              jsonBody: any;
              fetchResponse: Response;
          }
    >;
    static signUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: import("../recipeModule/types").UserType;
              jsonBody: any;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              jsonBody: any;
              fetchResponse: Response;
          }
    >;
    static signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: import("../recipeModule/types").UserType;
              jsonBody: any;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              jsonBody: any;
              fetchResponse: Response;
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              jsonBody: any;
              fetchResponse: Response;
          }
    >;
    static doesEmailExist(input: {
        email: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        jsonBody: any;
        fetchResponse: Response;
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const submitNewPassword: typeof RecipeWrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof RecipeWrapper.sendPasswordResetEmail;
declare const signUp: typeof RecipeWrapper.signUp;
declare const signIn: typeof RecipeWrapper.signIn;
declare const doesEmailExist: typeof RecipeWrapper.doesEmailExist;
export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
};
