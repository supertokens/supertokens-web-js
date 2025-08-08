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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipeImplementation = void 0;
var querier_1 = require("../../querier");
var recipe_1 = require("../multitenancy/recipe");
var browser_1 = require("@simplewebauthn/browser");
function getRecipeImplementation(recipeImplInput) {
    var _this = this;
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
    return {
        getRegisterOptions: function (_a) {
            var options = _a.options, userContext = _a.userContext, email = _a.email, recoverAccountToken = _a.recoverAccountToken;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/webauthn/options/register"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {
                                    body: email !== undefined ? { email: email } : { recoverAccountToken: recoverAccountToken },
                                },
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "REGISTER_OPTIONS",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "REGISTER_OPTIONS",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        getSignInOptions: function (_a) {
            var options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/webauthn/options/signin"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {},
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "SIGN_IN_OPTIONS",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "SIGN_IN_OPTIONS",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        signUp: function (_a) {
            var webauthnGeneratedOptionsId = _a.webauthnGeneratedOptionsId, credential = _a.credential, options = _a.options, userContext = _a.userContext, shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/webauthn/signup"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {
                                    body: {
                                        webauthnGeneratedOptionsId: webauthnGeneratedOptionsId,
                                        credential: credential,
                                        shouldTryLinkingWithSessionUser: shouldTryLinkingWithSessionUser,
                                    },
                                },
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "SIGN_UP",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "SIGN_UP",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        signIn: function (_a) {
            var webauthnGeneratedOptionsId = _a.webauthnGeneratedOptionsId, credential = _a.credential, options = _a.options, userContext = _a.userContext, shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/webauthn/signin"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {
                                    body: {
                                        webauthnGeneratedOptionsId: webauthnGeneratedOptionsId,
                                        credential: credential,
                                        shouldTryLinkingWithSessionUser: shouldTryLinkingWithSessionUser,
                                    },
                                },
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "SIGN_IN",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "SIGN_IN",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        getEmailExists: function (_a) {
            var email = _a.email, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).get;
                            _e = {
                                path: "/<tenantId>/webauthn/email/exists"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e.queryParams = {
                                        email: email,
                                    },
                                    _e), {},
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
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        generateRecoverAccountToken: function (_a) {
            var email = _a.email, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/user/webauthn/reset/token"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {
                                    body: {
                                        email: email,
                                    },
                                },
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "GENERATE_RECOVER_ACCOUNT_TOKEN",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "GENERATE_RECOVER_ACCOUNT_TOKEN",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        recoverAccount: function (_a) {
            var token = _a.token, webauthnGeneratedOptionsId = _a.webauthnGeneratedOptionsId, credential = _a.credential, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/user/webauthn/reset"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {
                                    body: {
                                        token: token,
                                        webauthnGeneratedOptionsId: webauthnGeneratedOptionsId,
                                        credential: credential,
                                    },
                                },
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "RECOVER_ACCOUNT",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "RECOVER_ACCOUNT",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        createCredential: function (_a) {
            var registrationOptions = _a.registrationOptions;
            return __awaiter(this, void 0, void 0, function () {
                var registrationResponse, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, browser_1.startRegistration)({ optionsJSON: registrationOptions })];
                        case 1:
                            registrationResponse = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _b.sent();
                            if (error_1.name === "InvalidStateError") {
                                return [2 /*return*/, { status: "AUTHENTICATOR_ALREADY_REGISTERED" }];
                            }
                            if (error_1.name === "NotSupportedError" ||
                                error_1.message === "WebAuthn is not supported in this browser") {
                                return [2 /*return*/, { status: "WEBAUTHN_NOT_SUPPORTED", error: error_1 }];
                            }
                            return [2 /*return*/, {
                                    status: "FAILED_TO_REGISTER_USER",
                                    error: error_1,
                                }];
                        case 3: return [2 /*return*/, {
                                status: "OK",
                                registrationResponse: registrationResponse,
                            }];
                    }
                });
            });
        },
        registerCredentialWithSignUp: function (_a) {
            var email = _a.email, shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var registrationOptions, createCredentialResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getRegisterOptions({ options: options, userContext: userContext, email: email })];
                        case 1:
                            registrationOptions = _b.sent();
                            if ((registrationOptions === null || registrationOptions === void 0 ? void 0 : registrationOptions.status) !== "OK") {
                                // If we did not get an OK status, we need to return the error as is.
                                // If the `status` is `RECOVER_ACCOUNT_TOKEN_INVALID_ERROR`, we need to throw an
                                // error since that should never happen as we are registering with an email
                                // and not a token.
                                if ((registrationOptions === null || registrationOptions === void 0 ? void 0 : registrationOptions.status) === "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR") {
                                    throw new Error("Got `RECOVER_ACCOUNT_TOKEN_INVALID_ERROR` status that should never happen");
                                }
                                return [2 /*return*/, registrationOptions];
                            }
                            return [4 /*yield*/, this.createCredential({ registrationOptions: registrationOptions, userContext: userContext })];
                        case 2:
                            createCredentialResponse = _b.sent();
                            if (createCredentialResponse.status !== "OK") {
                                return [2 /*return*/, createCredentialResponse];
                            }
                            return [4 /*yield*/, this.signUp({
                                    webauthnGeneratedOptionsId: registrationOptions.webauthnGeneratedOptionsId,
                                    credential: createCredentialResponse.registrationResponse,
                                    shouldTryLinkingWithSessionUser: shouldTryLinkingWithSessionUser,
                                    options: options,
                                    userContext: userContext,
                                })];
                        case 3: 
                        // We should have a valid registration response for the passed credentials
                        // and we are good to go ahead and verify them.
                        return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        authenticateCredential: function (_a) {
            var authenticationOptions = _a.authenticationOptions;
            return __awaiter(this, void 0, void 0, function () {
                var authenticationResponse, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, browser_1.startAuthentication)({ optionsJSON: authenticationOptions })];
                        case 1:
                            authenticationResponse = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            if (error_2.name === "NotSupportedError" ||
                                error_2.message === "WebAuthn is not supported in this browser") {
                                return [2 /*return*/, { status: "WEBAUTHN_NOT_SUPPORTED", error: error_2 }];
                            }
                            return [2 /*return*/, {
                                    status: "FAILED_TO_AUTHENTICATE_USER",
                                    error: error_2,
                                }];
                        case 3: return [2 /*return*/, {
                                status: "OK",
                                authenticationResponse: authenticationResponse,
                            }];
                    }
                });
            });
        },
        authenticateCredentialWithSignIn: function (_a) {
            var shouldTryLinkingWithSessionUser = _a.shouldTryLinkingWithSessionUser, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var signInOptions, authenticateCredentialResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getSignInOptions({ options: options, userContext: userContext })];
                        case 1:
                            signInOptions = _b.sent();
                            if ((signInOptions === null || signInOptions === void 0 ? void 0 : signInOptions.status) !== "OK") {
                                // We want to return the error as is if status was not "OK"
                                return [2 /*return*/, signInOptions];
                            }
                            return [4 /*yield*/, this.authenticateCredential({
                                    authenticationOptions: signInOptions,
                                    userContext: userContext,
                                })];
                        case 2:
                            authenticateCredentialResponse = _b.sent();
                            if (authenticateCredentialResponse.status !== "OK") {
                                return [2 /*return*/, authenticateCredentialResponse];
                            }
                            return [4 /*yield*/, this.signIn({
                                    webauthnGeneratedOptionsId: signInOptions.webauthnGeneratedOptionsId,
                                    credential: authenticateCredentialResponse.authenticationResponse,
                                    shouldTryLinkingWithSessionUser: shouldTryLinkingWithSessionUser,
                                    options: options,
                                    userContext: userContext,
                                })];
                        case 3: 
                        // We should have a valid authentication response at this point so we can
                        // go ahead and sign in the user.
                        return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        registerCredentialWithRecoverAccount: function (_a) {
            var recoverAccountToken = _a.recoverAccountToken, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var registrationOptions, createCredentialResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getRegisterOptions({ options: options, userContext: userContext, recoverAccountToken: recoverAccountToken })];
                        case 1:
                            registrationOptions = _b.sent();
                            if ((registrationOptions === null || registrationOptions === void 0 ? void 0 : registrationOptions.status) !== "OK") {
                                // If we did not get an OK status, we need to return the error as is.
                                // If the `status` is `INVALID_EMAIL_ERROR`, we need to throw an
                                // error since that should never happen as we are registering with a recover account token
                                // and not an email ID.
                                if ((registrationOptions === null || registrationOptions === void 0 ? void 0 : registrationOptions.status) === "INVALID_EMAIL_ERROR") {
                                    throw new Error("Got `INVALID_EMAIL_ERROR` status that should never happen");
                                }
                                return [2 /*return*/, registrationOptions];
                            }
                            return [4 /*yield*/, this.createCredential({
                                    registrationOptions: registrationOptions,
                                    userContext: userContext,
                                })];
                        case 2:
                            createCredentialResponse = _b.sent();
                            if (createCredentialResponse.status !== "OK") {
                                return [2 /*return*/, createCredentialResponse];
                            }
                            return [4 /*yield*/, this.recoverAccount({
                                    token: recoverAccountToken,
                                    webauthnGeneratedOptionsId: registrationOptions.webauthnGeneratedOptionsId,
                                    credential: createCredentialResponse.registrationResponse,
                                    options: options,
                                    userContext: userContext,
                                })];
                        case 3: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        createAndRegisterCredentialForSessionUser: function (_a) {
            var recipeUserId = _a.recipeUserId, email = _a.email, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var registrationOptions, createCredentialResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getRegisterOptions({ options: options, userContext: userContext, email: email })];
                        case 1:
                            registrationOptions = _b.sent();
                            if ((registrationOptions === null || registrationOptions === void 0 ? void 0 : registrationOptions.status) !== "OK") {
                                // If we did not get an OK status, we need to return the error as is.
                                // If the `status` is `RECOVER_ACCOUNT_TOKEN_INVALID_ERROR`, we need to throw an
                                // error since that should never happen as we are registering with an email
                                // and not a token.
                                if ((registrationOptions === null || registrationOptions === void 0 ? void 0 : registrationOptions.status) === "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR") {
                                    throw new Error("Got `RECOVER_ACCOUNT_TOKEN_INVALID_ERROR` status that should never happen");
                                }
                                return [2 /*return*/, registrationOptions];
                            }
                            return [4 /*yield*/, this.createCredential({ registrationOptions: registrationOptions, userContext: userContext })];
                        case 2:
                            createCredentialResponse = _b.sent();
                            if (createCredentialResponse.status !== "OK") {
                                return [2 /*return*/, createCredentialResponse];
                            }
                            return [4 /*yield*/, this.registerCredential({
                                    webauthnGeneratedOptionsId: registrationOptions.webauthnGeneratedOptionsId,
                                    recipeUserId: recipeUserId,
                                    credential: createCredentialResponse.registrationResponse,
                                    options: options,
                                    userContext: userContext,
                                })];
                        case 3: 
                        // We should have a valid registration response for the passed credentials
                        // and we are good to go ahead and verify them.
                        return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        listCredentials: function (_a) {
            var options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).get;
                            _e = {
                                path: "/<tenantId>/webauthn/credential/list"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {},
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "LIST_CREDENTIALS",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "LIST_CREDENTIALS",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        removeCredential: function (_a) {
            var webauthnCredentialId = _a.webauthnCredentialId, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/webauthn/credential/remove"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {
                                    body: {
                                        webauthnCredentialId: webauthnCredentialId,
                                    },
                                },
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "REMOVE_CREDENTIAL",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "REMOVE_CREDENTIAL",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        registerCredential: function (_a) {
            var webauthnGeneratedOptionsId = _a.webauthnGeneratedOptionsId, recipeUserId = _a.recipeUserId, credential = _a.credential, options = _a.options, userContext = _a.userContext;
            return __awaiter(this, void 0, void 0, function () {
                var body, _b, jsonBody, fetchResponse, _c, _d;
                var _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            body = {
                                webauthnGeneratedOptionsId: webauthnGeneratedOptionsId,
                                recipeUserId: recipeUserId,
                                credential: credential,
                            };
                            _d = (_c = querier).post;
                            _e = {
                                path: "/<tenantId>/webauthn/credential"
                            };
                            _f = {};
                            return [4 /*yield*/, recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantId({
                                    userContext: userContext,
                                })];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.pathParams = (_f.tenantId = (_g.sent()) || "public",
                                    _f),
                                    _e), {
                                    body: body,
                                },
                                querier_1.default.preparePreAPIHook({
                                    recipePreAPIHook: recipeImplInput.preAPIHook,
                                    action: "REGISTER_CREDENTIAL",
                                    options: options,
                                    userContext: userContext,
                                }),
                                querier_1.default.preparePostAPIHook({
                                    recipePostAPIHook: recipeImplInput.postAPIHook,
                                    action: "REGISTER_CREDENTIAL",
                                    userContext: userContext,
                                })])];
                        case 2:
                            _b = _g.sent(), jsonBody = _b.jsonBody, fetchResponse = _b.fetchResponse;
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        doesBrowserSupportWebAuthn: function () { return __awaiter(_this, void 0, void 0, function () {
            var isPlatformAuthenticatorAvailable, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, browser_1.platformAuthenticatorIsAvailable)()];
                    case 1:
                        isPlatformAuthenticatorAvailable = _a.sent();
                        return [2 /*return*/, {
                                status: "OK",
                                browserSupportsWebauthn: (0, browser_1.browserSupportsWebAuthn)(),
                                platformAuthenticatorIsAvailable: isPlatformAuthenticatorAvailable,
                            }];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, {
                                status: "ERROR",
                                error: error_3,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
    };
}
exports.default = getRecipeImplementation;
exports.getRecipeImplementation = getRecipeImplementation;
