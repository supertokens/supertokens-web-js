import RecipeModule from "../recipeModule";
import EmailverificationRecipe from "../emailverification/recipe";
import { NormalisedInputType } from "./types";
export default abstract class AuthRecipeWithEmailVerification<
    Action,
    NormalisedConfig extends NormalisedInputType<Action>
> extends RecipeModule<Action> {
    emailVerificationRecipe: EmailverificationRecipe;
    constructor(
        config: NormalisedConfig,
        recipes: {
            emailVerification?: EmailverificationRecipe;
        }
    );
}
