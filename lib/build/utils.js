"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicConfig =
    exports.getPublicPlugin =
    exports.applyPlugins =
    exports.normaliseUser =
    exports.normaliseUserResponse =
    exports.getGlobalClaimValidators =
    exports.getHashFromLocation =
    exports.getNormalisedUserContext =
    exports.checkForSSRErrorAndAppendIfNeeded =
    exports.getAllQueryParams =
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
var windowHandler_1 = require("./windowHandler");
var constants_1 = require("./constants");
var normalisedURLDomain_1 = require("./normalisedURLDomain");
var normalisedURLPath_1 = require("./normalisedURLPath");
var types_1 = require("./types");
var globalClaimValidators_1 = require("supertokens-website/utils/globalClaimValidators");
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
    var urlParams = new URLSearchParams(
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
    var queryParam = urlParams.get(param);
    if (queryParam === null) {
        return undefined;
    }
    return queryParam;
}
exports.getQueryParams = getQueryParams;
function getAllQueryParams() {
    return new URLSearchParams(
        windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
    );
}
exports.getAllQueryParams = getAllQueryParams;
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
function getHashFromLocation() {
    // By default it is returned with the "#" at the beginning, we cut that off here.
    return windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substring(1);
}
exports.getHashFromLocation = getHashFromLocation;
function getGlobalClaimValidators(_a) {
    var overrideGlobalClaimValidators = _a.overrideGlobalClaimValidators,
        userContext = _a.userContext;
    return (0, globalClaimValidators_1.getGlobalClaimValidators)(overrideGlobalClaimValidators, userContext);
}
exports.getGlobalClaimValidators = getGlobalClaimValidators;
function normaliseUserResponse(recipeId, response) {
    if ("createdNewRecipeUser" in response) {
        return response;
    }
    return {
        createdNewRecipeUser: response.createdNewUser,
        user: normaliseUser(recipeId, response.user),
    };
}
exports.normaliseUserResponse = normaliseUserResponse;
function normaliseUser(recipeId, responseUser) {
    if ("loginMethods" in responseUser) {
        return responseUser;
    }
    var emails = responseUser.email !== undefined ? [responseUser.email] : [];
    var phoneNumbers = responseUser.phoneNumber !== undefined ? [responseUser.phoneNumber] : [];
    var thirdParty = responseUser.thirdParty !== undefined ? [responseUser.thirdParty] : [];
    var webauthn = responseUser.webauthn !== undefined ? responseUser.webauthn : { credentialIds: [] };
    return {
        id: responseUser.id,
        emails: emails,
        phoneNumbers: phoneNumbers,
        thirdParty: thirdParty,
        webauthn: webauthn,
        isPrimaryUser: false,
        tenantIds: responseUser.tenantIds,
        timeJoined: responseUser.timeJoined,
        loginMethods: [
            {
                recipeId: recipeId,
                recipeUserId: responseUser.id,
                timeJoined: responseUser.timeJoined,
                tenantIds: responseUser.tenantIds,
                email: responseUser.email,
                phoneNumber: responseUser.email,
            },
        ],
    };
}
exports.normaliseUser = normaliseUser;
function applyPlugins(recipeId, config, plugins) {
    var _a;
    var _config = __assign({}, config !== null && config !== void 0 ? config : {});
    var functionLayers = [(_a = _config.override) === null || _a === void 0 ? void 0 : _a.functions];
    for (var _i = 0, plugins_1 = plugins; _i < plugins_1.length; _i++) {
        var plugin = plugins_1[_i];
        var overrides = plugin[recipeId];
        if (overrides) {
            _config = __assign({}, overrides.config ? overrides.config(_config) : _config);
            if (overrides.functions !== undefined) {
                functionLayers.push(overrides.functions);
            }
        }
    }
    functionLayers = functionLayers.reverse().filter(function (layer) {
        return layer !== undefined;
    });
    if (functionLayers.length > 0) {
        _config.override = __assign(__assign({}, _config.override), {
            functions: function (oI, builder) {
                for (var _i = 0, functionLayers_1 = functionLayers; _i < functionLayers_1.length; _i++) {
                    var layer = functionLayers_1[_i];
                    builder.override(layer);
                }
                return oI;
            },
        });
    }
    return _config;
}
exports.applyPlugins = applyPlugins;
function getPublicPlugin(plugin) {
    return {
        id: plugin.id,
        initialized: plugin.init ? false : true,
        version: plugin.version,
        exports: plugin.exports,
        compatibleWebJSSDKVersions: plugin.compatibleWebJSSDKVersions,
    };
}
exports.getPublicPlugin = getPublicPlugin;
function getPublicConfig(config) {
    var configKeys = Object.keys(config);
    var publicConfig = configKeys.reduce(function (acc, key) {
        var _a;
        if (types_1.nonPublicConfigProperties.includes(key)) {
            return acc;
        } else {
            return __assign(__assign({}, acc), ((_a = {}), (_a[key] = config[key]), _a));
        }
    }, {});
    return publicConfig;
}
exports.getPublicConfig = getPublicConfig;
