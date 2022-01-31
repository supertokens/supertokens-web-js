import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { InputType, NormalisedInputType, PreAPIHookContext, RecipeInterface } from "./types";
import EmailVerificationRecipe from "../emailverification/recipe";
import { CreateRecipeFunction } from "../../types";
export default class Recipe extends AuthRecipeWithEmailVerification<PreAPIHookContext, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    config: NormalisedInputType;
    recipeImplementation: RecipeInterface;
    constructor(
        config: InputType,
        recipes: {
            emailVerification?: EmailVerificationRecipe;
        }
    );
    static init(config?: InputType): CreateRecipeFunction<PreAPIHookContext, NormalisedInputType>;
    static getInstanceOrThrow(): Recipe;
}
