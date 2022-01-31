import NormalisedURLDomain from "./normalisedURLDomain";
import { AppInfoUserInput, NormalisedAppInfo } from "./types";
export declare function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string;
export declare function getOriginOfPage(): NormalisedURLDomain;
export declare function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo;
export declare function isTest(): boolean;
export declare function getQueryParams(param: string): string | undefined;
export declare function checkForSSRErrorAndAppendIfNeeded(error: string): string;
