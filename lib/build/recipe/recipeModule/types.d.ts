import { NormalisedAppInfo, PostAPIHookFunction, RecipePreAPIHookContext } from "../../types";
export declare type RecipeConfig<Action, PreAPIHookContext extends RecipePreAPIHookContext<Action>> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook?: (context: PreAPIHookContext) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook?: PostAPIHookFunction;
};
export declare type NormalisedRecipeConfig<Action, PreAPIHookContext extends RecipePreAPIHookContext<Action>> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: (context: PreAPIHookContext) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook: PostAPIHookFunction;
};
/**
 * For the options object passed to recipe functions, we do not need a postAPIHook.
 *
 * This is because these functions will be called manually, so the user always knows which API is called (making the
 * postAPIHook redundant). They can consume the networkResponse returned by recipe functions as a way to handle post
 * API logic
 */
export declare type RecipeFunctionOptions = {
    preAPIHook?: (input: { url: string; requestInit: RequestInit }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
};
export declare type UserType = {
    id: string;
    email: string;
    timeJoined: number;
};
