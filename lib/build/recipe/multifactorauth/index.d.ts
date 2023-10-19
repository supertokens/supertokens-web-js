import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim";
import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<"GET_MFA_INFO">;
    static getMFAInfo(input: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        factors: import("./types").MFAFactorInfo;
        email?: string | undefined;
        phoneNumber?: string | undefined;
        fetchResponse: Response;
    }>;
    static MultiFactorAuthClaim: MultiFactorAuthClaimClass;
}
declare const init: typeof RecipeWrapper.init;
declare const getMFAInfo: typeof RecipeWrapper.getMFAInfo;
declare const MultiFactorAuthClaim: MultiFactorAuthClaimClass;
export {
    init,
    getMFAInfo,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    MultiFactorAuthClaim,
    MultiFactorAuthClaimClass,
    RecipeFunctionOptions,
};
