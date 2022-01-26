import { NormalisedAppInfo, PostAPIHookFunction } from "../../types";
export declare type RecipeConfig<PreAPIHookContext> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook?: (context: PreAPIHookContext) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook?: PostAPIHookFunction;
};
export declare type NormalisedRecipeConfig<PreAPIHookContext> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: (context: PreAPIHookContext) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook: PostAPIHookFunction;
};
export declare type RecipeFunctionOptions = {
    preAPIHook?: (input: { url: string; requestInit: RequestInit }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
};
