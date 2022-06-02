import { InputType as STWebsiteInputType, RecipeInterface as STWebsiteRecipeInterface } from "supertokens-website";
import { NormalisedAppInfo } from "../../types";
export declare type UserInput = STWebsiteInputType;
export declare type RecipeInterface = STWebsiteRecipeInterface;
export declare type InputType = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
} & UserInput;
