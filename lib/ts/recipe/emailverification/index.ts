import { InputType, RecipeInterface, PreAPIHookContext } from "./types";
import Recipe from "./recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";

export default class RecipeWrapper {
    static init(config: InputType) {
        return Recipe.init(config);
    }

    static verifyEmail(input: { token?: string; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "CUSTOM_RESPONSE" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse?: Response;
    }> {
        return Recipe.getInstanceOrThrow().verifyEmail({
            token: input.token,
            options: input.options,
        });
    }

    static sendVerificationEmail(input: { options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" | "CUSTOM_RESPONSE";
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().sendVerificationEmail({ options: input.options });
    }

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
    > {
        return Recipe.getInstanceOrThrow().isEmailVerified({ options: input.options });
    }
}

const init = RecipeWrapper.init;
const verifyEmail = RecipeWrapper.verifyEmail;
const sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
const isEmailVerified = RecipeWrapper.isEmailVerified;

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
