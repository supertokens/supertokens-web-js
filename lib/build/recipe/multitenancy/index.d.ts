import { RecipeFunctionOptions } from "../recipeModule/types";
import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<"GET_LOGIN_METHODS">;
    /**
     * Gets enabled login methods and their configuration from the backend
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant.
     *
     * @param userContext (OPTIONAL) Refer to {@link TODO the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     *
     * @returns `{status: OK, emailpassword, passwordless, thirdParty}` if successful
     */
    static getLoginMethods(input?: { tenantId?: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        emailPassword: {
            enabled: boolean;
        };
        passwordless: {
            enabled: boolean;
        };
        thirdParty: {
            enabled: boolean;
            providers: {
                id: string;
                name: string;
            }[];
        };
        fetchResponse: Response;
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const getLoginMethods: typeof RecipeWrapper.getLoginMethods;
export {
    init,
    getLoginMethods,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
};
