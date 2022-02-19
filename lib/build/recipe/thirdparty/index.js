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
exports.Twitter =
    exports.Facebook =
    exports.Github =
    exports.Google =
    exports.Apple =
    exports.signInAndUp =
    exports.getOAuthAuthorisationURL =
    exports.getThirdPartyLoginRedirectURL =
    exports.setOAuthState =
    exports.getOAuthState =
    exports.init =
        void 0;
var utils_1 = require("../../utils");
var recipe_1 = require("./recipe");
var apple_1 = require("./providers/apple");
exports.Apple = apple_1.default;
var google_1 = require("./providers/google");
exports.Google = google_1.default;
var facebook_1 = require("./providers/facebook");
exports.Facebook = facebook_1.default;
var github_1 = require("./providers/github");
exports.Github = github_1.default;
var twitter_1 = require("./providers/twitter");
exports.Twitter = twitter_1.default;
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.getOAuthState = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.getOAuthState({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
            config: recipeInstance.config,
        });
    };
    Wrapper.setOAuthState = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.setOAuthState(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                config: recipeInstance.config,
            })
        );
    };
    Wrapper.getThirdPartyLoginRedirectURL = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.getThirdPartyLoginRedirectURL(
            __assign(__assign({}, input), {
                config: recipeInstance.config,
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.getOAuthAuthorisationURL = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.getOAuthAuthorisationURL(
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
    Wrapper.Google = google_1.default;
    Wrapper.Apple = apple_1.default;
    Wrapper.Facebook = facebook_1.default;
    Wrapper.Github = github_1.default;
    Wrapper.Twitter = twitter_1.default;
    return Wrapper;
})();
exports.default = Wrapper;
var init = Wrapper.init;
exports.init = init;
var getOAuthState = Wrapper.getOAuthState;
exports.getOAuthState = getOAuthState;
var setOAuthState = Wrapper.setOAuthState;
exports.setOAuthState = setOAuthState;
var getThirdPartyLoginRedirectURL = Wrapper.getThirdPartyLoginRedirectURL;
exports.getThirdPartyLoginRedirectURL = getThirdPartyLoginRedirectURL;
var getOAuthAuthorisationURL = Wrapper.getOAuthAuthorisationURL;
exports.getOAuthAuthorisationURL = getOAuthAuthorisationURL;
var signInAndUp = Wrapper.signInAndUp;
exports.signInAndUp = signInAndUp;
