import { CreateRecipeFunction } from "../../types";
import RecipeModule from "../recipeModule";
import {
    InputType,
    NormalisedInputType,
    PreAPIHookAction,
    PreAPIHookContext,
    RecipeInterface,
    PostAPIHookContext,
} from "./types";
export default class Recipe
    implements RecipeModule<PreAPIHookAction, PreAPIHookContext, PostAPIHookContext, NormalisedInputType>
{
    static instance?: Recipe;
    static RECIPE_ID: string;
    config: NormalisedInputType;
    recipeImplementation: RecipeInterface;
    constructor(config: InputType);
    static init(
        config: InputType
    ): CreateRecipeFunction<PreAPIHookAction, PreAPIHookContext, PostAPIHookContext, NormalisedInputType>;
    static getInstanceOrThrow(): Recipe;
}
