"use strict";
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
var querier_1 = require("../../querier");
var recipe_1 = require("../multitenancy/recipe");
var utils_1 = require("../../utils");
function getRecipeImplementation(recipeImplInput) {
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
    return {
        submitNewPassword: function (_a) {
            var formFields = _a.formFields,
                options = _a.options,
                userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var tenantId, token, _b, jsonBody, fetchResponse;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            tenantId = this.getTenantIdFromURL({ userContext: userContext });
                            token = this.getResetPasswordTokenFromURL({
                                userContext: userContext,
                            });
                            return [
                                4 /*yield*/,
                                querier.post(
                                    tenantId,
                                    "/user/password/reset",
                                    { body: JSON.stringify({ formFields: formFields, token: token, method: "token" }) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "SUBMIT_NEW_PASSWORD",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "SUBMIT_NEW_PASSWORD",
                                        userContext: userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: jsonBody.formFields,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            if (jsonBody.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: jsonBody.status,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        sendPasswordResetEmail: function (_a) {
            var formFields = _a.formFields,
                options = _a.options,
                userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _d = (_c = querier).post;
                            return [
                                4 /*yield*/,
                                recipe_1.default
                                    .getInstanceOrThrow()
                                    .recipeImplementation.getTenantId({ userContext: userContext }),
                            ];
                        case 1:
                            return [
                                4 /*yield*/,
                                _d.apply(_c, [
                                    _e.sent(),
                                    "/user/password/reset/token",
                                    { body: JSON.stringify({ formFields: formFields }) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "SEND_RESET_PASSWORD_EMAIL",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "SEND_RESET_PASSWORD_EMAIL",
                                        userContext: userContext,
                                    }),
                                ]),
                            ];
                        case 2:
                            (_b = _e.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: jsonBody.formFields,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            if (jsonBody.status === "PASSWORD_RESET_NOT_ALLOWED") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: jsonBody.status,
                                        reason: jsonBody.reason,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
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
        signUp: function (_a) {
            var formFields = _a.formFields,
                shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser,
                options = _a.options,
                userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _d = (_c = querier).post;
                            return [
                                4 /*yield*/,
                                recipe_1.default
                                    .getInstanceOrThrow()
                                    .recipeImplementation.getTenantId({ userContext: userContext }),
                            ];
                        case 1:
                            return [
                                4 /*yield*/,
                                _d.apply(_c, [
                                    _e.sent(),
                                    "/signup",
                                    {
                                        body: JSON.stringify({
                                            formFields: formFields,
                                            shouldTryLinkingWithSessionUser: shouldTryLinkingWithSessionUser,
                                        }),
                                    },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_PASSWORD_SIGN_UP",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "EMAIL_PASSWORD_SIGN_UP",
                                        userContext: userContext,
                                    }),
                                ]),
                            ];
                        case 2:
                            (_b = _e.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: jsonBody.formFields,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            if (jsonBody.status === "SIGN_UP_NOT_ALLOWED") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "SIGN_UP_NOT_ALLOWED",
                                        reason: jsonBody.reason,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            return [
                                2 /*return*/,
                                {
                                    status: jsonBody.status,
                                    user: (0, utils_1.normaliseUser)("emailpassword", jsonBody.user),
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        signIn: function (_a) {
            var formFields = _a.formFields,
                shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser,
                options = _a.options,
                userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _d = (_c = querier).post;
                            return [
                                4 /*yield*/,
                                recipe_1.default
                                    .getInstanceOrThrow()
                                    .recipeImplementation.getTenantId({ userContext: userContext }),
                            ];
                        case 1:
                            return [
                                4 /*yield*/,
                                _d.apply(_c, [
                                    _e.sent(),
                                    "/signin",
                                    {
                                        body: JSON.stringify({
                                            formFields: formFields,
                                            shouldTryLinkingWithSessionUser: shouldTryLinkingWithSessionUser,
                                        }),
                                    },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_PASSWORD_SIGN_IN",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "EMAIL_PASSWORD_SIGN_IN",
                                        userContext: userContext,
                                    }),
                                ]),
                            ];
                        case 2:
                            (_b = _e.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: jsonBody.formFields,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            if (jsonBody.status === "WRONG_CREDENTIALS_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "WRONG_CREDENTIALS_ERROR",
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            if (jsonBody.status === "SIGN_IN_NOT_ALLOWED") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "SIGN_IN_NOT_ALLOWED",
                                        reason: jsonBody.reason,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            return [
                                2 /*return*/,
                                {
                                    status: "OK",
                                    user: (0, utils_1.normaliseUser)("emailpassword", jsonBody.user),
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        doesEmailExist: function (_a) {
            var email = _a.email,
                options = _a.options,
                userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _d = (_c = querier).get;
                            return [
                                4 /*yield*/,
                                recipe_1.default
                                    .getInstanceOrThrow()
                                    .recipeImplementation.getTenantId({ userContext: userContext }),
                            ];
                        case 1:
                            return [
                                4 /*yield*/,
                                _d.apply(_c, [
                                    _e.sent(),
                                    "/emailpassword/email/exists",
                                    {},
                                    { email: email },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_EXISTS",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "EMAIL_EXISTS",
                                        userContext: userContext,
                                    }),
                                ]),
                            ];
                        case 2:
                            (_b = _e.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
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
        getResetPasswordTokenFromURL: function () {
            var token = (0, utils_1.getQueryParams)("token");
            if (token === undefined) {
                return "";
            }
            return token;
        },
        getTenantIdFromURL: function () {
            return (0, utils_1.getQueryParams)("tenantId");
        },
    };
}
exports.default = getRecipeImplementation;
exports.getRecipeImplementation = getRecipeImplementation;
