import { RecipePostAPIHookContext, RecipePreAPIHookContext, UserType } from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    NormalisedInputType as NormalisedAuthRecipeType,
    InputType as AuthRecipeInputType,
} from "../authRecipeWithEmailVerification/types";
export declare type PreAndPostAPIHookAction =
    | "EMAIL_PASSWORD_SIGN_UP"
    | "EMAIL_PASSWORD_SIGN_IN"
    | "SEND_RESET_PASSWORD_EMAIL"
    | "SUBMIT_NEW_PASSWORD"
    | "EMAIL_EXISTS";
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type NormalisedInputType = NormalisedAuthRecipeType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;
    signUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: UserType;
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;
    signIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: UserType;
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              networkResponse: {
                  jsonBody: any;
                  fetchResponse: Response;
              };
          }
    >;
    doesEmailExist: (input: {
        email: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
};
