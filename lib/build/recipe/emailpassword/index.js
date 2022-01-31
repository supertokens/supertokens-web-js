"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesEmailExist =
    exports.signIn =
    exports.signUp =
    exports.sendPasswordResetEmail =
    exports.submitNewPassword =
    exports.init =
        void 0;
var recipe_1 = require("./recipe");
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    RecipeWrapper.submitNewPassword = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.submitNewPassword(input);
    };
    RecipeWrapper.sendPasswordResetEmail = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.sendPasswordResetEmail(input);
    };
    RecipeWrapper.signUp = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.signUp(input);
    };
    RecipeWrapper.signIn = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.signIn(input);
    };
    RecipeWrapper.doesEmailExist = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImplementation.doesEmailExist(input);
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
