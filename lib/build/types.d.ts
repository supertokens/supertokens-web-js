import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { RecipeConfig } from "./recipe/recipeModule/types";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction<any, any>[];
};
export declare type CreateRecipeFunction<PreAPIHookContext, Config extends RecipeConfig<PreAPIHookContext>> = (
    appInfo: NormalisedAppInfo
) => RecipeModule<PreAPIHookContext, Config>;
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
export declare type PreAPIHookFunction = (context: { requestInit: RequestInit; url: string }) => Promise<{
    url: string;
    requestInit: RequestInit;
}>;
export declare type PostAPIHookFunction = (context: {
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: any;
}) => Promise<Response>;
