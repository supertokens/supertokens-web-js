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
exports.getRecipeImplementation = void 0;
var windowHandler_1 = require("../../windowHandler");
var querier_1 = require("../../querier");
var utils_1 = require("../../utils");
var recipe_1 = require("../multitenancy/recipe");
var constants_1 = require("./constants");
function getRecipeImplementation(recipeImplInput) {
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
    return {
        createCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, _a, jsonBody, fetchResponse, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if ("email" in input) {
                                bodyObj = {
                                    email: input.email,
                                    shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                                };
                            }
                            if ("phoneNumber" in input) {
                                bodyObj = {
                                    phoneNumber: input.phoneNumber,
                                    shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                                };
                            }
                            _c = (_b = querier).post;
                            return [
                                4 /*yield*/,
                                recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            return [
                                4 /*yield*/,
                                _c.apply(_b, [
                                    _d.sent(),
                                    "/signinup/code",
                                    { body: JSON.stringify(bodyObj) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PASSWORDLESS_CREATE_CODE",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PASSWORDLESS_CREATE_CODE",
                                        userContext: input.userContext,
                                    }),
                                ]),
                            ];
                        case 2:
                            (_a = _d.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        resendCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            bodyObj = {
                                deviceId: input.deviceId,
                                preAuthSessionId: input.preAuthSessionId,
                                shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                            };
                            return [
                                4 /*yield*/,
                                querier.post(
                                    input.tenantId,
                                    "/signinup/code/resend",
                                    { body: JSON.stringify(bodyObj) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PASSWORDLESS_RESEND_CODE",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PASSWORDLESS_RESEND_CODE",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: jsonBody.status,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if ("userInputCode" in input) {
                                bodyObj = {
                                    userInputCode: input.userInputCode,
                                    deviceId: input.deviceId,
                                    preAuthSessionId: input.preAuthSessionId,
                                    shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                                };
                            } else {
                                bodyObj = {
                                    linkCode: input.linkCode,
                                    preAuthSessionId: input.preAuthSessionId,
                                    shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                                };
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    input.tenantId,
                                    "/signinup/code/consume",
                                    { body: JSON.stringify(bodyObj) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PASSWORDLESS_CONSUME_CODE",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PASSWORDLESS_CONSUME_CODE",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            if (jsonBody.status !== "OK") {
                                return [
                                    2 /*return*/,
                                    __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse }),
                                ];
                            }
                            return [
                                2 /*return*/,
                                __assign(
                                    __assign(
                                        { status: "OK" },
                                        (0, utils_1.normaliseUserResponse)("passwordless", jsonBody)
                                    ),
                                    { fetchResponse: fetchResponse }
                                ),
                            ];
                    }
                });
            });
        },
        getTenantIdFromURL: function () {
            return (0, utils_1.getQueryParams)("tenantId");
        },
        getLinkCodeFromURL: function () {
            return (0, utils_1.getHashFromLocation)();
        },
        getPreAuthSessionIdFromURL: function () {
            var idFromQuery = (0, utils_1.getQueryParams)("preAuthSessionId");
            if (idFromQuery === undefined) {
                return "";
            }
            return idFromQuery;
        },
        doesEmailExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, jsonBody, fetchResponse, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _c = (_b = querier).get;
                            return [
                                4 /*yield*/,
                                recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            return [
                                4 /*yield*/,
                                _c.apply(_b, [
                                    _d.sent(),
                                    "/passwordless/email/exists",
                                    {},
                                    { email: input.email },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_EXISTS",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "EMAIL_EXISTS",
                                        userContext: input.userContext,
                                    }),
                                ]),
                            ];
                        case 2:
                            (_a = _d.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: jsonBody.status,
                                    doesExist: jsonBody.exists,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        doesPhoneNumberExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, jsonBody, fetchResponse, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _c = (_b = querier).get;
                            return [
                                4 /*yield*/,
                                recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            return [
                                4 /*yield*/,
                                _c.apply(_b, [
                                    _d.sent(),
                                    "/passwordless/phonenumber/exists",
                                    {},
                                    { phoneNumber: input.phoneNumber },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PHONE_NUMBER_EXISTS",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PHONE_NUMBER_EXISTS",
                                        userContext: input.userContext,
                                    }),
                                ]),
                            ];
                        case 2:
                            (_a = _d.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: jsonBody.status,
                                    doesExist: jsonBody.exists,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        getLoginAttemptInfo: function () {
            return __awaiter(this, void 0, void 0, function () {
                var storedInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(
                                    constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY
                                ),
                            ];
                        case 1:
                            storedInfo = _a.sent();
                            if (storedInfo === null) {
                                return [2 /*return*/, undefined];
                            }
                            try {
                                return [2 /*return*/, JSON.parse(storedInfo)];
                            } catch (ex) {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        setLoginAttemptInfo: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(
                                    constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY,
                                    JSON.stringify(
                                        __assign(
                                            {
                                                // This can make future changes/migrations a lot cleaner
                                                version: 1,
                                            },
                                            input.attemptInfo
                                        )
                                    )
                                ),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(
                        constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY
                    );
                    return [2 /*return*/];
                });
            });
        },
    };
}
exports.default = getRecipeImplementation;
exports.getRecipeImplementation = getRecipeImplementation;
