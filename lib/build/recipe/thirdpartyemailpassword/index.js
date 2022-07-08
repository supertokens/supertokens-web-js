"use strict";
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
exports.getAuthStateFromURL =
    exports.getAuthErrorFromURL =
    exports.getAuthCodeFromURL =
    exports.verifyAndGetStateOrThrowError =
    exports.generateStateToSendToOAuthProvider =
    exports.setStateAndOtherInfoToStorage =
    exports.getStateAndOtherInfoFromStorage =
    exports.getAuthorisationURLFromBackend =
    exports.getResetPasswordTokenFromURL =
    exports.signOut =
    exports.getAuthorisationURLWithQueryParamsAndSetState =
    exports.thirdPartySignInAndUp =
    exports.emailPasswordSignIn =
    exports.emailPasswordSignUp =
    exports.doesEmailExist =
    exports.sendPasswordResetEmail =
    exports.submitNewPassword =
    exports.init =
        void 0;
var utils_1 = require("../../utils");
var recipe_1 = require("./recipe");
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
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
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
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
     * Check if an email exists
     *
     * @param email The email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
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
     * Sign up a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.emailPasswordSignUp = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.emailPasswordSignUp(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Sign in a user with email and password
     *
     * @param formFields List of fields to send to the API exposed by the backend SDK (Refer to the {@link https://supertokens.com/docs/fdi API spec} to know more). Note that the form fields must match the ones configured in the backend SDKs
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     *
     * @returns `{status: "FIELD_ERROR", formFields}` if the formFields dont match the ones in the configured in the backend SDKs
     *
     * @returns `{status: "WRONG_CREDENTIALS_ERROR"}` if the credentials are invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    RecipeWrapper.emailPasswordSignIn = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.emailPasswordSignIn(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Reads and returns the reset password token from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
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
     * Get the URL to be used by the third party provider for redirecting after the auth flow
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", url}`
     */
    RecipeWrapper.getAuthorisationURLFromBackend = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.getAuthorisationURLFromBackend(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     */
    RecipeWrapper.thirdPartySignInAndUp = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.thirdPartySignInAndUp(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Get the current login state from storage, this is also used when calling signInUp
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns State object from storage
     */
    RecipeWrapper.getStateAndOtherInfoFromStorage = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getStateAndOtherInfoFromStorage(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Set the login state to storage
     *
     * @param state
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.setStateAndOtherInfoToStorage = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.setStateAndOtherInfoToStorage(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param authorisationURL The URL that should be used for redirection after the third party flow finishes. This is ignored if the backend has a pre-configured redirect_url
     *
     * @param providerClientId (OPTIONAL) Client id to be used for the third party provider
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     */
    RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Generate a new state that will be sent to the thirs party provider
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns string
     */
    RecipeWrapper.generateStateToSendToOAuthProvider = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.generateStateToSendToOAuthProvider(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Verify that the state recieved from the third party provider matches the one in storage
     *
     * @param stateForAuthProvider State recieved as query param after redirection from third party provider
     *
     * @param stateObjectFromStorage State object from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     */
    RecipeWrapper.verifyAndGetStateOrThrowError = function (input) {
        return recipe_1.default
            .getInstanceOrThrow()
            .recipeImplementation.verifyAndGetStateOrThrowError(
                __assign(__assign({}, input), { userContext: (0, utils_1.getNormalisedUserContext)(input.userContext) })
            );
    };
    /**
     * Returns the auth code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "code" query param from the current URL. Returns an empty string if no code exists
     */
    RecipeWrapper.getAuthCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getAuthCodeFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Returns the error from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "error" query param from the current URL. Returns undefined if no error exists
     */
    RecipeWrapper.getAuthErrorFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getAuthErrorFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /**
     * Returns the auth state from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/thirdpartyemailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "state" query param from the current URL. Returns an empty string if no state exists
     */
    RecipeWrapper.getAuthStateFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImplementation.getAuthStateFromURL(
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
var doesEmailExist = RecipeWrapper.doesEmailExist;
exports.doesEmailExist = doesEmailExist;
var emailPasswordSignUp = RecipeWrapper.emailPasswordSignUp;
exports.emailPasswordSignUp = emailPasswordSignUp;
var emailPasswordSignIn = RecipeWrapper.emailPasswordSignIn;
exports.emailPasswordSignIn = emailPasswordSignIn;
var thirdPartySignInAndUp = RecipeWrapper.thirdPartySignInAndUp;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
var getAuthorisationURLWithQueryParamsAndSetState = RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
var getResetPasswordTokenFromURL = RecipeWrapper.getResetPasswordTokenFromURL;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
var getAuthorisationURLFromBackend = RecipeWrapper.getAuthorisationURLFromBackend;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
var getStateAndOtherInfoFromStorage = RecipeWrapper.getStateAndOtherInfoFromStorage;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
var setStateAndOtherInfoToStorage = RecipeWrapper.setStateAndOtherInfoToStorage;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
var generateStateToSendToOAuthProvider = RecipeWrapper.generateStateToSendToOAuthProvider;
exports.generateStateToSendToOAuthProvider = generateStateToSendToOAuthProvider;
var verifyAndGetStateOrThrowError = RecipeWrapper.verifyAndGetStateOrThrowError;
exports.verifyAndGetStateOrThrowError = verifyAndGetStateOrThrowError;
var getAuthCodeFromURL = RecipeWrapper.getAuthCodeFromURL;
exports.getAuthCodeFromURL = getAuthCodeFromURL;
var getAuthErrorFromURL = RecipeWrapper.getAuthErrorFromURL;
exports.getAuthErrorFromURL = getAuthErrorFromURL;
var getAuthStateFromURL = RecipeWrapper.getAuthStateFromURL;
exports.getAuthStateFromURL = getAuthStateFromURL;
var signOut = RecipeWrapper.signOut;
exports.signOut = signOut;
