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
exports.EmailVerificationClaimClass =
    exports.EmailVerificationClaim =
    exports.getTenantIdFromURL =
    exports.getEmailVerificationTokenFromURL =
    exports.isEmailVerified =
    exports.sendVerificationEmail =
    exports.verifyEmail =
    exports.init =
        void 0;
var recipe_1 = require("./recipe");
var utils_1 = require("../../utils");
var emailVerificationClaim_1 = require("./emailVerificationClaim");
Object.defineProperty(exports, "EmailVerificationClaimClass", {
    enumerable: true,
    get: function () {
        return emailVerificationClaim_1.EmailVerificationClaimClass;
    },
});
var RecipeWrapper = /** @class */ (function () {
    function RecipeWrapper() {}
    RecipeWrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    /**
     * Verify an email
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"}` if token is invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.verifyEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.verifyEmail(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Send an email to the user for verification.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_ALREADY_VERIFIED_ERROR"}` if the email has already been verified
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.sendVerificationEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.sendVerificationEmail(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Check if an email has been verified
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", isVerified: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.isEmailVerified = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.isEmailVerified(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    RecipeWrapper.getEmailVerificationTokenFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getEmailVerificationTokenFromURL(
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
    RecipeWrapper.EmailVerificationClaim = recipe_1.default.EmailVerificationClaim;
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
var getEmailVerificationTokenFromURL = RecipeWrapper.getEmailVerificationTokenFromURL;
exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
var getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;
exports.getTenantIdFromURL = getTenantIdFromURL;
var EmailVerificationClaim = RecipeWrapper.EmailVerificationClaim;
exports.EmailVerificationClaim = EmailVerificationClaim;
