import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface, UserInput } from "./types";
import EmailVerificationRecipe from "../emailverification/recipe";
import { CreateRecipeFunction } from "../../types";
export default class Recipe extends AuthRecipeWithEmailVerification<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    recipeImplementation: RecipeInterface;
    constructor(
        config: InputType,
        recipes: {
            emailVerification: EmailVerificationRecipe | undefined;
        }
    );
    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getInstanceOrThrow(): Recipe;
    static reset(): void;
}
export { Recipe };
