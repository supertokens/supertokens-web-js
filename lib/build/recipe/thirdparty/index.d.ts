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
    static getThirdPartyLoginRedirectURLWithQueryParams(input: {
        thirdPartyProviderId: string;
        thirdPartyRedirectionURL: string;
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
        thirdPartyRedirectionURL: string;
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
declare const getThirdPartyLoginRedirectURLWithQueryParams: typeof Wrapper.getThirdPartyLoginRedirectURLWithQueryParams;
declare const getOAuthAuthorisationURL: typeof Wrapper.getOAuthAuthorisationURL;
declare const signInAndUp: typeof Wrapper.signInAndUp;
export {
    init,
    getOAuthState,
    setOAuthState,
    getThirdPartyLoginRedirectURLWithQueryParams,
    getOAuthAuthorisationURL,
    signInAndUp,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    InputType,
};
