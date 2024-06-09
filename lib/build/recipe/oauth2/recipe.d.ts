import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface, UserInput } from "./types";
import { CreateRecipeFunction } from "../../types";
import AuthRecipe from "../authRecipe";
export default class Recipe extends AuthRecipe<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    recipeImplementation: RecipeInterface;
    constructor(config: InputType);
    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getInstanceOrThrow(): Recipe;
    static reset(): void;
}
export { Recipe };
