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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiFactorAuthClaimClass = exports.MultiFactorAuthClaim = exports.getMFAInfo = exports.init = void 0;
var multiFactorAuthClaim_1 = require("./multiFactorAuthClaim");
Object.defineProperty(exports, "MultiFactorAuthClaimClass", {
    enumerable: true,
    get: function () {
        return multiFactorAuthClaim_1.MultiFactorAuthClaimClass;
    },
});
var recipe_1 = require("./recipe");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    RecipeWrapper.getMFAInfo = function (input) {
        var _a;
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getMFAInfo({
            options: input.options,
            userContext: (_a = input.userContext) !== null && _a !== void 0 ? _a : {},
        });
    };
    RecipeWrapper.MultiFactorAuthClaim = recipe_1.default.MultiFactorAuthClaim;
    return RecipeWrapper;
})();
exports.default = RecipeWrapper;
var init = RecipeWrapper.init;
exports.init = init;
var getMFAInfo = RecipeWrapper.getMFAInfo;
exports.getMFAInfo = getMFAInfo;
var MultiFactorAuthClaim = RecipeWrapper.MultiFactorAuthClaim;
exports.MultiFactorAuthClaim = MultiFactorAuthClaim;
