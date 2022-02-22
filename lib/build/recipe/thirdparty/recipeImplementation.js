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
var error_1 = require("../../error");
var querier_1 = require("../../querier");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
function getRecipeImplementation(recipeId, appInfo) {
    var querier = new querier_1.default(recipeId, appInfo);
    return {
        getOAuthState: function () {
            try {
                var state = JSON.parse((0, utils_1.getSessionStorage)("supertokens-oauth-state"));
                if (state === null) {
                    return {
                        status: "OK",
                        state: undefined,
                    };
                }
                if (Date.now() > state.expiresAt) {
                    return {
                        status: "OK",
                        state: undefined,
                    };
                }
                return {
                    status: "OK",
                    state: state,
                };
            } catch (_a) {
                return {
                    status: "OK",
                    state: undefined,
                };
            }
        },
        setOAuthState: function (input) {
            var expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            var value = JSON.stringify({
                redirectToPath: input.state.redirectToPath,
                state: input.state.state,
                thirdPartyId: input.state.thirdPartyId,
                rid: input.state.rid,
                expiresAt: expiresAt,
            });
            (0, utils_1.setSessionStorage)("supertokens-oauth-state", value);
            return {
                status: "OK",
            };
        },
        getThirdPartyLoginRedirectURLWithQueryParams: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var state, urlResponse, urlObj, alreadyContainsRedirectURI, urlWithState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            state =
                                input.state === undefined || input.state.state === undefined
                                    ? (0, utils_2.generateThirdPartyProviderState)()
                                    : input.state.state;
                            // 2. Store state in Session Storage.
                            this.setOAuthState({
                                state: __assign(__assign({}, input.state), {
                                    rid:
                                        input.state === undefined || input.state.rid === undefined
                                            ? input.config.recipeId
                                            : input.state.rid,
                                    thirdPartyId:
                                        input.state === undefined || input.state.thirdPartyId === undefined
                                            ? input.thirdPartyProviderId
                                            : input.state.thirdPartyId,
                                    state: state,
                                }),
                                userContext: input.userContext,
                                config: input.config,
                            });
                            return [
                                4 /*yield*/,
                                this.getOAuthAuthorisationURL({
                                    thirdPartyProviderId: input.thirdPartyProviderId,
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
                                      state: state,
                                  })
                                : (0, utils_1.appendQueryParamsToURL)(urlResponse.url, {
                                      state: state,
                                      redirect_uri: input.thirdPartyRedirectionURL,
                                  });
                            return [
                                2 /*return*/,
                                {
                                    status: "OK",
                                    url: urlWithState,
                                },
                            ];
                    }
                });
            });
        },
        getOAuthAuthorisationURL: function (input) {
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
                                    { thirdPartyId: input.thirdPartyProviderId },
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
                var stateFromStorage, code, stateFromQueryParams, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            stateFromStorage = this.getOAuthState({
                                userContext: input.userContext,
                                config: input.config,
                            }).state;
                            code = (0, utils_1.getQueryParams)("code");
                            stateFromQueryParams = (0, utils_1.getQueryParams)("state");
                            if (
                                (0, utils_1.getQueryParams)("error") !== null ||
                                stateFromStorage === undefined ||
                                stateFromStorage.thirdPartyId !== input.thirdPartyProviderId ||
                                stateFromStorage.state !== stateFromQueryParams ||
                                code === null
                            ) {
                                throw new error_1.default("");
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup",
                                    {
                                        body: JSON.stringify({
                                            code: code,
                                            thirdPartyId: input.thirdPartyProviderId,
                                            redirectURI: input.thirdPartyRedirectionURL,
                                            clientId: input.thirdPartyProviderClientId,
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
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
    };
}
exports.default = getRecipeImplementation;
