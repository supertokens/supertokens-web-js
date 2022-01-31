"use strict";
/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var SuperTokens = /** @class */ (function () {
    function SuperTokens(config) {
        var _this = this;
        this.recipeList = [];
        this.appInfo = (0, utils_1.normaliseInputAppInfoOrThrowError)(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        this.recipeList = config.recipeList.map(function (recipe) {
            return recipe(_this.appInfo);
        });
    }
    SuperTokens.init = function (config) {
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
    };
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
        SuperTokens.instance = undefined;
        return;
    };
    return SuperTokens;
})();
exports.default = SuperTokens;
