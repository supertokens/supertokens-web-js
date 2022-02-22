import { UserType } from "../authRecipeWithEmailVerification/types";
import { RecipeFunctionOptions } from "../emailpassword";
import { InputType, StateObject, PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext } from "./types";
export default class Wrapper {
    static init(config?: InputType): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getOAuthState(input?: { userContext?: any }): {
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
    static getOAuthAuthorisationURL(input: {
        thirdPartyProviderId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    static signInAndUp(input: {
        thirdPartyProviderId: string;
        thirdPartyProviderClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              error: string;
              fetchResponse: Response;
          }
    >;
}
declare const init: typeof Wrapper.init;
declare const getOAuthState: typeof Wrapper.getOAuthState;
declare const setOAuthState: typeof Wrapper.setOAuthState;
declare const getThirdPartyLoginRedirectURL: typeof Wrapper.getThirdPartyLoginRedirectURL;
declare const getOAuthAuthorisationURL: typeof Wrapper.getOAuthAuthorisationURL;
declare const signInAndUp: typeof Wrapper.signInAndUp;
export {
    init,
    getOAuthState,
    setOAuthState,
    getThirdPartyLoginRedirectURL,
    getOAuthAuthorisationURL,
    signInAndUp,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    InputType,
};
