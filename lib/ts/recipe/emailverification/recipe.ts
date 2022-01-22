import { SSR_ERROR } from "../../constants";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import RecipeModule from "../recipeModule";
import { InputType, NormalisedInputType, PreAPIHookContext, RecipeInterface } from "./types";
import { normaliseUserInput } from "./utils";
import RecipeImplementation from "./recipeImplementation";
import OverrideableBuilder from "supertokens-js-override";
import { RecipeFunctionOptions } from "../recipeModule/types";

export default class Recipe implements RecipeModule<PreAPIHookContext, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID = "emailverification";

    config: NormalisedInputType;
    recipeImplementation: RecipeInterface;

    constructor(config: InputType) {
        this.config = normaliseUserInput(config);
        const builder = new OverrideableBuilder(RecipeImplementation(this.config.recipeId, this.config.appInfo));
        this.recipeImplementation = builder.override(this.config.override.functions).build();
    }

    static init(config: InputType): CreateRecipeFunction<PreAPIHookContext, NormalisedInputType> {
        return (appInfo: NormalisedAppInfo) => {
            Recipe.instance = new Recipe({
                ...config,
                appInfo,
                recipeId: Recipe.RECIPE_ID,
            });

            return Recipe.instance;
        };
    }

    static getInstanceOrThrow(): Recipe {
        if (Recipe.instance === undefined) {
            let error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";

            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return Recipe.instance;
    }

    async verifyEmail({ token, options }: { token?: string; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "CUSTOM_RESPONSE" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse?: Response;
    }> {
        return this.recipeImplementation.verifyEmail({
            token,
            config: this.config,
            options,
        });
    }

    async sendVerificationEmail({ options }: { options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" | "CUSTOM_RESPONSE";
        fetchResponse: Response;
    }> {
        return this.recipeImplementation.sendVerificationEmail({
            config: this.config,
            options,
        });
    }

    async isEmailVerified({ options }: { options?: RecipeFunctionOptions }): Promise<
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
        return this.recipeImplementation.isEmailVerified({
            config: this.config,
            options,
        });
    }
}
