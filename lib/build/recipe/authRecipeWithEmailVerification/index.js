"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
var recipe_1 = require("../emailverification/recipe");
var authRecipe_1 = require("../authRecipe");
var AuthRecipeWithEmailVerification = /** @class */ (function (_super) {
    __extends(AuthRecipeWithEmailVerification, _super);
    function AuthRecipeWithEmailVerification(config, recipes) {
        var _this = _super.call(this, config) || this;
        _this.emailVerificationRecipe =
            recipes.emailVerification === undefined
                ? new recipe_1.default({
                      appInfo: config.appInfo,
                      recipeId: config.recipeId,
                      preAPIHook: config.preAPIHook,
                      postAPIHook: config.postAPIHook,
                      override: config.override === undefined ? undefined : config.override.emailVerification,
                  })
                : recipes.emailVerification;
        return _this;
    }
    return AuthRecipeWithEmailVerification;
})(authRecipe_1.default);
exports.default = AuthRecipeWithEmailVerification;
