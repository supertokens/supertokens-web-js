"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionClaim = exports.UserRoleClaim = void 0;
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
var userRoleClaim_1 = require("./userRoleClaim");
Object.defineProperty(exports, "UserRoleClaim", {
    enumerable: true,
    get: function () {
        return userRoleClaim_1.UserRoleClaim;
    },
});
var permissionClaim_1 = require("./permissionClaim");
Object.defineProperty(exports, "PermissionClaim", {
    enumerable: true,
    get: function () {
        return permissionClaim_1.PermissionClaim;
    },
});
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.UserRoleClaim = userRoleClaim_1.UserRoleClaim;
    RecipeWrapper.PermissionClaim = permissionClaim_1.PermissionClaim;
    return RecipeWrapper;
})();
exports.default = RecipeWrapper;
