import { InputType, RecipeInterface, PreAPIHookContext } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
export default class RecipeWrapper {
    static init(
        config: InputType
    ): import("../../types").CreateRecipeFunction<PreAPIHookContext, import("./types").NormalisedInputType>;
    static verifyEmail(input: { token?: string; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "CUSTOM_RESPONSE" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse?: Response;
    }>;
    static sendVerificationEmail(input: { options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" | "CUSTOM_RESPONSE";
        fetchResponse: Response;
    }>;
    static isEmailVerified(input: { options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              isVerified: boolean;
              fetchResponse: Response;
          }
        | {
              status: "CUSTOM_RESPONSE";
              fetchResponse: Response;
          }
    >;
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
