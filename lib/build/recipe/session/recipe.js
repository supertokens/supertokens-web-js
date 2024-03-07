"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
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
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
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
var recipeModule_1 = require("../recipeModule");
var supertokens_website_1 = require("supertokens-website");
var utils_1 = require("../../utils");
var constants_1 = require("../emailverification/constants");
var priorityValidatorIds = [constants_1.EMAILVERIFICATION_CLAIM_ID];
var Recipe = /** @class */ (function (_super) {
    __extends(Recipe, _super);
    function Recipe(config) {
        var _this = _super.call(this, config) || this;
        _this.getUserId = function (input) {
            return supertokens_website_1.default.getUserId({
                userContext: input.userContext,
            });
        };
        _this.getAccessToken = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        supertokens_website_1.default.getAccessToken({
                            userContext: input.userContext,
                        }),
                    ];
                });
            });
        };
        _this.getAccessTokenPayloadSecurely = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        supertokens_website_1.default.getAccessTokenPayloadSecurely({
                            userContext: input.userContext,
                        }),
                    ];
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return supertokens_website_1.default.doesSessionExist({
                userContext: input.userContext,
            });
        };
        _this.signOut = function (input) {
            return supertokens_website_1.default.signOut({
                userContext: input.userContext,
            });
        };
        _this.attemptRefreshingSession = function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, supertokens_website_1.default.attemptRefreshingSession()];
                });
            });
        };
        _this.validateClaims = function (input) {
            return supertokens_website_1.default.validateClaims(input.overrideGlobalClaimValidators, input.userContext);
        };
        supertokens_website_1.default.init(
            __assign(__assign({}, config), {
                override: {
                    functions: function (originalImpl, builder) {
                        var _a;
                        builder.override(function (oI) {
                            return __assign(__assign({}, oI), {
                                getGlobalClaimValidators: function (input) {
                                    var res = oI.getGlobalClaimValidators(input);
                                    return __spreadArray(
                                        __spreadArray(
                                            [],
                                            res.filter(function (x) {
                                                return priorityValidatorIds.includes(x.id);
                                            }),
                                            true
                                        ),
                                        res.filter(function (x) {
                                            return !priorityValidatorIds.includes(x.id);
                                        }),
                                        true
                                    );
                                },
                            });
                        });
                        if ((_a = config.override) === null || _a === void 0 ? void 0 : _a.functions) {
                            builder.override(config.override.functions);
                        }
                        return originalImpl;
                    },
                },
                preAPIHook: function (context) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var headers, response;
                        return __generator(this, function (_a) {
                            headers = new Headers(context.requestInit.headers);
                            headers.set("rid", config.recipeId);
                            response = __assign(__assign({}, context), {
                                requestInit: __assign(__assign({}, context.requestInit), { headers: headers }),
                            });
                            if (config.preAPIHook === undefined) {
                                return [2 /*return*/, response];
                            } else {
                                return [2 /*return*/, config.preAPIHook(context)];
                            }
                            return [2 /*return*/];
                        });
                    });
                },
                apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
                apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous(),
            })
        );
        return _this;
    }
    Recipe.init = function (config) {
        return function (appInfo, _, enableDebugLogs) {
            Recipe.instance = new Recipe(
                __assign(__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: Recipe.RECIPE_ID,
                    enableDebugLogs: enableDebugLogs,
                })
            );
            return Recipe.instance;
        };
    };
    Recipe.prototype.getClaimValue = function (input) {
        return supertokens_website_1.default.getClaimValue(input);
    };
    // The strange typing is to avoid adding a dependency to axios
    Recipe.prototype.getInvalidClaimsFromResponse = function (input) {
        return supertokens_website_1.default.getInvalidClaimsFromResponse(input);
    };
    Recipe.addAxiosInterceptors = function (axiosInstance, userContext) {
        return supertokens_website_1.default.addAxiosInterceptors(axiosInstance, userContext);
    };
    Recipe.getInstanceOrThrow = function () {
        if (Recipe.instance === undefined) {
            var error =
                "No instance of Session found. Ensure that the 'Session.init' method is called within the 'SuperTokens.init' recipeList.";
            error = (0, utils_1.checkForSSRErrorAndAppendIfNeeded)(error);
            throw Error(error);
        }
        return Recipe.instance;
    };
    Recipe.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Recipe.instance = undefined;
        return;
    };
    Recipe.RECIPE_ID = "session";
    return Recipe;
})(recipeModule_1.default);
exports.Recipe = Recipe;
exports.default = Recipe;
