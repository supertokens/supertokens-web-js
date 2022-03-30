"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHashFromLocation =
    exports.removeFromLocalStorage =
    exports.setLocalStorage =
    exports.getLocalStorage =
    exports.setSessionStorage =
    exports.getSessionStorage =
    exports.getNormalisedUserContext =
    exports.checkForSSRErrorAndAppendIfNeeded =
    exports.getQueryParams =
    exports.isTest =
    exports.normaliseInputAppInfoOrThrowError =
    exports.appendQueryParamsToURL =
        void 0;
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
var constants_1 = require("./constants");
var normalisedURLDomain_1 = require("./normalisedURLDomain");
var normalisedURLPath_1 = require("./normalisedURLPath");
function appendQueryParamsToURL(stringUrl, queryParams) {
    if (queryParams === undefined) {
        return stringUrl;
    }
    try {
        var url_1 = new URL(stringUrl);
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0],
                value = _a[1];
            url_1.searchParams.set(key, value);
        });
        return url_1.href;
    } catch (e) {
        var fakeDomain = stringUrl.startsWith("/") ? "http:localhost" : "http://localhost/";
        var url_2 = new URL("".concat(fakeDomain).concat(stringUrl));
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0],
                value = _a[1];
            url_2.searchParams.set(key, value);
        });
        return "".concat(url_2.pathname).concat(url_2.search);
    }
}
exports.appendQueryParamsToURL = appendQueryParamsToURL;
function getWindowOrThrow() {
    // tslint:disable-next-line
    if (typeof window === "undefined") {
        throw new Error(constants_1.WINDOW_UNDEFINED_ERROR);
    }
    // tslint:disable-next-line
    return window;
}
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new normalisedURLPath_1.default(path);
    } else {
        return new normalisedURLPath_1.default(defaultPath);
    }
}
function normaliseInputAppInfoOrThrowError(appInfo) {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }
    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }
    var apiGatewayPath = new normalisedURLPath_1.default("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new normalisedURLPath_1.default(appInfo.apiGatewayPath);
    }
    return {
        appName: appInfo.appName,
        apiDomain: new normalisedURLDomain_1.default(appInfo.apiDomain),
        apiBasePath: apiGatewayPath.appendPath(
            getNormalisedURLPathOrDefault(constants_1.DEFAULT_API_BASE_PATH, appInfo.apiBasePath)
        ),
        websiteBasePath: getNormalisedURLPathOrDefault(constants_1.DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
exports.normaliseInputAppInfoOrThrowError = normaliseInputAppInfoOrThrowError;
function isTest() {
    try {
        return process.env.TEST_MODE === "testing";
    } catch (err) {
        // can get Uncaught ReferenceError: process is not defined error
        return false;
    }
}
exports.isTest = isTest;
function getQueryParams(param) {
    var urlParams = new URLSearchParams(getWindowOrThrow().location.search);
    var queryParam = urlParams.get(param);
    if (queryParam === null) {
        return undefined;
    }
    return queryParam;
}
exports.getQueryParams = getQueryParams;
function checkForSSRErrorAndAppendIfNeeded(error) {
    // tslint:disable-next-line
    if (typeof window === "undefined") {
        error = error + constants_1.SSR_ERROR;
    }
    return error;
}
exports.checkForSSRErrorAndAppendIfNeeded = checkForSSRErrorAndAppendIfNeeded;
function getNormalisedUserContext(userContext) {
    return userContext === undefined ? {} : userContext;
}
exports.getNormalisedUserContext = getNormalisedUserContext;
// TODO NEMI: Remove this function when storage abstraction is implemented
function getSessionStorage(key) {
    var item = getWindowOrThrow().sessionStorage.getItem(key);
    if (item === null) {
        return undefined;
    }
    return item;
}
exports.getSessionStorage = getSessionStorage;
// TODO NEMI: Remove this function when storage abstraction is implemented
function setSessionStorage(key, value) {
    getWindowOrThrow().sessionStorage.setItem(key, value);
}
exports.setSessionStorage = setSessionStorage;
// TODO NEMI: Remove this function when storage abstraction is implemented
function getLocalStorage(key) {
    var res = getWindowOrThrow().localStorage.getItem(key);
    if (res === null) {
        return undefined;
    }
    return res;
}
exports.getLocalStorage = getLocalStorage;
// TODO NEMI: Remove this function when storage abstraction is implemented
function setLocalStorage(key, value) {
    getWindowOrThrow().localStorage.setItem(key, value);
}
exports.setLocalStorage = setLocalStorage;
// TODO NEMI: Remove this function when storage abstraction is implemented
function removeFromLocalStorage(key) {
    getWindowOrThrow().localStorage.removeItem(key);
}
exports.removeFromLocalStorage = removeFromLocalStorage;
function getHashFromLocation() {
    // By default it is returned with the "#" at the beginning, we cut that off here.
    return getWindowOrThrow().location.hash.substring(1);
}
exports.getHashFromLocation = getHashFromLocation;
