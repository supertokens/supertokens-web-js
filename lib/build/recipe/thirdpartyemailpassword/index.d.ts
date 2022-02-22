import { RecipeFunctionOptions, UserType } from "../emailpassword";
import { StateObject } from "../thirdparty/types";
import { InputType, RecipeInterface, PreAPIHookContext, PostAPIHookContext } from "./types";
export default class Wrapper {
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
    static getOAuthAuthorisationURL(input: {
        thirdPartyProviderId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    static signInAndUp(
        input:
            | {
                  type: "thirdparty";
                  thirdPartyProviderId: string;
                  thirdPartyProviderClientId?: string;
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
        | {
              type: "thirdparty";
              status: "FIELD_ERROR";
              error: string;
              fetchResponse: Response;
          }
    >;
    static getOAuthState(input: { userContext?: any }): {
        status: "OK";
        state: StateObject | undefined;
    };
    static setOAuthState(input: { state: StateObject; userContext?: any }): {
        status: "OK";
    };
    static getThirdPartyLoginRedirectURL(input: {
        thirdPartyProviderId: string;
        state?: StateObject;
        userContext?: any;
    }): Promise<
        | {
              status: "ERROR";
          }
        | {
              status: "OK";
              url: string;
          }
    >;
}
declare const init: typeof Wrapper.init;
declare const submitNewPassword: typeof Wrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof Wrapper.sendPasswordResetEmail;
declare const doesEmailExist: typeof Wrapper.doesEmailExist;
declare const getOAuthAuthorisationURL: typeof Wrapper.getOAuthAuthorisationURL;
declare const signInAndUp: typeof Wrapper.signInAndUp;
declare const getOAuthState: typeof Wrapper.getOAuthState;
declare const setOAuthState: typeof Wrapper.setOAuthState;
declare const getThirdPartyLoginRedirectURL: typeof Wrapper.getThirdPartyLoginRedirectURL;
export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    doesEmailExist,
    getOAuthAuthorisationURL,
    signInAndUp,
    getOAuthState,
    setOAuthState,
    getThirdPartyLoginRedirectURL,
    UserType,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
