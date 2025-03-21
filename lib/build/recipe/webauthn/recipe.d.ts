import AuthRecipe from "../authRecipe";
import { NormalisedInputType, RecipeInterface, InputType, UserInput, PreAndPostAPIHookAction } from "./types";
import { CreateRecipeFunction } from "../../types";
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
