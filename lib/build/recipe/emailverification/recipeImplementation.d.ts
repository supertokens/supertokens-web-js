import { RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction, RecipeInterface } from "./types";
export default function getRecipeImplementation(
    recipeImpleInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface;
export { getRecipeImplementation };
