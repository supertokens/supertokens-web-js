import { RecipeInterface } from "./types";
import { RecipeImplementationInput } from "../recipeModule/types";
import { PreAndPostAPIHookAction } from "./types";
export default function getRecipeImplementation(
    recipeImplInput: {
        thirdParty: {
            clientType: string;
        };
    } & RecipeImplementationInput<PreAndPostAPIHookAction>
): RecipeInterface;
export { getRecipeImplementation };
