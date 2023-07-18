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
exports.AllowedDomainsClaim = exports.getTenantId = exports.getLoginMethods = exports.init = void 0;
var utils_1 = require("../../utils");
var allowedDomainsClaim_1 = require("./allowedDomainsClaim");
Object.defineProperty(exports, "AllowedDomainsClaim", {
    enumerable: true,
    get: function () {
        return allowedDomainsClaim_1.AllowedDomainsClaim;
    },
});
var recipe_1 = require("./recipe");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    /**
     * Gets enabled login methods and their configuration from the backend
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     *
     * @returns `{status: OK, emailpassword, passwordless, thirdParty}` if successful
     */
    RecipeWrapper.getLoginMethods = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getLoginMethods(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Gets enabled login methods and their configuration from the backend
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns `Promise<string | undefined> | string | undefined`
     */
    RecipeWrapper.getTenantId = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    RecipeWrapper.AllowedDomainsClaim = allowedDomainsClaim_1.AllowedDomainsClaim;
    return RecipeWrapper;
})();
exports.default = RecipeWrapper;
var init = RecipeWrapper.init;
exports.init = init;
var getLoginMethods = RecipeWrapper.getLoginMethods;
exports.getLoginMethods = getLoginMethods;
var getTenantId = RecipeWrapper.getTenantId;
exports.getTenantId = getTenantId;
