import { NormalisedAppInfo } from "../../types";

export type RecipeConfig<PreAPIHookContext> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook?: (context: PreAPIHookContext) => Promise<{ url: string; requestInit: RequestInit }>;
};

export type NormalisedRecipeConfig<PreAPIHookContext> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: (context: PreAPIHookContext) => Promise<{ url: string; requestInit: RequestInit }>;
};

export type RecipeFunctionOptions = {
    preAPIHook?: (input: {
        url: string;
        requestInit: RequestInit;
    }) => Promise<{ url: string; requestInit: RequestInit }>;
};
