import { RecipeInterface, ThirdPartyInput } from "./types";
import { RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction } from "./types";
export default function getRecipeImplementation(
    recipeImplInput: ThirdPartyInput & RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface;
export { getRecipeImplementation };
