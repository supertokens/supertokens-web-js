import { NormalisedAppInfo } from "../../types";
export declare type RecipePreAPIHookContext<Action> = {
    requestInit: RequestInit;
    url: string;
    action: Action;
    userContext: any;
};
export declare type RecipePostAPIHookContext<Action> = {
    action: Action;
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: any;
};
export declare type PreAPIHookFunction = (context: { requestInit: RequestInit; url: string }) => Promise<{
    url: string;
    requestInit: RequestInit;
}>;
export declare type PostAPIHookFunction = (context: {
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
}) => Promise<void>;
export declare type RecipeConfig<Action> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook?: (context: RecipePreAPIHookContext<Action>) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook?: (context: RecipePostAPIHookContext<Action>) => Promise<void>;
};
export declare type NormalisedRecipeConfig<Action> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: (context: RecipePreAPIHookContext<Action>) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook: (context: RecipePostAPIHookContext<Action>) => Promise<void>;
};
/**
 * For the options object passed to recipe functions, we do not need a postAPIHook.
 *
 * This is because these functions will be called manually, so the user always knows which API is called (making the
 * postAPIHook redundant). They can consume the networkResponse returned by recipe functions as a way to handle post
 * API logic
 */
export declare type RecipeFunctionOptions = {
    preAPIHook?: (input: { url: string; requestInit: RequestInit; userContext: any }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
};
