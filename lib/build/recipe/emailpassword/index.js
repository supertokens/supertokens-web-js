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
exports.signOut =
    exports.getTenantIdFromURL =
    exports.getResetPasswordTokenFromURL =
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
    RecipeWrapper.signOut = function (input) {
        return recipe_1.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    /**
     * Submit a new password for the user
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more)
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "RESET_PASSWORD_INVALID_TOKEN_ERROR"}` if the token in the URL is invalid
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the form field values are incorrect
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.submitNewPassword = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.submitNewPassword(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Send an email to the user for password reset
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more)
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.sendPasswordResetEmail = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.sendPasswordResetEmail(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Sign up a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param shouldTryLinkingWithSessionUser (OPTIONAL) Whether the backend should try to link the user to the session user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "SIGN_UP_NOT_ALLOWED"}` if the user can't sign up because of security reasons
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.signUp = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.signUp(
            __assign(__assign({}, input), {
                shouldTryLinkingWithSessionUser:
                    input === null || input === void 0 ? void 0 : input.shouldTryLinkingWithSessionUser,
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    /**
     * Sign in a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param shouldTryLinkingWithSessionUser (OPTIONAL) Whether the backend should try to link the user to the session user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "WRONG_CREDENTIALS_ERROR"}` if the credentials are invalid
     *
     * @returns `{status: "SIGN_IN_NOT_ALLOWED"}` if the user can't sign in because of security reasons
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.signIn = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.signIn(
            __assign(__assign({}, input), {
                shouldTryLinkingWithSessionUser:
                    input === null || input === void 0 ? void 0 : input.shouldTryLinkingWithSessionUser,
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    /**
     * Check if an email exists
     *
     * @param email The email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.doesEmailExist = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.doesEmailExist(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Reads and returns the reset password token from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "token" query parameter from the current location
     */
    RecipeWrapper.getResetPasswordTokenFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getResetPasswordTokenFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Reads and returns the tenant id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "tenantId" query parameter from the current location
     */
    RecipeWrapper.getTenantIdFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL(
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
var signOut = RecipeWrapper.signOut;
exports.signOut = signOut;
var getResetPasswordTokenFromURL = RecipeWrapper.getResetPasswordTokenFromURL;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
var getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;
exports.getTenantIdFromURL = getTenantIdFromURL;
