import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction<any>[];
};
export declare type CreateRecipeFunction<Action> = (appInfo: NormalisedAppInfo) => RecipeModule<Action>;
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
