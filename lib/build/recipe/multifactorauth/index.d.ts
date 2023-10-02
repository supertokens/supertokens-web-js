import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<"GET_MFA_INFO">;
    static getMFAInfo(userContext?: any): Promise<{
        status: "OK";
        info: import("./types").MFAInfo;
    }>;
    static MultiFactorAuthClaim: import("./multiFactorAuthClaim").MultiFactorAuthClaimClass;
}
declare const init: typeof RecipeWrapper.init;
declare const getMFAInfo: typeof RecipeWrapper.getMFAInfo;
declare const MultiFactorAuthClaim: import("./multiFactorAuthClaim").MultiFactorAuthClaimClass;
export {
    init,
    getMFAInfo,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    MultiFactorAuthClaim,
};
