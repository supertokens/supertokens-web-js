import NormalisedURLDomain from "./normalisedURLDomain";
import { AppInfoUserInput, NormalisedAppInfo } from "./types";
export declare function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string;
export declare function redirectWithFullPageReload(to: string): void;
export declare function getOriginOfPage(): NormalisedURLDomain;
export declare function redirectWithHistory(to: string, history: any): void;
export declare function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo;
export declare function isTest(): boolean;
export declare function getQueryParams(param: string): string | undefined;
