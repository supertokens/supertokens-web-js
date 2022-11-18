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
exports.getRecipeImplementation = void 0;
var recipeImplementation_1 = require("../../thirdparty/recipeImplementation");
var recipeImplementation_2 = require("../../passwordless/recipeImplementation");
var thirdparty_1 = require("./thirdparty");
var passwordless_1 = require("./passwordless");
function getRecipeImplementation(recipeImplInput) {
    var thirdPartyImpl = (0, recipeImplementation_1.default)(recipeImplInput);
    var passwordlessImpl = (0, recipeImplementation_2.default)(recipeImplInput);
    return {
        getAuthorisationURLFromBackend: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLFromBackend.bind((0, thirdparty_1.default)(this))(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, thirdPartyImpl.signInAndUp.bind((0, thirdparty_1.default)(this))(input)];
                });
            });
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind((0, thirdparty_1.default)(this))(input);
        },
        setThirdPartyStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind((0, thirdparty_1.default)(this))(input);
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(
                            (0, thirdparty_1.default)(this)
                        )(input),
                    ];
                });
            });
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind((0, thirdparty_1.default)(this))(input);
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.verifyAndGetStateOrThrowError.bind((0, thirdparty_1.default)(this))(input),
                    ];
                });
            });
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind((0, thirdparty_1.default)(this))(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind((0, thirdparty_1.default)(this))(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind((0, thirdparty_1.default)(this))(input);
        },
        createPasswordlessCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, passwordlessImpl.createCode.bind((0, passwordless_1.default)(this))(input)];
                });
            });
        },
        resendPasswordlessCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, passwordlessImpl.resendCode.bind((0, passwordless_1.default)(this))(input)];
                });
            });
        },
        consumePasswordlessCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, passwordlessImpl.consumeCode.bind((0, passwordless_1.default)(this))(input)];
                });
            });
        },
        getPasswordlessLinkCodeFromURL: function (input) {
            return passwordlessImpl.getLinkCodeFromURL.bind((0, passwordless_1.default)(this))(input);
        },
        getPasswordlessPreAuthSessionIdFromURL: function (input) {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind((0, passwordless_1.default)(this))(input);
        },
        doesPasswordlessUserEmailExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        passwordlessImpl.doesEmailExist.bind((0, passwordless_1.default)(this))(input),
                    ];
                });
            });
        },
        doesPasswordlessUserPhoneNumberExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        passwordlessImpl.doesPhoneNumberExist.bind((0, passwordless_1.default)(this))(input),
                    ];
                });
            });
        },
        getPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.getLoginAttemptInfo.bind((0, passwordless_1.default)(this))(input);
        },
        setPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.setLoginAttemptInfo.bind((0, passwordless_1.default)(this))(input);
        },
        clearPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.clearLoginAttemptInfo.bind((0, passwordless_1.default)(this))(input);
        },
    };
}
exports.default = getRecipeImplementation;
exports.getRecipeImplementation = getRecipeImplementation;
