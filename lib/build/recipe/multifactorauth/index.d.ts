import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim";
import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<"GET_MFA_INFO">;
    /**
     * Loads information about what factors the current session can set up/complete and updates the requirements in the session payload
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful
     */
    static resyncSessionAndFetchMFAInfo(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        factors: import("./types").MFAFactorInfo;
        emails: Record<string, string[] | undefined>;
        phoneNumbers: Record<string, string[] | undefined>;
        fetchResponse: Response;
    }>;
    static MultiFactorAuthClaim: MultiFactorAuthClaimClass;
}
declare const init: typeof RecipeWrapper.init;
declare const resyncSessionAndFetchMFAInfo: typeof RecipeWrapper.resyncSessionAndFetchMFAInfo;
declare const MultiFactorAuthClaim: MultiFactorAuthClaimClass;
export {
    init,
    resyncSessionAndFetchMFAInfo,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    MultiFactorAuthClaim,
    MultiFactorAuthClaimClass,
    RecipeFunctionOptions,
};
