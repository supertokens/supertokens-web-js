import { RecipeInterface as ThirdPartyPasswordlessRecipeInterface } from "../types";
import { RecipeInterface as PasswordlessRecipeInterface } from "../../passwordless/types";
export default function getRecipeImplementation(
    originalImplementation: ThirdPartyPasswordlessRecipeInterface
): PasswordlessRecipeInterface;
