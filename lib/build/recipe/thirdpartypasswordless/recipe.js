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
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
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
var recipe_1 = require("../thirdparty/recipe");
var recipe_2 = require("../passwordless/recipe");
var utils_1 = require("./utils");
var supertokens_js_override_1 = require("supertokens-js-override");
var recipeImplementation_1 = require("./recipeImplementation");
var utils_2 = require("../../utils");
var thirdparty_1 = require("./recipeImplementation/thirdparty");
var passwordless_1 = require("./recipeImplementation/passwordless");
var authRecipe_1 = require("../authRecipe");
var Recipe = /** @class */ (function (_super) {
    __extends(Recipe, _super);
    function Recipe(config, recipes) {
        var _this = _super.call(this, (0, utils_1.normaliseUserInput)(config)) || this;
        var builder = new supertokens_js_override_1.default(
            (0, recipeImplementation_1.default)({
                recipeId: _this.config.recipeId,
                appInfo: _this.config.appInfo,
                preAPIHook: _this.config.preAPIHook,
                postAPIHook: _this.config.postAPIHook,
            })
        );
        var _recipeImplementation = builder.override(_this.config.override.functions).build();
        _this.recipeImplementation = _recipeImplementation;
        _this.thirdPartyRecipe =
            recipes.thirdParty === undefined
                ? new recipe_1.default({
                      recipeId: _this.config.recipeId,
                      appInfo: _this.config.appInfo,
                      preAPIHook: config.preAPIHook,
                      postAPIHook: config.postAPIHook,
                      override: {
                          functions: function () {
                              return (0, thirdparty_1.default)(_recipeImplementation);
                          },
                      },
                  })
                : recipes.thirdParty;
        _this.passwordlessRecipe =
            recipes.passwordless === undefined
                ? new recipe_2.default({
                      recipeId: _this.config.recipeId,
                      appInfo: _this.config.appInfo,
                      preAPIHook: config.preAPIHook,
                      postAPIHook: config.postAPIHook,
                      override: {
                          functions: function () {
                              return (0, passwordless_1.default)(_recipeImplementation);
                          },
                      },
                  })
                : recipes.passwordless;
        return _this;
    }
    Recipe.getInstanceOrThrow = function () {
        if (Recipe.instance === undefined) {
            var error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method.";
            error = (0, utils_2.checkForSSRErrorAndAppendIfNeeded)(error);
            throw Error(error);
        }
        return Recipe.instance;
    };
    Recipe.init = function (config) {
        return function (appInfo) {
            Recipe.instance = new Recipe(
                __assign(__assign({}, config), { recipeId: Recipe.RECIPE_ID, appInfo: appInfo }),
                {
                    thirdParty: undefined,
                    passwordless: undefined,
                }
            );
            return Recipe.instance;
        };
    };
    Recipe.reset = function () {
        if (!(0, utils_2.isTest)()) {
            return;
        }
        Recipe.instance = undefined;
        return;
    };
    Recipe.RECIPE_ID = "thirdpartypasswordless";
    return Recipe;
})(authRecipe_1.default);
exports.Recipe = Recipe;
exports.default = Recipe;
