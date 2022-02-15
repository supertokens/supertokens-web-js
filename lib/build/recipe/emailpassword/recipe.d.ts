import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface } from "./types";
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
    static init(config?: InputType): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getInstanceOrThrow(): Recipe;
}
