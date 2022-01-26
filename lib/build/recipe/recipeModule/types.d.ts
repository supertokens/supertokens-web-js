import { NormalisedAppInfo } from "../../types";
export declare type RecipeConfig<PreAPIHookContext> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook?: (context: PreAPIHookContext) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
};
export declare type NormalisedRecipeConfig<PreAPIHookContext> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: (context: PreAPIHookContext) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
};
export declare type RecipeFunctionOptions = {
    preAPIHook?: (input: { url: string; requestInit: RequestInit }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
};
