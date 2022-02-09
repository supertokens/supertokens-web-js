import { InputType, RecipeInterface, PreAPIHookContext } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
export default class RecipeWrapper {
    static init(
        config: InputType
    ): import("../../types").CreateRecipeFunction<
        import("./types").PreAPIHookAction,
        PreAPIHookContext,
        import("./types").PostAPIHookContext,
        import("./types").NormalisedInputType
    >;
    static verifyEmail(input: { token?: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
    static sendVerificationEmail(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
    static isEmailVerified(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        isVerified: boolean;
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const verifyEmail: typeof RecipeWrapper.verifyEmail;
declare const sendVerificationEmail: typeof RecipeWrapper.sendVerificationEmail;
declare const isEmailVerified: typeof RecipeWrapper.isEmailVerified;
export {
    init,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
};
