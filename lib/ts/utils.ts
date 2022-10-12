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
import { WindowHandlerReference } from "supertokens-website/utils/windowHandler";
import { DEFAULT_API_BASE_PATH, SSR_ERROR } from "./constants";
import NormalisedURLDomain from "./normalisedURLDomain";
import NormalisedURLPath from "./normalisedURLPath";
import { AppInfoUserInput, NormalisedAppInfo } from "./types";

export function appendQueryParamsToURL(stringUrl: string, queryParams?: Record<string, string>): string {
    if (queryParams === undefined) {
        return stringUrl;
    }

    try {
        const url = new URL(stringUrl);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return url.href;
    } catch (e) {
        const fakeDomain = stringUrl.startsWith("/") ? "http:localhost" : "http://localhost/";
        const url = new URL(`${fakeDomain}${stringUrl}`);
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        return `${url.pathname}${url.search}`;
    }
}

function getNormalisedURLPathOrDefault(defaultPath: string, path?: string): NormalisedURLPath {
    if (path !== undefined) {
        return new NormalisedURLPath(path);
    } else {
        return new NormalisedURLPath(defaultPath);
    }
}

export function normaliseInputAppInfoOrThrowError(appInfo: AppInfoUserInput): NormalisedAppInfo {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }

    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }

    let apiGatewayPath = new NormalisedURLPath("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new NormalisedURLPath(appInfo.apiGatewayPath);
    }

    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain(appInfo.apiDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
    };
}

export function isTest(): boolean {
    try {
        return process.env.TEST_MODE === "testing";
    } catch (err) {
        // can get Uncaught ReferenceError: process is not defined error
        return false;
    }
}

export function getQueryParams(param: string): string | undefined {
    const urlParams = new URLSearchParams(
        WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    let queryParam = urlParams.get(param);

    if (queryParam === null) {
        return undefined;
    }

    return queryParam;
}

export function getAllQueryParams(): URLSearchParams {
    return new URLSearchParams(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch());
}

export function checkForSSRErrorAndAppendIfNeeded(error: string): string {
    // tslint:disable-next-line
    if (typeof window === "undefined") {
        error = error + SSR_ERROR;
    }

    return error;
}

export function getNormalisedUserContext(userContext?: any) {
    return userContext === undefined ? {} : userContext;
}

export function getHashFromLocation(): string {
    // By default it is returned with the "#" at the beginning, we cut that off here.
    return WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substring(1);
}
