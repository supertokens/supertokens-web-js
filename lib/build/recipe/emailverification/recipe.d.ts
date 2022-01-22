import { CreateRecipeFunction } from "../../types";
import RecipeModule from "../recipeModule";
import { InputType, NormalisedInputType, PreAPIHookContext, RecipeInterface } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
export default class Recipe implements RecipeModule<PreAPIHookContext, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    config: NormalisedInputType;
    recipeImplementation: RecipeInterface;
    constructor(config: InputType);
    static init(config: InputType): CreateRecipeFunction<PreAPIHookContext, NormalisedInputType>;
    static getInstanceOrThrow(): Recipe;
    verifyEmail({ token, options }: { token?: string; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "CUSTOM_RESPONSE" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse?: Response;
    }>;
    sendVerificationEmail({ options }: { options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" | "CUSTOM_RESPONSE";
        fetchResponse: Response;
    }>;
    isEmailVerified({ options }: { options?: RecipeFunctionOptions }): Promise<
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
