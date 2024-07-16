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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationClaimClass = void 0;
var dateProvider_1 = require("supertokens-website/utils/dateProvider");
var session_1 = require("../session");
var constants_1 = require("./constants");
function getThresholdAwareDefaultValue(defaultVal) {
    return Math.max(
        defaultVal,
        dateProvider_1.DateProviderReference.getReferenceOrThrow().dateProvider.getThresholdInSeconds()
    );
}
/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
var EmailVerificationClaimClass = /** @class */ (function (_super) {
    __extends(EmailVerificationClaimClass, _super);
    function EmailVerificationClaimClass(getRecipeImpl) {
        var _this =
            _super.call(this, {
                id: constants_1.EMAILVERIFICATION_CLAIM_ID,
                refresh: function (userContext) {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        getRecipeImpl().isEmailVerified({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
            }) || this;
        _this.validators = __assign(__assign({}, _this.validators), {
            isVerified: function (refetchTimeOnFalseInSeconds, maxAgeInSeconds) {
                return {
                    id: _this.id,
                    refresh: _this.refresh,
                    shouldRefresh: function (payload, userContext) {
                        var DateProvider = dateProvider_1.DateProviderReference.getReferenceOrThrow().dateProvider;
                        refetchTimeOnFalseInSeconds =
                            refetchTimeOnFalseInSeconds !== null && refetchTimeOnFalseInSeconds !== void 0
                                ? refetchTimeOnFalseInSeconds
                                : getThresholdAwareDefaultValue(10);
                        if (maxAgeInSeconds !== undefined && maxAgeInSeconds < DateProvider.getThresholdInSeconds()) {
                            throw new Error(
                                "maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                                    DateProvider.getThresholdInSeconds()
                                )
                            );
                        }
                        if (refetchTimeOnFalseInSeconds < DateProvider.getThresholdInSeconds()) {
                            throw new Error(
                                "refetchTimeOnFalseInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                                    DateProvider.getThresholdInSeconds()
                                )
                            );
                        }
                        var value = _this.getValueFromPayload(payload, userContext);
                        if (value === undefined) {
                            return true;
                        }
                        var currentTime = DateProvider.now();
                        var lastRefetchTime = _this.getLastFetchedTime(payload, userContext);
                        if (maxAgeInSeconds !== undefined) {
                            if (lastRefetchTime < currentTime - maxAgeInSeconds * 1000) {
                                return true;
                            }
                        }
                        if (value === false) {
                            if (lastRefetchTime < currentTime - refetchTimeOnFalseInSeconds * 1000) {
                                return true;
                            }
                        }
                        return false;
                    },
                    validate: function (payload, userContext) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var value;
                            return __generator(this, function (_a) {
                                value = this.getValueFromPayload(payload, userContext);
                                return [
                                    2 /*return*/,
                                    value === true
                                        ? { isValid: true }
                                        : {
                                              isValid: false,
                                              reason: {
                                                  message: "wrong value",
                                                  expectedValue: true,
                                                  actualValue: value,
                                              },
                                          },
                                ];
                            });
                        });
                    },
                };
            },
        });
        return _this;
    }
    return EmailVerificationClaimClass;
})(session_1.BooleanClaim);
exports.EmailVerificationClaimClass = EmailVerificationClaimClass;
