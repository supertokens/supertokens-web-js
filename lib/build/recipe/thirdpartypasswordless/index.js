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
exports.clearPasswordlessLoginAttemptInfo =
    exports.setPasswordlessLoginAttemptInfo =
    exports.getPasswordlessLoginAttemptInfo =
    exports.getPasswordlessPreAuthSessionIdFromURL =
    exports.getPasswordlessLinkCodeFromURL =
    exports.getThirdPartyAuthStateFromURL =
    exports.getThirdPartyAuthErrorFromURL =
    exports.getThirdPartyAuthCodeFromURL =
    exports.verifyAndGetThirdPartyStateOrThrowError =
    exports.generateThirdPartyStateToSendToOAuthProvider =
    exports.setThirdPartyStateAndOtherInfoToStorage =
    exports.getThirdPartyStateAndOtherInfoFromStorage =
    exports.getAuthorisationURLFromBackend =
    exports.signOut =
    exports.doesPasswordlessUserPhoneNumberExist =
    exports.doesPasswordlessUserEmailExist =
    exports.consumePasswordlessCode =
    exports.resendPasswordlessCode =
    exports.createPasswordlessCode =
    exports.thirdPartySignInAndUp =
    exports.getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    exports.init =
        void 0;
var recipe_1 = require("./recipe");
var utils_1 = require("../../utils");
var PasswordlessUtilsFunctions = require("../passwordless/utils");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    RecipeWrapper.signOut = function (input) {
        return recipe_1.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    /**
     * Get the URL to be used by the third party provider for redirecting after the auth flow
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", url}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.getAuthorisationURLFromBackend = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.getAuthorisationURLFromBackend(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.thirdPartySignInAndUp = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.thirdPartySignInAndUp(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    RecipeWrapper.getThirdPartyStateAndOtherInfoFromStorage = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getThirdPartyStateAndOtherInfoFromStorage(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Set the login state to storage
     *
     * @param state
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.setThirdPartyStateAndOtherInfoToStorage = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.setThirdPartyStateAndOtherInfoToStorage(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param authorisationURL The URL that should be used for redirection after the third party flow finishes. This is ignored if the backend has a pre-configured redirect_url
     *
     * @param providerClientId (OPTIONAL) Client id to be used for the third party provider
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Generate a new state that will be sent to the thirs party provider
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns string
     */
    RecipeWrapper.generateThirdPartyStateToSendToOAuthProvider = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.generateThirdPartyStateToSendToOAuthProvider(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Verify that the state recieved from the third party provider matches the one in storage
     *
     * @param stateForAuthProvider State recieved as query param after redirection from third party provider
     *
     * @param stateObjectFromStorage State object from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.verifyAndGetThirdPartyStateOrThrowError = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.verifyAndGetThirdPartyStateOrThrowError(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Returns the auth code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "code" query param from the current URL. Returns an empty string if no code exists
     */
    RecipeWrapper.getThirdPartyAuthCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getThirdPartyAuthCodeFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Returns the error from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "error" query param from the current URL. Returns undefined if no error exists
     */
    RecipeWrapper.getThirdPartyAuthErrorFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getThirdPartyAuthErrorFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Returns the auth state from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "state" query param from the current URL. Returns an empty string if no state exists
     */
    RecipeWrapper.getThirdPartyAuthStateFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getThirdPartyAuthStateFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Create and send a code to the user for passwordless auth
     *
     * @param email Email of the user, ignored if `phoneNumber` is provided
     *
     * @param phoneNumber Phone number of the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", deviceId, preAuthSessionId, flowType}` If successful
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.createPasswordlessCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    PasswordlessUtilsFunctions.createCode(
                        __assign(__assign({}, input), {
                            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
                        })
                    ),
                ];
            });
        });
    };
    /**
     * Resend the code to the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if succesful
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.resendPasswordlessCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    PasswordlessUtilsFunctions.resendCode(
                        __assign(__assign({}, input), {
                            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
                        })
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
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
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
    RecipeWrapper.consumePasswordlessCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    PasswordlessUtilsFunctions.consumeCode(
                        __assign(__assign({}, input), {
                            recipeImplementation: recipe.passwordlessRecipe.recipeImplementation,
                        })
                    ),
                ];
            });
        });
    };
    /**
     * Reads and returns the link code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The hash (#) property of the current URL
     */
    RecipeWrapper.getPasswordlessLinkCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getPasswordlessLinkCodeFromURL(
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
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "preAuthSessionId" query parameter from the current URL
     */
    RecipeWrapper.getPasswordlessPreAuthSessionIdFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getPasswordlessPreAuthSessionIdFromURL(
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.doesPasswordlessUserEmailExist = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.doesPasswordlessUserEmailExist(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Check if a user with the given phone number exists
     *
     * @param phoneNumber Phone number to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.doesPasswordlessUserPhoneNumberExist = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.doesPasswordlessUserPhoneNumberExist(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Get information about the current login attempt from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     *
     * @returns `{deviceId, preAuthSessionId, flowType}` if present, returns undefined otherwise
     */
    RecipeWrapper.getPasswordlessLoginAttemptInfo = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getPasswordlessLoginAttemptInfo(
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
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.setPasswordlessLoginAttemptInfo = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.setPasswordlessLoginAttemptInfo(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Clear any information about login attempts from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartypasswordless/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.clearPasswordlessLoginAttemptInfo = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.clearPasswordlessLoginAttemptInfo(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    return RecipeWrapper;
})();
exports.default = RecipeWrapper;
var init = RecipeWrapper.init;
exports.init = init;
var getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    RecipeWrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
exports.getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
var thirdPartySignInAndUp = RecipeWrapper.thirdPartySignInAndUp;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
var createPasswordlessCode = RecipeWrapper.createPasswordlessCode;
exports.createPasswordlessCode = createPasswordlessCode;
var resendPasswordlessCode = RecipeWrapper.resendPasswordlessCode;
exports.resendPasswordlessCode = resendPasswordlessCode;
var consumePasswordlessCode = RecipeWrapper.consumePasswordlessCode;
exports.consumePasswordlessCode = consumePasswordlessCode;
var doesPasswordlessUserEmailExist = RecipeWrapper.doesPasswordlessUserEmailExist;
exports.doesPasswordlessUserEmailExist = doesPasswordlessUserEmailExist;
var doesPasswordlessUserPhoneNumberExist = RecipeWrapper.doesPasswordlessUserPhoneNumberExist;
exports.doesPasswordlessUserPhoneNumberExist = doesPasswordlessUserPhoneNumberExist;
var getAuthorisationURLFromBackend = RecipeWrapper.getAuthorisationURLFromBackend;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
var getThirdPartyStateAndOtherInfoFromStorage = RecipeWrapper.getThirdPartyStateAndOtherInfoFromStorage;
exports.getThirdPartyStateAndOtherInfoFromStorage = getThirdPartyStateAndOtherInfoFromStorage;
var setThirdPartyStateAndOtherInfoToStorage = RecipeWrapper.setThirdPartyStateAndOtherInfoToStorage;
exports.setThirdPartyStateAndOtherInfoToStorage = setThirdPartyStateAndOtherInfoToStorage;
var generateThirdPartyStateToSendToOAuthProvider = RecipeWrapper.generateThirdPartyStateToSendToOAuthProvider;
exports.generateThirdPartyStateToSendToOAuthProvider = generateThirdPartyStateToSendToOAuthProvider;
var verifyAndGetThirdPartyStateOrThrowError = RecipeWrapper.verifyAndGetThirdPartyStateOrThrowError;
exports.verifyAndGetThirdPartyStateOrThrowError = verifyAndGetThirdPartyStateOrThrowError;
var getThirdPartyAuthCodeFromURL = RecipeWrapper.getThirdPartyAuthCodeFromURL;
exports.getThirdPartyAuthCodeFromURL = getThirdPartyAuthCodeFromURL;
var getThirdPartyAuthErrorFromURL = RecipeWrapper.getThirdPartyAuthErrorFromURL;
exports.getThirdPartyAuthErrorFromURL = getThirdPartyAuthErrorFromURL;
var getThirdPartyAuthStateFromURL = RecipeWrapper.getThirdPartyAuthStateFromURL;
exports.getThirdPartyAuthStateFromURL = getThirdPartyAuthStateFromURL;
var getPasswordlessLinkCodeFromURL = RecipeWrapper.getPasswordlessLinkCodeFromURL;
exports.getPasswordlessLinkCodeFromURL = getPasswordlessLinkCodeFromURL;
var getPasswordlessPreAuthSessionIdFromURL = RecipeWrapper.getPasswordlessPreAuthSessionIdFromURL;
exports.getPasswordlessPreAuthSessionIdFromURL = getPasswordlessPreAuthSessionIdFromURL;
var getPasswordlessLoginAttemptInfo = RecipeWrapper.getPasswordlessLoginAttemptInfo;
exports.getPasswordlessLoginAttemptInfo = getPasswordlessLoginAttemptInfo;
var setPasswordlessLoginAttemptInfo = RecipeWrapper.setPasswordlessLoginAttemptInfo;
exports.setPasswordlessLoginAttemptInfo = setPasswordlessLoginAttemptInfo;
var clearPasswordlessLoginAttemptInfo = RecipeWrapper.clearPasswordlessLoginAttemptInfo;
exports.clearPasswordlessLoginAttemptInfo = clearPasswordlessLoginAttemptInfo;
var signOut = RecipeWrapper.signOut;
exports.signOut = signOut;
