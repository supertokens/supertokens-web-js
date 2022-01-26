"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailVerified = exports.sendVerificationEmail = exports.verifyEmail = exports.init = void 0;
var recipe_1 = require("./recipe");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    RecipeWrapper.verifyEmail = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.verifyEmail({
            token: input.token,
            options: input.options,
            config: recipeInstance.config,
            userContext: input.userContext === undefined ? {} : input.userContext,
        });
    };
    RecipeWrapper.sendVerificationEmail = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.sendVerificationEmail({
            options: input.options,
            config: recipeInstance.config,
            userContext: input.userContext === undefined ? {} : input.userContext,
        });
    };
    RecipeWrapper.isEmailVerified = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.isEmailVerified({
            options: input.options,
            config: recipeInstance.config,
            userContext: input.userContext === undefined ? {} : input.userContext,
        });
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
