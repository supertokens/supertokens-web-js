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
exports.doesEmailExist =
    exports.signIn =
    exports.signUp =
    exports.sendPasswordResetEmail =
    exports.submitNewPassword =
    exports.init =
        void 0;
var recipe_1 = require("./recipe");
var utils_1 = require("../../utils");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    RecipeWrapper.submitNewPassword = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.submitNewPassword(
            __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
        );
    };
    RecipeWrapper.sendPasswordResetEmail = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.sendPasswordResetEmail(
            __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
        );
    };
    RecipeWrapper.signUp = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.signUp(
            __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
        );
    };
    RecipeWrapper.signIn = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.signIn(
            __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
        );
    };
    RecipeWrapper.doesEmailExist = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.doesEmailExist(
            __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
        );
    };
    return RecipeWrapper;
})();
exports.default = RecipeWrapper;
var init = RecipeWrapper.init;
exports.init = init;
var submitNewPassword = RecipeWrapper.submitNewPassword;
exports.submitNewPassword = submitNewPassword;
var sendPasswordResetEmail = RecipeWrapper.sendPasswordResetEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
var signUp = RecipeWrapper.signUp;
exports.signUp = signUp;
var signIn = RecipeWrapper.signIn;
exports.signIn = signIn;
var doesEmailExist = RecipeWrapper.doesEmailExist;
exports.doesEmailExist = doesEmailExist;
