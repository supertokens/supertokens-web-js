import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { NormalisedRecipeConfig } from "./recipe/recipeModule/types";
import { StorageHandler } from "./common/storage/types";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction<any>[];
    storageHandlers?: StorageHandlerInput;
};
export declare type CreateRecipeFunction<Action> = (
    appInfo: NormalisedAppInfo,
    storageHandlers?: StorageHandlerInput
) => RecipeModule<Action, NormalisedRecipeConfig<Action>>;
export declare type AppInfoUserInput = {
    appName: string;
    apiDomain: string;
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
    apiBasePath: NormalisedURLPath;
    websiteBasePath: NormalisedURLPath;
};
export declare type StorageHandlerInput = {
    sessionStorage?: StorageHandler;
    localStorage?: StorageHandler;
};
export declare type NormalisedStorageHandlers = {
    sessionStorage: StorageHandler;
    localStorage: StorageHandler;
};
