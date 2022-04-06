import { RecipeInterface as ThirdPartyPasswordlessRecipeInterface } from "../types";
import { RecipeInterface as ThirdPartyRecipeInterface } from "../../thirdparty/types";
export default function getRecipeImplementation(
    originalImplementation: ThirdPartyPasswordlessRecipeInterface
): ThirdPartyRecipeInterface;
