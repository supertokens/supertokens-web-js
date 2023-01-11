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
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLoginAttemptInfo =
    exports.setLoginAttemptInfo =
    exports.getLoginAttemptInfo =
    exports.getPreAuthSessionIdFromURL =
    exports.getLinkCodeFromURL =
    exports.signOut =
    exports.doesPhoneNumberExist =
    exports.doesEmailExist =
    exports.consumeCode =
    exports.resendCode =
    exports.createCode =
    exports.init =
        void 0;
var utils_1 = require("../../utils");
var recipe_1 = require("./recipe");
var UtilFunctions = require("./utils");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    /**
     * Create and send a code to the user for passwordless auth
     *
     * @param email Email of the user, ignored if `phoneNumber` is provided
     *
     * @param phoneNumber Phone number of the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", deviceId, preAuthSessionId, flowType}` If successful
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.createCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    UtilFunctions.createCode(
                        __assign(__assign({}, input), { recipeImplementation: recipe.recipeImplementation })
                    ),
                ];
            });
        });
    };
    /**
     * Resend the code to the user
     *
     * @param deviceId The device if from the reponse of `createCode`
     *
     * @param preAuthSessionId The id from the response of `createCode`
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if succesful
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.resendCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    UtilFunctions.resendCode(
                        __assign(__assign({}, input), { recipeImplementation: recipe.recipeImplementation })
                    ),
                ];
            });
        });
    };
    /**
     * Log the user in using the input code or link code
     *
     * @param userInputCode Code that the user inputs
     *
     * @param deviceId The device if from the reponse of `createCode`. (Not required when using `linkCode`)
     *
     * @param preAuthSessionId The id from the response of `createCode`.
     *
     * @param linkCode The code from the URL to use when logging the user in. Ignored if `userInputCode` is provided
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", user, createdNewUser: bool}` if succesful
     *
     * @returns `{status: "INCORRECT_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is incorrect
     *
     * @returns `{status: "EXPIRED_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is expired
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.consumeCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    UtilFunctions.consumeCode(
                        __assign(__assign({}, input), { recipeImplementation: recipe.recipeImplementation })
                    ),
                ];
            });
        });
    };
    /**
     * Reads and returns the link code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The hash (#) property of the current URL
     */
    RecipeWrapper.getLinkCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getLinkCodeFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Reads and returns the pre auth session id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "preAuthSessionId" query parameter from the current URL
     */
    RecipeWrapper.getPreAuthSessionIdFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getPreAuthSessionIdFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Check if a user with the given email exists
     *
     * @param email Email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.doesEmailExist = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.doesEmailExist(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Check if a user with the given phone number exists
     *
     * @param phoneNumber Phone number to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.doesPhoneNumberExist = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.doesPhoneNumberExist(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Get information about the current login attempt from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns `{deviceId, preAuthSessionId, flowType}` if present, returns undefined otherwise
     */
    RecipeWrapper.getLoginAttemptInfo = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getLoginAttemptInfo(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Set information about the current login attempt to storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.setLoginAttemptInfo = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.setLoginAttemptInfo(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Clear any information about login attempts from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.clearLoginAttemptInfo = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.clearLoginAttemptInfo(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    RecipeWrapper.signOut = function (input) {
        return recipe_1.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    return RecipeWrapper;
})();
exports.default = RecipeWrapper;
var init = RecipeWrapper.init;
exports.init = init;
var createCode = RecipeWrapper.createCode;
exports.createCode = createCode;
var resendCode = RecipeWrapper.resendCode;
exports.resendCode = resendCode;
var consumeCode = RecipeWrapper.consumeCode;
exports.consumeCode = consumeCode;
var doesEmailExist = RecipeWrapper.doesEmailExist;
exports.doesEmailExist = doesEmailExist;
var doesPhoneNumberExist = RecipeWrapper.doesPhoneNumberExist;
exports.doesPhoneNumberExist = doesPhoneNumberExist;
var signOut = RecipeWrapper.signOut;
exports.signOut = signOut;
var getLinkCodeFromURL = RecipeWrapper.getLinkCodeFromURL;
exports.getLinkCodeFromURL = getLinkCodeFromURL;
var getPreAuthSessionIdFromURL = RecipeWrapper.getPreAuthSessionIdFromURL;
exports.getPreAuthSessionIdFromURL = getPreAuthSessionIdFromURL;
var getLoginAttemptInfo = RecipeWrapper.getLoginAttemptInfo;
exports.getLoginAttemptInfo = getLoginAttemptInfo;
var setLoginAttemptInfo = RecipeWrapper.setLoginAttemptInfo;
exports.setLoginAttemptInfo = setLoginAttemptInfo;
var clearLoginAttemptInfo = RecipeWrapper.clearLoginAttemptInfo;
exports.clearLoginAttemptInfo = clearLoginAttemptInfo;
