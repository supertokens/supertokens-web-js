import { RecipeFunctionOptions } from "../emailpassword";
import {
    PreAndPostAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext,
    StateObject,
    RecipeInterface,
    UserInput,
    ThirdPartyUserType,
} from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
    static signOut(input?: { userContext?: any }): Promise<void>;
    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param thirdPartyId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param frontendRedirectURI The URL that should be used for redirection after the third party flow finishes.
     *
     * @param redirectURIOnProviderDashboard (OPTIONAL) The redirect URL that is configured on the provider dashboard. Optional if this is same as frontendRedirectURI
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        tenantId?: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    /**
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static signInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: ThirdPartyUserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;
    static getProviders(input?: { tenantId?: string; userContext?: any }): Promise<{
        status: "OK";
        providers: {
            id: string;
            name?: string;
        }[];
        fetchResponse: Response;
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const getAuthorisationURLWithQueryParamsAndSetState: typeof RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState;
declare const signInAndUp: typeof RecipeWrapper.signInAndUp;
declare const getProviders: typeof RecipeWrapper.getProviders;
declare const signOut: typeof RecipeWrapper.signOut;
export {
    init,
    getAuthorisationURLWithQueryParamsAndSetState,
    signInAndUp,
    signOut,
    getProviders,
    RecipeInterface,
    StateObject,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    ThirdPartyUserType,
};
