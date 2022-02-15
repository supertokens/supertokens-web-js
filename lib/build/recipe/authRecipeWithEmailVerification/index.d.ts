import EmailverificationRecipe from "../emailverification/recipe";
import { NormalisedInputType } from "./types";
import AuthRecipe from "../authRecipe";
export default abstract class AuthRecipeWithEmailVerification<
    Action,
    NormalisedConfig extends NormalisedInputType<Action>
> extends AuthRecipe<Action, NormalisedConfig> {
    emailVerificationRecipe: EmailverificationRecipe;
    constructor(
        config: NormalisedConfig,
        recipes: {
            emailVerification?: EmailverificationRecipe;
        }
    );
}
