import RecipeModule from "../recipeModule";
import EmailverificationRecipe from "../emailverification/recipe";
import { RecipePreAPIHookContext } from "../../types";
import { NormalisedInputType } from "./types";
export default abstract class AuthRecipeWithEmailVerification<
    Action,
    PreAPIHookContext extends RecipePreAPIHookContext<Action>,
    NormalisedConfig extends NormalisedInputType<Action, PreAPIHookContext>
> extends RecipeModule<Action, PreAPIHookContext, NormalisedConfig> {
    emailVerificationRecipe: EmailverificationRecipe;
    constructor(
        config: NormalisedConfig,
        recipes: {
            emailVerification?: EmailverificationRecipe;
        }
    );
}
