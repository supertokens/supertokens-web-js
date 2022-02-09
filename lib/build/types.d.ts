import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { RecipeConfig } from "./recipe/recipeModule/types";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction<any, any, any, any>[];
};
export declare type CreateRecipeFunction<
    Action,
    PreAPIHookContext extends RecipePreAPIHookContext<Action>,
    PostAPIHookContext extends RecipePostAPIHookContext<Action>,
    Config extends RecipeConfig<Action, PreAPIHookContext, PostAPIHookContext>
> = (appInfo: NormalisedAppInfo) => RecipeModule<Action, PreAPIHookContext, PostAPIHookContext, Config>;
export declare type AppInfoUserInput = {
    appName: string;
    apiDomain: string;
    websiteDomain: string;
    apiBasePath?: string;
    websiteBasePath?: string;
    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};
export declare type NormalisedAppInfo = {
    appName: string;
    apiDomain: NormalisedURLDomain;
    websiteDomain: NormalisedURLDomain;
    apiBasePath: NormalisedURLPath;
    websiteBasePath: NormalisedURLPath;
};
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
    userContext: any;
}) => Promise<void>;
