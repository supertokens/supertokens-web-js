import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { NormalisedRecipeConfig } from "./recipe/recipeModule/types";
import { StorageHandler } from "./common/storage/types";
/**
 * The configuration object to be passed when calling SuperTokens.init
 */
export declare type SuperTokensConfig = {
    /**
     * The information specific to your application, this helps the SDK understand
     * how SuperTokens is setup in your system
     */
    appInfo: AppInfoUserInput;
    /**
     * List of recipes that you want to use. Refer to the documentation for the recipe
     * that you want to use to know how this property should be set.
     */
    recipeList: CreateRecipeFunction<any>[];
    /**
     * Custom handlers that the SDK should use whn accessing the Web Storage API.
     *
     * In most cases you should not need to provide these. When provided, the SDK
     * will rely on these functions instead of using the Window.Storage API directly.
     *
     * When using this feature, take extra care to use the function version (sync/async).
     * The interface by default uses all storage methods as async, but specific parts of the
     * SDK may rely on using the sync versions.
     */
    storageHandlers?: StorageHandlerInput;
};
export declare type CreateRecipeFunction<Action> = (
    appInfo: NormalisedAppInfo,
    storageHandlers?: StorageHandlerInput
) => RecipeModule<Action, NormalisedRecipeConfig<Action>>;
export declare type AppInfoUserInput = {
    /**
     * The name of your application
     */
    appName: string;
    /**
     * The domain at which you host your backend SDKs. This is used by the SDK when making
     * network requests. For example if your API server is running on http://localhost:8080
     * then when calling SuperTokens.init the value for `apiDomain` should be set to
     * `http://localhost:8080`
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiDomain: string;
    /**
     * The path at which the SuperTokens APIs are exposed by your backend. Defaults to `/auth`.
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiBasePath?: string;
    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};
/**
 * Normalised version of the config passed to SuperTokens.init
 */
export declare type NormalisedAppInfo = {
    /**
     * The name of your application
     */
    appName: string;
    /**
     * The domain at which you host your backend SDKs. This is used by the SDK when making
     * network requests. For example if your API server is running on http://localhost:8080
     * then when calling SuperTokens.init the value for `apiDomain` should be set to
     * `http://localhost:8080`
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiDomain: NormalisedURLDomain;
    /**
     * The path at which the SuperTokens APIs are exposed by your backend. Defaults to `/auth`.
     *
     * This value must match the one set in the backend SDKs for SuperTokens to work correctly
     */
    apiBasePath: NormalisedURLPath;
};
export declare type StorageHandlerFunction = (original: StorageHandler) => StorageHandler;
export declare type StorageHandlerInput = {
    /**
     * Handlers to be used as a replacement for `window.sessionStorage`
     */
    sessionStorage?: StorageHandlerFunction;
    /**
     * Handlers to be used as a replacement for `window.localStorage`
     */
    localStorage?: StorageHandlerFunction;
};
export declare type NormalisedStorageHandlers = {
    /**
     * Handlers to be used as a replacement for `window.sessionStorage`
     */
    sessionStorage: StorageHandler;
    /**
     * Handlers to be used as a replacement for `window.localStorage`
     */
    localStorage: StorageHandler;
};
