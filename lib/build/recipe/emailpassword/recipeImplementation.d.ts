import { PreAndPostAPIHookAction, RecipeInterface } from "./types";
import { RecipeImplementationInput } from "../recipeModule/types";
export default function getRecipeImplementation(
    recipeImplInput: RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface;
export { getRecipeImplementation };
