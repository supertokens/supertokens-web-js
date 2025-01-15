/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { NormalisedRecipeConfig } from "./recipe/recipeModule/types";
import { CookieHandlerInput } from "./cookieHandler/types";
import { WindowHandlerInput } from "./windowHandler/types";
import { DateProviderInput } from "./dateProvider/types";
import type { UserInput as EmailPasswordConfig } from "./recipe/emailpassword/types";
import type { UserInput as EmailVerificationConfig } from "./recipe/emailverification/types";
import type { UserInput as MultitenancyConfig } from "./recipe/multitenancy/types";
import type { UserInput as MultiFactorAuthConfig } from "./recipe/multifactorauth/types";
import type { UserInput as OAuth2ProviderConfig } from "./recipe/oauth2provider/types";
import type { UserInput as PasswordlessConfig } from "./recipe/passwordless/types";
import type { UserInput as SessionConfig } from "./recipe/session/types";
import type { UserInput as ThirdPartyConfig } from "./recipe/thirdparty/types";
import type { UserInput as TotpConfig } from "./recipe/totp/types";

/**
 * The configuration object to be passed when calling SuperTokens.init
 */
export type SuperTokensConfig = {
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

    plugins?: SuperTokensPlugin[];
};

export type CreateRecipeFunction<Action> = (
    appInfo: NormalisedAppInfo,
    clientType: string | undefined,
    enableDebugLogs: boolean,
    overrideMaps: NonNullable<SuperTokensPlugin["overrideMap"]>[]
) => RecipeModule<Action, NormalisedRecipeConfig<Action>>;

export type AppInfoUserInput = {
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
export type NormalisedAppInfo = {
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

export type User = {
    id: string; // primaryUserId or recipeUserId
    timeJoined: number; // minimum timeJoined value from linkedRecipes
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

export type AllRecipeConfigs = {
    emailpassword: EmailPasswordConfig;
    emailverification: EmailVerificationConfig;
    multifactorauth: MultiFactorAuthConfig;
    multitenancy: MultitenancyConfig;
    oauth2provider: OAuth2ProviderConfig;
    passwordless: PasswordlessConfig;
    session: SessionConfig;
    thirdparty: ThirdPartyConfig;
    totp: TotpConfig;
};

export type RecipePluginOverride<T extends keyof AllRecipeConfigs> = {
    functions?: NonNullable<AllRecipeConfigs[T]["override"]>["functions"];
    config?: (config: AllRecipeConfigs[T]) => AllRecipeConfigs[T];
};

export type SuperTokensPlugin = {
    id: string; // TODO: validate that no two plugins have the same id
    version?: string;
    compatibleWebJSSDKVersions?: string | string[]; // match the syntax of the engines field in package.json
    dependencies?: (
        pluginsAbove: Pick<SuperTokensPlugin, "id" | "version">[],
        sdkVersion: string
    ) => { status: "OK"; pluginsToAdd?: SuperTokensPlugin[] } | { status: "ERROR"; message: string };
    overrideMap?: {
        [recipeId in keyof AllRecipeConfigs]?: RecipePluginOverride<recipeId> & {
            recipeInitRequired?: boolean | ((sdkVersion: string) => boolean);
        };
    };
};
