"use strict";
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
exports.MultiFactorAuthClaimClass = void 0;
var utils_1 = require("./utils");
/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
var MultiFactorAuthClaimClass = /** @class */ (function () {
    function MultiFactorAuthClaimClass(getRecipeImpl) {
        var _this = this;
        this.getRecipeImpl = getRecipeImpl;
        this.id = "st-mfa";
        this.validators = {
            hasCompletedMFARequirementsForAuth: function () {
                return {
                    id: _this.id,
                    refresh: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.refresh.apply(_this, args);
                    },
                    shouldRefresh: function (payload, userContext) {
                        var val = _this.getValueFromPayload(payload, userContext);
                        return val === undefined;
                    },
                    validate: function (payload, userContext) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var val;
                            return __generator(this, function (_a) {
                                val = this.getValueFromPayload(payload, userContext);
                                if (val === undefined) {
                                    return [
                                        2 /*return*/,
                                        {
                                            isValid: false,
                                            reason: {
                                                message: "MFA info not available in payload",
                                            },
                                        },
                                    ];
                                }
                                if (val.v) {
                                    return [
                                        2 /*return*/,
                                        {
                                            isValid: true,
                                        },
                                    ];
                                }
                                return [
                                    2 /*return*/,
                                    {
                                        isValid: false,
                                        reason: {
                                            message: "not all required factors have been completed",
                                        },
                                    },
                                ];
                            });
                        });
                    },
                };
            },
            hasCompletedFactors: function (requirements) {
                return {
                    id: _this.id,
                    shouldRefresh: function (payload, userContext) {
                        var val = _this.getValueFromPayload(payload, userContext);
                        return val === undefined;
                    },
                    refresh: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return _this.refresh.apply(_this, args);
                    },
                    validate: function (payload, userContext) {
                        var val = _this.getValueFromPayload(payload, userContext);
                        if (val === undefined) {
                            return {
                                isValid: false,
                                reason: {
                                    message: "MFA info not available in payload",
                                },
                            };
                        }
                        var completedFactors = val.c;
                        for (var _i = 0, requirements_1 = requirements; _i < requirements_1.length; _i++) {
                            var req = requirements_1[_i];
                            if (typeof req === "object" && "oneOf" in req) {
                                var res = req.oneOf
                                    .map(function (r) {
                                        return (0, utils_1.checkFactorRequirement)(r, completedFactors);
                                    })
                                    .filter(function (v) {
                                        return v.isValid === false;
                                    });
                                if (res.length === req.oneOf.length) {
                                    return {
                                        isValid: false,
                                        reason: {
                                            message: "All factor checkers failed in the list",
                                            oneOf: req.oneOf,
                                            failures: res,
                                        },
                                    };
                                }
                            } else if (typeof req === "object" && "allOfInAnyOrder" in req) {
                                var res = req.allOfInAnyOrder
                                    .map(function (r) {
                                        return (0, utils_1.checkFactorRequirement)(r, completedFactors);
                                    })
                                    .filter(function (v) {
                                        return v.isValid === false;
                                    });
                                if (res.length !== 0) {
                                    return {
                                        isValid: false,
                                        reason: {
                                            message: "Some factor checkers failed in the list",
                                            allOfInAnyOrder: req.allOfInAnyOrder,
                                            failures: res,
                                        },
                                    };
                                }
                            } else {
                                var res = (0, utils_1.checkFactorRequirement)(req, completedFactors);
                                if (res.isValid !== true) {
                                    return {
                                        isValid: false,
                                        reason: {
                                            message: "Factor validation failed: " + res.message,
                                            factorId: res.id,
                                        },
                                    };
                                }
                            }
                        }
                        return {
                            isValid: true,
                        };
                    },
                };
            },
        };
    }
    MultiFactorAuthClaimClass.prototype.refresh = function (userContext) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.getRecipeImpl().resyncSessionAndFetchMFAInfo(userContext)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MultiFactorAuthClaimClass.prototype.getValueFromPayload = function (payload, _userContext) {
        if (payload[this.id] === undefined) {
            return undefined;
        }
        return {
            c: payload[this.id].c,
            v: payload[this.id].v,
        };
    };
    MultiFactorAuthClaimClass.prototype.getLastFetchedTime = function (payload, _userContext) {
        var _a;
        return (_a = payload[this.id]) === null || _a === void 0 ? void 0 : _a.t;
    };
    return MultiFactorAuthClaimClass;
})();
exports.MultiFactorAuthClaimClass = MultiFactorAuthClaimClass;
