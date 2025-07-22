import {
    AllRecipeConfigs,
    AppInfoUserInput,
    NormalisedAppInfo,
    SuperTokensConfigWithNormalisedAppInfo,
    SuperTokensPlugin,
    SuperTokensPublicConfig,
    SuperTokensPublicPlugin,
    User,
} from "./types";
import { SessionClaimValidator } from "supertokens-website";
export declare function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string;
export declare function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo;
export declare function isTest(): boolean;
export declare function getQueryParams(param: string): string | undefined;
export declare function getAllQueryParams(): URLSearchParams;
export declare function checkForSSRErrorAndAppendIfNeeded(error: string): string;
export declare function getNormalisedUserContext(userContext?: any): any;
export declare function getHashFromLocation(): string;
export declare function getGlobalClaimValidators({
    overrideGlobalClaimValidators,
    userContext,
}: {
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: any
    ) => SessionClaimValidator[];
    userContext?: any;
}): SessionClaimValidator[];
export declare function normaliseUserResponse(
    recipeId: "passwordless" | "emailpassword" | "thirdparty" | "webauthn",
    response:
        | {
              createdNewRecipeUser: boolean;
              user: User;
          }
        | {
              createdNewUser: boolean;
              user: {
                  id: string;
                  email?: string;
                  phoneNumber?: string;
                  thirdParty?: {
                      id: string;
                      userId: string;
                  };
                  webauthn?: {
                      credentialIds: string[];
                  };
                  tenantIds: string[];
                  timeJoined: number;
              };
          }
): {
    createdNewRecipeUser: boolean;
    user: User;
};
export declare function normaliseUser(
    recipeId: "passwordless" | "emailpassword" | "thirdparty" | "webauthn",
    responseUser:
        | User
        | {
              id: string;
              email?: string | undefined;
              phoneNumber?: string | undefined;
              thirdParty?:
                  | {
                        id: string;
                        userId: string;
                    }
                  | undefined;
              webauthn?:
                  | {
                        credentialIds: string[];
                    }
                  | undefined;
              tenantIds: string[];
              timeJoined: number;
          }
): User;
export declare function applyPlugins<T extends keyof AllRecipeConfigs>(
    recipeId: T,
    config: AllRecipeConfigs[T] | undefined,
    plugins: NonNullable<SuperTokensPlugin["overrideMap"]>[]
): AllRecipeConfigs[T];
export declare function getPublicPlugin(plugin: SuperTokensPlugin): SuperTokensPublicPlugin;
export declare function getPublicConfig(config: SuperTokensConfigWithNormalisedAppInfo): SuperTokensPublicConfig;
