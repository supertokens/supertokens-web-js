import { RecipeFunctionOptions } from "../emailpassword";
import {
    PreAndPostAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext,
    RecipeInterface,
    UserInput,
    LoginInfo,
} from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    /**
     * Returns information about an OAuth login in progress
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", info: LoginInfo}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getLoginChallengeInfo(input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<{
        status: "OK";
        info: LoginInfo;
        fetchResponse: Response;
    }>;
    /**
     * Accepts the OAuth2 Login request and returns the redirect URL to continue the OAuth flow.
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getRedirectURLToContinueOAuthFlow(input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }>;
    /**
     * Accepts the OAuth2 Logout request, clears the SuperTokens session and returns post logout redirect URL.
     *
     * @param logoutChallenge The logout challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static logOut(input: { logoutChallenge: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const getLoginChallengeInfo: typeof RecipeWrapper.getLoginChallengeInfo;
declare const getRedirectURLToContinueOAuthFlow: typeof RecipeWrapper.getRedirectURLToContinueOAuthFlow;
declare const logOut: typeof RecipeWrapper.logOut;
export {
    init,
    getLoginChallengeInfo,
    getRedirectURLToContinueOAuthFlow,
    logOut,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    LoginInfo,
    RecipeFunctionOptions,
};
