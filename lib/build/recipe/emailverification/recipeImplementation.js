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
var querier_1 = require("../../querier");
var utils_1 = require("../../utils");
var EMAIL_VERIFY_PATH = "/user/email/verify";
var SEND_VERIFY_EMAIL_PATH = "/user/email/verify/token";
function getRecipeImplementation(recipeId, appInfo) {
    var querier = new querier_1.default(recipeId, appInfo);
    return {
        verifyEmail: function (_a) {
            var token = _a.token,
                config = _a.config,
                options = _a.options;
            return __awaiter(this, void 0, void 0, function () {
                var _b, json, fetchResponse;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            token = token === undefined ? (0, utils_1.getQueryParams)("token") : token;
                            if (token === undefined) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR",
                                    },
                                ];
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    EMAIL_VERIFY_PATH,
                                    {
                                        body: JSON.stringify({
                                            method: "token",
                                            token: token,
                                        }),
                                    },
                                    function (context) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            var postRecipeHookContext;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [
                                                            4 /*yield*/,
                                                            config.preAPIHook(
                                                                __assign(__assign({}, context), {
                                                                    action: "VERIFY_EMAIL",
                                                                })
                                                            ),
                                                        ];
                                                    case 1:
                                                        postRecipeHookContext = _a.sent();
                                                        if (options === undefined || options.preAPIHook === undefined) {
                                                            return [2 /*return*/, postRecipeHookContext];
                                                        }
                                                        return [
                                                            2 /*return*/,
                                                            options.preAPIHook({
                                                                url: postRecipeHookContext.url,
                                                                requestInit: postRecipeHookContext.requestInit,
                                                            }),
                                                        ];
                                                }
                                            });
                                        });
                                    }
                                ),
                            ];
                        case 1:
                            (_b = _c.sent()), (json = _b.json), (fetchResponse = _b.fetchResponse);
                            if (json.status !== "OK" && json.status !== "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "CUSTOM_RESPONSE",
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            return [
                                2 /*return*/,
                                {
                                    status: json.status,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        isEmailVerified: function (_a) {
            var config = _a.config,
                options = _a.options;
            return __awaiter(this, void 0, void 0, function () {
                var _b, json, fetchResponse;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(EMAIL_VERIFY_PATH, {}, undefined, function (context) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var postRecipeHookContext;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    return [
                                                        4 /*yield*/,
                                                        config.preAPIHook(
                                                            __assign(__assign({}, context), {
                                                                action: "IS_EMAIL_VERIFIED",
                                                            })
                                                        ),
                                                    ];
                                                case 1:
                                                    postRecipeHookContext = _a.sent();
                                                    if (options === undefined || options.preAPIHook === undefined) {
                                                        return [2 /*return*/, postRecipeHookContext];
                                                    }
                                                    return [
                                                        2 /*return*/,
                                                        options.preAPIHook({
                                                            url: postRecipeHookContext.url,
                                                            requestInit: postRecipeHookContext.requestInit,
                                                        }),
                                                    ];
                                            }
                                        });
                                    });
                                }),
                            ];
                        case 1:
                            (_b = _c.sent()), (json = _b.json), (fetchResponse = _b.fetchResponse);
                            if (json.status !== "OK") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "CUSTOM_RESPONSE",
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            return [
                                2 /*return*/,
                                {
                                    status: "OK",
                                    isVerified: json.isVerified,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        sendVerificationEmail: function (_a) {
            var config = _a.config,
                options = _a.options;
            return __awaiter(this, void 0, void 0, function () {
                var _b, json, fetchResponse;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.post(SEND_VERIFY_EMAIL_PATH, {}, function (context) {
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var postRecipeHookContext;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    return [
                                                        4 /*yield*/,
                                                        config.preAPIHook(
                                                            __assign(__assign({}, context), {
                                                                action: "SEND_VERIFY_EMAIL",
                                                            })
                                                        ),
                                                    ];
                                                case 1:
                                                    postRecipeHookContext = _a.sent();
                                                    if (options === undefined || options.preAPIHook === undefined) {
                                                        return [2 /*return*/, postRecipeHookContext];
                                                    }
                                                    return [
                                                        2 /*return*/,
                                                        options.preAPIHook({
                                                            url: postRecipeHookContext.url,
                                                            requestInit: postRecipeHookContext.requestInit,
                                                        }),
                                                    ];
                                            }
                                        });
                                    });
                                }),
                            ];
                        case 1:
                            (_b = _c.sent()), (json = _b.json), (fetchResponse = _b.fetchResponse);
                            if (json.status !== "OK" && json.status !== "EMAIL_ALREADY_VERIFIED_ERROR") {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "CUSTOM_RESPONSE",
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                            }
                            return [
                                2 /*return*/,
                                {
                                    status: json.status,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
    };
}
exports.default = getRecipeImplementation;
