import { RecipeFunctionOptions } from "../recipeModule/types";
import { AllowedDomainsClaim } from "./allowedDomainsClaim";
import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<"GET_LOGIN_METHODS">;
    /**
     * Gets enabled login methods and their configuration from the backend
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     *
     * @returns `{status: OK, emailpassword, passwordless, thirdParty}` if successful
     */
    static getLoginMethods(input?: { tenantId?: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        thirdParty: {
            providers: {
                id: string;
                name: string;
            }[];
        };
        firstFactors: string[];
        fetchResponse: Response;
    }>;
    /**
     * Gets enabled login methods and their configuration from the backend
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns `Promise<string | undefined> | string | undefined`
     */
    static getTenantId(input?: { userContext?: any }): Promise<string | undefined> | string | undefined;
    static AllowedDomainsClaim: import("./allowedDomainsClaim").AllowedDomainsClaimClass;
}
declare const init: typeof RecipeWrapper.init;
declare const getLoginMethods: typeof RecipeWrapper.getLoginMethods;
declare const getTenantId: typeof RecipeWrapper.getTenantId;
export {
    init,
    getLoginMethods,
    getTenantId,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    AllowedDomainsClaim,
};
