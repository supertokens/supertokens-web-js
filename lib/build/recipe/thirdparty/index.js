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
exports.signInAndUp = exports.getAuthorizationURLWithQueryParamsAndSetState = exports.init = void 0;
var utils_1 = require("../../utils");
var recipe_1 = require("./recipe");
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.getAuthorizationURLWithQueryParamsAndSetState = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.getAuthorizationURLWithQueryParamsAndSetState(
            __assign(__assign({}, input), {
                config: recipeInstance.config,
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.signInAndUp = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.signInAndUp(
            __assign(__assign({}, input), {
                config: recipeInstance.config,
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    return Wrapper;
})();
exports.default = Wrapper;
var init = Wrapper.init;
exports.init = init;
var getAuthorizationURLWithQueryParamsAndSetState = Wrapper.getAuthorizationURLWithQueryParamsAndSetState;
exports.getAuthorizationURLWithQueryParamsAndSetState = getAuthorizationURLWithQueryParamsAndSetState;
var signInAndUp = Wrapper.signInAndUp;
exports.signInAndUp = signInAndUp;
