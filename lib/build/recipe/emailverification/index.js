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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailVerified = exports.sendVerificationEmail = exports.verifyEmail = exports.init = void 0;
var recipe_1 = require("./recipe");
var utils_1 = require("../../utils");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    RecipeWrapper.verifyEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.verifyEmail(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    RecipeWrapper.sendVerificationEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.sendVerificationEmail(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    RecipeWrapper.isEmailVerified = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.isEmailVerified(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    return RecipeWrapper;
})();
exports.default = RecipeWrapper;
var init = RecipeWrapper.init;
exports.init = init;
var verifyEmail = RecipeWrapper.verifyEmail;
exports.verifyEmail = verifyEmail;
var sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
exports.sendVerificationEmail = sendVerificationEmail;
var isEmailVerified = RecipeWrapper.isEmailVerified;
exports.isEmailVerified = isEmailVerified;
