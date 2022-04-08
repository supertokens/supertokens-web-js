import { NormalisedAppInfo } from "../../../types";
import { RecipePostAPIHookFunction, RecipePreAPIHookFunction } from "../../recipeModule/types";
import { PreAndPostAPIHookAction, RecipeInterface } from "../types";
export default function getRecipeImplementation(
    recipeId: string,
    appInfo: NormalisedAppInfo,
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>,
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>
): RecipeInterface;
