import RecipeModule from "../recipeModule";
import EmailverificationRecipe from "../emailverification/recipe";
import { NormalisedInputType } from "./types";
export default abstract class AuthRecipeWithEmailVerification<
    PreAPIHookContext,
    Config extends NormalisedInputType<PreAPIHookContext>
> extends RecipeModule<PreAPIHookContext, Config> {
    emailVerificationRecipe: EmailverificationRecipe;
    constructor(
        config: Config,
        recipes: {
            emailVerification?: EmailverificationRecipe;
        }
    );
}
