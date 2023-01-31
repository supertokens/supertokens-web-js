import { AppInfoUserInput, NormalisedAppInfo } from "./types";
import { SessionClaimValidator } from "supertokens-website";
export declare function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string;
export declare function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo;
export declare function isTest(): boolean;
export declare function getQueryParams(param: string): string | undefined;
export declare function checkForSSRErrorAndAppendIfNeeded(error: string): string;
export declare function getNormalisedUserContext(userContext?: any): any;
export declare function getHashFromLocation(): string;
export declare function getGlobalClaimValidators(
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: any
    ) => SessionClaimValidator[],
    userContext?: any
): SessionClaimValidator[];
