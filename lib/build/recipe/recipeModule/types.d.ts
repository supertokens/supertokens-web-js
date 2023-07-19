import { NormalisedAppInfo } from "../../types";
/**
 * This context object is passed as an argument to pre API hook functions.
 *
 * You can use this object to access information about network requests
 * and SDK actions.
 */
export declare type RecipePreAPIHookContext<Action> = {
    /**
     * The configuration for the network request. You can use this to access
     * information such as request headers, body etc
     */
    requestInit: RequestInit;
    /**
     * The URL for the network request
     */
    url: string;
    /**
     * Use this to identify what action the SDK is performing.
     * This can be useful for conditionally handling this hook.
     */
    action: Action;
    /**
     * Refer to the documentation for the recipe you are using
     */
    userContext: any;
};
/**
 * This context object is passed to post API hook functions.
 *
 * You can use this object to read information from the network
 * response such as custom response properties
 */
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
export declare type RecipePreAPIHookFunction<Action> = (context: RecipePreAPIHookContext<Action>) => Promise<{
    url: string;
    requestInit: RequestInit;
}>;
export declare type RecipePostAPIHookFunction<Action> = (context: RecipePostAPIHookContext<Action>) => Promise<void>;
export declare type UserInput<Action> = {
    /**
     * Pre API hooks allow yuo to do some processing before the SuperTokens SDK makes
     * a network request. You can use the context object to gain access to additional
     * information about the request.
     *
     * Pre API Hooks also allow you to modify request parameters by returning a custom
     * request config.
     */
    preAPIHook?: RecipePreAPIHookFunction<Action>;
    /**
     * Post API hooks allow you to do some processing after immediately after a network
     * request has finished. The context object allows you to access the response properties.
     *
     * Example usage of this would be to handle custom response properties from your backend APIs
     * that the SDK does not expose directly
     */
    postAPIHook?: RecipePostAPIHookFunction<Action>;
};
export declare type RecipeConfig<Action> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    clientType?: string;
} & UserInput<Action>;
export declare type NormalisedRecipeConfig<Action> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    clientType?: string;
    preAPIHook: RecipePreAPIHookFunction<Action>;
    postAPIHook: RecipePostAPIHookFunction<Action>;
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
export declare type RecipeImplementationInput<PrePostAPIHookAction> = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    clientType?: string;
    preAPIHook: RecipePreAPIHookFunction<PrePostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PrePostAPIHookAction>;
};
