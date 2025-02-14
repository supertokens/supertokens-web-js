"use strict";
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
var utils_1 = require("./utils");
var cookieHandler_1 = require("./cookieHandler");
var windowHandler_1 = require("./windowHandler");
var postSuperTokensInitCallbacks_1 = require("./postSuperTokensInitCallbacks");
var recipe_1 = require("./recipe/multitenancy/recipe");
var dateProvider_1 = require("./dateProvider");
var version_1 = require("./version");
var SuperTokens = /** @class */ (function () {
    function SuperTokens(config) {
        var _this = this;
        var _a;
        this.recipeList = [];
        this.appInfo = (0, utils_1.normaliseInputAppInfoOrThrowError)(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        var finalPluginList = [];
        if ((_a = config.experimental) === null || _a === void 0 ? void 0 : _a.plugins) {
            for (var _i = 0, _b = config.experimental.plugins; _i < _b.length; _i++) {
                var plugin = _b[_i];
                if (plugin.compatibleWebJSSDKVersions) {
                    var versionContraints = Array.isArray(plugin.compatibleWebJSSDKVersions)
                        ? plugin.compatibleWebJSSDKVersions
                        : [plugin.compatibleWebJSSDKVersions];
                    if (!versionContraints.includes(version_1.package_version)) {
                        // TODO: better checks
                        throw new Error("Plugin version mismatch");
                    }
                }
                if (plugin.dependencies) {
                    var result = plugin.dependencies(finalPluginList, version_1.package_version);
                    if (result.status === "ERROR") {
                        throw new Error(result.message);
                    }
                    if (result.pluginsToAdd) {
                        finalPluginList.push.apply(finalPluginList, result.pluginsToAdd);
                    }
                    finalPluginList.push(plugin);
                }
            }
        }
        for (var _c = 0, finalPluginList_1 = finalPluginList; _c < finalPluginList_1.length; _c++) {
            var plugin = finalPluginList_1[_c];
            if (plugin.config) {
                config = __assign(__assign({}, config), plugin.config(config));
            }
        }
        var overrideMaps = finalPluginList
            .filter(function (p) {
                return p.overrideMap !== undefined;
            })
            .map(function (p) {
                return p.overrideMap;
            });
        var enableDebugLogs = false;
        if (config.enableDebugLogs !== undefined) {
            enableDebugLogs = config.enableDebugLogs;
        }
        var multitenancyFound = false;
        this.recipeList = config.recipeList.map(function (recipe) {
            var recipeInstance = recipe(_this.appInfo, config.clientType, enableDebugLogs, overrideMaps);
            if (recipeInstance.config.recipeId === recipe_1.Recipe.RECIPE_ID) {
                multitenancyFound = true;
            }
            return recipeInstance;
        });
        if (!multitenancyFound) {
            this.recipeList.push(
                recipe_1.Recipe.init()(this.appInfo, config.clientType, enableDebugLogs, overrideMaps)
            );
        }
    }
    /**
     * Initialise the SuperTokens SDK. Calling this function multiple times results
     * in a warning and has no other effect
     *
     * @param config The configuration the SDK should use
     */
    SuperTokens.init = function (config) {
        cookieHandler_1.CookieHandlerReference.init(config.cookieHandler);
        windowHandler_1.WindowHandlerReference.init(config.windowHandler);
        dateProvider_1.DateProviderReference.init(config.dateProvider);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
        postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.runPostInitCallbacks();
    };
    /**
     * Retrieve an instance of SuperTokens
     *
     * @returns An instance of SuperTokens
     *
     * @throws If SuperTokens.init has not been called before using this function
     */
    SuperTokens.getInstanceOrThrow = function () {
        if (SuperTokens.instance === undefined) {
            var error = "SuperTokens must be initialized before calling this method.";
            error = (0, utils_1.checkForSSRErrorAndAppendIfNeeded)(error);
            throw new Error(error);
        }
        return SuperTokens.instance;
    };
    SuperTokens.reset = function () {
        if (!(0, utils_1.isTest)()) {
            console.warn("Calling reset() is only supported during testing");
            return;
        }
        // We reset the multitenancy recipe here because we are auto-initializing it
        // and we should always be resetting it when we reset the SDK
        recipe_1.Recipe.reset();
        SuperTokens.instance = undefined;
        return;
    };
    return SuperTokens;
})();
exports.default = SuperTokens;
