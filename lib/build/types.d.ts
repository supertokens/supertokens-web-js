import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { NormalisedRecipeConfig } from "./recipe/recipeModule/types";
import { CookieHandlerInput } from "./cookieHandler/types";
import { WindowHandlerInput } from "./windowHandler/types";
import { DateProviderInput } from "./dateProvider/types";
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
     * Identifier for the client, such as `web`, `ios`, etc. to be used with thirdparty, multitenancy recipes.
     */
    clientType?: string;
    /**
     * List of recipes that you want to use. Refer to the documentation for the recipe
     * that you want to use to know how this property should be set.
     */
    recipeList: CreateRecipeFunction<any>[];
    /**
     * Custom handlers that the SDK should use when trying to read or write to document.cookie
     *
     * In most cases you should not need to provide these. When provided, the SDK will rely on
     * these functions instead of using document.cookie directly
     *
     * When using this feature, take extra care to use the correct function version (async/async).
     * The interface by default uses async versions of the functions when possible but specific parts
     * of the SDK may rely on using the sync versions instead.
     */
    cookieHandler?: CookieHandlerInput;
    /**
     * Custom handlers that the SDK should use when trying to access Window APIs
     *
     * In most cases you should not need to provide these. When provided, the SDK will rely on
     * these functions instead of using any Window APIs directly
     *
     * When using this feature, take extra care to use the correct function version (async/async).
     * The interface by default uses async versions of the functions when possible but specific parts
     * of the SDK may rely on using the sync versions instead.
     */
    windowHandler?: WindowHandlerInput;
    /**
     * Custom provider for SDK timing calculations relative to server time.
     *
     * The default implementation automatically adjusts for client-server time deviation.
     *
     * Typically, you won't need to provide these. If provided, the SDK uses
     * your implementation instead of the default one.
     */
    dateProvider?: DateProviderInput;
    /**
     * Enabled logging for the SuperTokens SDK. The SDK will log information in different stages.
     */
    enableDebugLogs?: boolean;
};
export declare type CreateRecipeFunction<Action> = (
    appInfo: NormalisedAppInfo,
    clientType: string | undefined,
    enableDebugLogs: boolean
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
export declare type User = {
    id: string;
    timeJoined: number;
    isPrimaryUser: boolean;
    tenantIds: string[];
    emails: string[];
    phoneNumbers: string[];
    thirdParty: {
        id: string;
        userId: string;
    }[];
    loginMethods: {
        tenantIds: string[];
        timeJoined: number;
        recipeId: "emailpassword" | "thirdparty" | "passwordless";
        recipeUserId: string;
        verified?: boolean;
        email?: string;
        phoneNumber?: string;
        thirdParty?: {
            id: string;
            userId: string;
        };
    }[];
};
