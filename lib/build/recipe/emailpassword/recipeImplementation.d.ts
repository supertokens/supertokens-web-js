import { NormalisedAppInfo } from "../../types";
import { RecipeFunctionOptions, UserType } from "../recipeModule/types";
import { NormalisedInputType } from "./types";
export default function getRecipeImplementation(
    recipeId: string,
    appInfo: NormalisedAppInfo
): {
    submitNewPassword: ({
        formFields,
        token,
        config,
        options,
        userContext,
    }: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string | undefined;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions | undefined;
        userContext: any;
    }) => Promise<
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
    sendPasswordResetEmail: ({
        formFields,
        config,
        options,
        userContext,
    }: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions | undefined;
        userContext: any;
    }) => Promise<
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
    signUp: ({
        formFields,
        config,
        options,
        userContext,
    }: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions | undefined;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: UserType;
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
    signIn: ({
        formFields,
        config,
        options,
        userContext,
    }: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions | undefined;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: UserType;
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
    doesEmailExist: ({
        email,
        config,
        options,
        userContext,
    }: {
        email: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions | undefined;
        userContext: any;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        jsonBody: any;
        fetchResponse: Response;
    }>;
};
