import { UserType } from "../authRecipeWithEmailVerification/types";
import { RecipeFunctionOptions } from "../emailpassword";
import { InputType, PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, StateObject } from "./types";
export default class Wrapper {
    static init(config: InputType): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getAuthorizationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        redirectionURL: string;
        providerClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    static signInAndUp(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
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
    >;
}
declare const init: typeof Wrapper.init;
declare const getAuthorizationURLWithQueryParamsAndSetState: typeof Wrapper.getAuthorizationURLWithQueryParamsAndSetState;
declare const signInAndUp: typeof Wrapper.signInAndUp;
export {
    init,
    getAuthorizationURLWithQueryParamsAndSetState,
    signInAndUp,
    StateObject,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    InputType,
};
