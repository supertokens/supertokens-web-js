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
var querier_1 = require("../../querier");
var utils_1 = require("../../utils");
var error_1 = require("../../error");
var windowHandler_1 = require("../../windowHandler");
function getRecipeImplementation(recipeImplInput) {
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
    return {
        getStateAndOtherInfoFromStorage: function () {
            /**
             * This function can also be used to decide which flow to use in the UI
             * (For example routing in supertokens-auth-react), which means we can
             * not make this an async function.
             *
             * To allow for this and allow for storage functions to be async where
             * possible we call the sync version of getItem here
             */
            var stateFromStorage =
                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.getItemSync(
                    "supertokens-oauth-state-2"
                );
            if (stateFromStorage === null) {
                return undefined;
            }
            try {
                return JSON.parse(stateFromStorage);
            } catch (_a) {
                return undefined;
            }
        },
        setStateAndOtherInfoToStorage: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = JSON.stringify(__assign({}, input.state));
                            return [
                                4 /*yield*/,
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.setItem(
                                    "supertokens-oauth-state-2",
                                    value
                                ),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var urlResponse, frontendRedirectURIToSave, stateToSendToAuthProvider, stateExpiry, urlWithState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.getAuthorisationURLFromBackend({
                                    thirdPartyId: input.thirdPartyId,
                                    tenantId: input.tenantId,
                                    redirectURIOnProviderDashboard:
                                        input.redirectURIOnProviderDashboard || input.frontendRedirectURI,
                                    userContext: input.userContext,
                                    options: input.options,
                                }),
                            ];
                        case 1:
                            urlResponse = _a.sent();
                            frontendRedirectURIToSave =
                                input.redirectURIOnProviderDashboard !== undefined &&
                                input.frontendRedirectURI !== input.redirectURIOnProviderDashboard
                                    ? input.frontendRedirectURI
                                    : undefined;
                            stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                                frontendRedirectURI: frontendRedirectURIToSave,
                                userContext: input.userContext,
                            });
                            stateExpiry = Date.now() + 1000 * 60 * 10;
                            return [
                                4 /*yield*/,
                                this.setStateAndOtherInfoToStorage({
                                    state: {
                                        stateForAuthProvider: stateToSendToAuthProvider,
                                        thirdPartyId: input.thirdPartyId,
                                        tenantId: input.tenantId,
                                        expiresAt: stateExpiry,
                                        redirectURIOnProviderDashboard:
                                            input.redirectURIOnProviderDashboard || input.frontendRedirectURI,
                                        shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                                        pkceCodeVerifier: urlResponse.pkceCodeVerifier,
                                    },
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            urlWithState = (0, utils_1.appendQueryParamsToURL)(urlResponse.urlWithQueryParams, {
                                state: stateToSendToAuthProvider,
                            });
                            return [2 /*return*/, urlWithState];
                    }
                });
            });
        },
        getAuthorisationURLFromBackend: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var queryParams, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            queryParams = {
                                thirdPartyId: input.thirdPartyId,
                                redirectURIOnProviderDashboard: input.redirectURIOnProviderDashboard,
                            };
                            if (recipeImplInput.clientType !== undefined) {
                                queryParams.clientType = recipeImplInput.clientType;
                            }
                            return [
                                4 /*yield*/,
                                querier.get(
                                    input.tenantId,
                                    "/authorisationurl",
                                    {},
                                    queryParams,
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "GET_AUTHORISATION_URL",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "GET_AUTHORISATION_URL",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: "OK",
                                    urlWithQueryParams: jsonBody.urlWithQueryParams,
                                    pkceCodeVerifier: jsonBody.pkceCodeVerifier,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        signInAndUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stateFromStorage,
                    stateFromQueryParams,
                    verifiedState,
                    errorInQuery,
                    queryParams,
                    queryParamsObj,
                    _a,
                    jsonBody,
                    fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            stateFromStorage = this.getStateAndOtherInfoFromStorage({
                                userContext: input.userContext,
                            });
                            stateFromQueryParams = this.getAuthStateFromURL({
                                userContext: input.userContext,
                            });
                            return [
                                4 /*yield*/,
                                this.verifyAndGetStateOrThrowError({
                                    stateFromAuthProvider: stateFromQueryParams,
                                    stateObjectFromStorage: stateFromStorage,
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            verifiedState = _b.sent();
                            errorInQuery = this.getAuthErrorFromURL({
                                userContext: input.userContext,
                            });
                            if (errorInQuery !== undefined) {
                                /**
                                 * If an error occurs the auth provider will send an additional query param
                                 * 'error' which will be a code that represents what error occured. Since the
                                 * error is not end-user friendly we throw a normal Javascript Error instead
                                 * of STGeneralError
                                 *
                                 * Explained in detail in the RFC:
                                 * https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
                                 */
                                throw new Error("Auth provider responded with error: ".concat(errorInQuery));
                            }
                            queryParams = (0, utils_1.getAllQueryParams)();
                            queryParamsObj = Object.fromEntries(queryParams);
                            return [
                                4 /*yield*/,
                                querier.post(
                                    verifiedState.tenantId,
                                    "/signinup",
                                    {
                                        body: JSON.stringify({
                                            thirdPartyId: verifiedState.thirdPartyId,
                                            clientType: recipeImplInput.clientType,
                                            redirectURIInfo: {
                                                redirectURIOnProviderDashboard:
                                                    verifiedState.redirectURIOnProviderDashboard,
                                                redirectURIQueryParams: queryParamsObj,
                                                pkceCodeVerifier: verifiedState.pkceCodeVerifier,
                                            },
                                            shouldTryLinkingWithSessionUser:
                                                verifiedState.shouldTryLinkingWithSessionUser,
                                        }),
                                    },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 2:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                throw new error_1.default(jsonBody.error);
                            }
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
                                        (0, utils_1.normaliseUserResponse)("thirdparty", jsonBody)
                                    ),
                                    { fetchResponse: fetchResponse }
                                ),
                            ];
                    }
                });
            });
        },
        generateStateToSendToOAuthProvider: function (input) {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            var state = {
                state: "".concat(1e20).replace(/[018]/g, function (c) {
                    return (
                        parseInt(c) ^
                        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                    ).toString(16);
                }),
            };
            if (input !== undefined && input.frontendRedirectURI !== undefined) {
                state.frontendRedirectURI = input.frontendRedirectURI;
            }
            return btoa(JSON.stringify(state));
        },
        verifyAndGetStateOrThrowError: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (
                        input.stateObjectFromStorage === undefined ||
                        input.stateObjectFromStorage.stateForAuthProvider === undefined
                    ) {
                        throw new Error("No valid auth state present in session storage");
                    }
                    if (input.stateFromAuthProvider === undefined) {
                        throw new Error("No state recieved from auth provider");
                    }
                    if (input.stateObjectFromStorage.expiresAt < Date.now()) {
                        throw new Error("Auth state verification failed. The auth provider took too long to respond");
                    }
                    if (input.stateFromAuthProvider !== input.stateObjectFromStorage.stateForAuthProvider) {
                        throw new Error(
                            "Auth state verification failed. The auth provider responded with an invalid state"
                        );
                    }
                    return [2 /*return*/, input.stateObjectFromStorage];
                });
            });
        },
        getAuthErrorFromURL: function () {
            return (0, utils_1.getQueryParams)("error");
        },
        getAuthStateFromURL: function () {
            var stateFromURL = (0, utils_1.getQueryParams)("state");
            if (stateFromURL === undefined) {
                return "";
            }
            return stateFromURL;
        },
    };
}
exports.default = getRecipeImplementation;
exports.getRecipeImplementation = getRecipeImplementation;
