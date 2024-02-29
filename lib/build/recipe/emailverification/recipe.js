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
exports.Recipe = void 0;
var sessionClaimValidatorStore_1 = require("../../sessionClaimValidatorStore");
var utils_1 = require("./utils");
var recipeImplementation_1 = require("./recipeImplementation");
var supertokens_js_override_1 = require("supertokens-js-override");
var utils_2 = require("../../utils");
var emailVerificationClaim_1 = require("./emailVerificationClaim");
var postSuperTokensInitCallbacks_1 = require("../../postSuperTokensInitCallbacks");
var Recipe = /** @class */ (function () {
    function Recipe(config) {
        this.config = (0, utils_1.normaliseUserInput)(config);
        var builder = new supertokens_js_override_1.default(
            (0, recipeImplementation_1.default)({
                recipeId: this.config.recipeId,
                appInfo: this.config.appInfo,
                clientType: this.config.clientType,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
            })
        );
        this.recipeImplementation = builder.override(this.config.override.functions).build();
        postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            sessionClaimValidatorStore_1.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                Recipe.EmailVerificationClaim.validators.isVerified(10)
            );
        });
    }
    Recipe.init = function (config) {
        return function (appInfo, clientType) {
            Recipe.instance = new Recipe(
                __assign(__assign({}, config), { appInfo: appInfo, clientType: clientType, recipeId: Recipe.RECIPE_ID })
            );
            return Recipe.instance;
        };
    };
    Recipe.getInstanceOrThrow = function () {
        if (Recipe.instance === undefined) {
            var error =
                "No instance of EmailVerification found. Ensure that the 'EmailVerification.init' method is called within the 'SuperTokens.init' recipeList.";
            error = (0, utils_2.checkForSSRErrorAndAppendIfNeeded)(error);
            throw Error(error);
        }
        return Recipe.instance;
    };
    Recipe.reset = function () {
        if (!(0, utils_2.isTest)()) {
            return;
        }
        Recipe.instance = undefined;
        return;
    };
    Recipe.RECIPE_ID = "emailverification";
    Recipe.EmailVerificationClaim = new emailVerificationClaim_1.EmailVerificationClaimClass(function () {
        return Recipe.getInstanceOrThrow().recipeImplementation;
    });
    return Recipe;
})();
exports.Recipe = Recipe;
exports.default = Recipe;
