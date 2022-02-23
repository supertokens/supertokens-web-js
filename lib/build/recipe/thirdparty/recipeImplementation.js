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
var querier_1 = require("../../querier");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var error_1 = require("../../error");
function getRecipeImplementation(recipeId, appInfo) {
    var querier = new querier_1.default(recipeId, appInfo);
    return {
        getStateAndOtherInfoFromStorage: function () {
            try {
                var stateFromStorage = (0, utils_1.getSessionStorage)("supertokens-oauth-state");
                if (stateFromStorage === undefined) {
                    return undefined;
                }
                var state = JSON.parse(stateFromStorage);
                if (Date.now() > state.expiresAt) {
                    return undefined;
                }
                return undefined;
            } catch (_a) {
                return undefined;
            }
        },
        setStateAndOtherInfoToStorage: function (input) {
            var expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            var value = JSON.stringify(__assign(__assign({}, input.state), { expiresAt: expiresAt }));
            (0, utils_1.setSessionStorage)("supertokens-oauth-state", value);
        },
        getLoginRedirectURLWithQueryParamsAndSetState: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stateToSendToAuthProvider, urlResponse, urlObj, alreadyContainsRedirectURI, urlWithState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                                userContext: input.userContext,
                            });
                            // 2. Store state in Session Storage.
                            this.setStateAndOtherInfoToStorage({
                                state: {
                                    thirdPartyId: input.providerId,
                                    stateForAuthProvider: stateToSendToAuthProvider,
                                },
                                userContext: input.userContext,
                                config: input.config,
                            });
                            return [
                                4 /*yield*/,
                                this.getOAuthAuthorisationURLFromBackend({
                                    providerId: input.providerId,
                                    config: input.config,
                                    userContext: input.userContext,
                                    options: input.options,
                                }),
                            ];
                        case 1:
                            urlResponse = _a.sent();
                            urlObj = new URL(urlResponse.url);
                            alreadyContainsRedirectURI = urlObj.searchParams.get("redirect_uri") !== null;
                            urlWithState = alreadyContainsRedirectURI
                                ? (0, utils_1.appendQueryParamsToURL)(urlResponse.url, {
                                      stateToSendToAuthProvider: stateToSendToAuthProvider,
                                  })
                                : (0, utils_1.appendQueryParamsToURL)(urlResponse.url, {
                                      stateToSendToAuthProvider: stateToSendToAuthProvider,
                                      redirect_uri: input.redirectionURL,
                                  });
                            return [2 /*return*/, urlWithState];
                    }
                });
            });
        },
        getOAuthAuthorisationURLFromBackend: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(
                                    "/authorisationurl",
                                    {},
                                    { thirdPartyId: input.providerId },
                                    querier_1.default.preparePreAPIHook({
                                        config: input.config,
                                        action: "GET_AUTHORISATION_URL",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        config: input.config,
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
                                    url: jsonBody.url,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        signInAndUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stateFromStorage, stateFromQueryParams, code, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            stateFromStorage = this.getStateAndOtherInfoFromStorage({
                                userContext: input.userContext,
                                config: input.config,
                            });
                            stateFromQueryParams = (0, utils_1.getQueryParams)("state");
                            if (
                                !this.verifyStateFromOAuthProvider({
                                    stateFromProvider: stateFromQueryParams,
                                    stateFromStorage: stateFromStorage,
                                    providerId: input.providerId,
                                })
                            ) {
                                // TODO NEMI: Better error message
                                throw new Error("Invalid auth state");
                            }
                            code = input.authCode === undefined ? (0, utils_1.getQueryParams)("code") : input.authCode;
                            if ((0, utils_1.getQueryParams)("error") !== undefined || code === undefined) {
                                // TODO NEMI: This should have a better message. Also split this into two if conditions
                                throw new Error("Something went Wrong");
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup",
                                    {
                                        body: JSON.stringify({
                                            code: code,
                                            thirdPartyId: input.providerId,
                                            redirectURI: input.redirectionURL,
                                            clientId: input.providerClientId,
                                        }),
                                    },
                                    querier_1.default.preparePreAPIHook({
                                        config: input.config,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        config: input.config,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                throw new error_1.default(jsonBody.error);
                            }
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        generateStateToSendToOAuthProvider: function () {
            return (0, utils_2.generateThirdPartyProviderState)();
        },
        verifyStateFromOAuthProvider: function (input) {
            if (input.stateFromStorage === undefined || input.stateFromProvider === undefined) {
                return false;
            }
            return (
                input.stateFromProvider === input.stateFromStorage.stateForAuthProvider &&
                input.stateFromStorage.thirdPartyId === input.providerId
            );
        },
    };
}
exports.default = getRecipeImplementation;
