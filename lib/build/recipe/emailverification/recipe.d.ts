import { CreateRecipeFunction } from "../../types";
import RecipeModule from "../recipeModule";
import { InputType, NormalisedInputType, PreAPIHookAction, PreAPIHookContext, RecipeInterface } from "./types";
export default class Recipe implements RecipeModule<PreAPIHookAction, PreAPIHookContext, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    config: NormalisedInputType;
    recipeImplementation: RecipeInterface;
    constructor(config: InputType);
    static init(config: InputType): CreateRecipeFunction<PreAPIHookAction, PreAPIHookContext, NormalisedInputType>;
    static getInstanceOrThrow(): Recipe;
}
