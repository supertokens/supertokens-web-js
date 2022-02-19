import { UserType } from "../authRecipeWithEmailVerification/types";
import { RecipeFunctionOptions } from "../emailpassword";
import { InputType, StateObject, PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext } from "./types";
import Apple from "./providers/apple";
import Google from "./providers/google";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import Twitter from "./providers/twitter";
export default class Wrapper {
    static init(config: InputType): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getOAuthState(input?: { userContext?: any }): {
        status: "OK";
        state: StateObject | undefined;
    };
    static setOAuthState(input: { state: StateObject; userContext?: any }): {
        status: "OK";
    };
    static getThirdPartyLoginRedirectURL(input: {
        thirdPartyId: string;
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
        thirdPartyId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    static signInAndUp(input: { thirdPartyId: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<
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
    static Google: typeof Google;
    static Apple: typeof Apple;
    static Facebook: typeof Facebook;
    static Github: typeof Github;
    static Twitter: typeof Twitter;
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
    Apple,
    Google,
    Github,
    Facebook,
    Twitter,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    InputType,
};
