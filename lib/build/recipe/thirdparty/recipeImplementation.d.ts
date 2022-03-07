import { RecipeInterface } from "./types";
import { RecipePostAPIHookFunction, RecipePreAPIHookFunction } from "../recipeModule/types";
import { NormalisedAppInfo } from "../../types";
import { PreAndPostAPIHookAction } from "./types";
export default function getRecipeImplementation(
    recipeId: string,
    appInfo: NormalisedAppInfo,
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>,
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>
): RecipeInterface;
