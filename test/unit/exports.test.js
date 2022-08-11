import assert from "assert";
import SuperTokens from "../../lib/build/supertokens";

describe("Exports", function () {
    beforeEach(function () {
        SuperTokens.reset();
    });

    describe("Email Verification", function () {
        it("Index", function () {
            let _default = require("../../recipe/emailverification");
            let {
                init,
                verifyEmail,
                sendVerificationEmail,
                getEmailVerificationTokenFromURL,
                isEmailVerified,
            } = require("../../recipe/emailverification");

            assert(init !== undefined && _default.init !== undefined);
            assert(verifyEmail !== undefined && _default.verifyEmail !== undefined);
            assert(sendVerificationEmail !== undefined && _default.sendVerificationEmail !== undefined);
            assert(
                getEmailVerificationTokenFromURL !== undefined &&
                    _default.getEmailVerificationTokenFromURL !== undefined
            );
            assert(isEmailVerified !== undefined && _default.isEmailVerified !== undefined);
        });
    });

    describe("Email Password", function () {
        it("Index", function () {
            let _default = require("../../recipe/emailpassword");
            let {
                init,
                doesEmailExist,
                getResetPasswordTokenFromURL,
                isEmailVerified,
                sendPasswordResetEmail,
                sendVerificationEmail,
                signIn,
                signOut,
                signUp,
                submitNewPassword,
                verifyEmail,
            } = require("../../recipe/emailpassword");

            assert(init !== undefined && _default.init !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(getResetPasswordTokenFromURL !== undefined && _default.getResetPasswordTokenFromURL !== undefined);
            assert(isEmailVerified !== undefined && _default.isEmailVerified !== undefined);
            assert(sendPasswordResetEmail !== undefined && _default.sendPasswordResetEmail !== undefined);
            assert(sendVerificationEmail !== undefined && _default.sendVerificationEmail !== undefined);
            assert(signIn !== undefined && _default.signIn !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(signUp !== undefined && _default.signUp !== undefined);
            assert(submitNewPassword !== undefined && _default.submitNewPassword !== undefined);
            assert(verifyEmail !== undefined && _default.verifyEmail !== undefined);
        });
    });

    describe("Third Party", function () {
        it("Index", function () {
            let _default = require("../../recipe/thirdparty");
            let {
                init,
                generateStateToSendToOAuthProvider,
                getAuthCodeFromURL,
                getAuthErrorFromURL,
                getAuthStateFromURL,
                getAuthorisationURLFromBackend,
                getAuthorisationURLWithQueryParamsAndSetState,
                getStateAndOtherInfoFromStorage,
                isEmailVerified,
                sendVerificationEmail,
                setStateAndOtherInfoToStorage,
                signInAndUp,
                signOut,
                verifyAndGetStateOrThrowError,
                verifyEmail,
            } = require("../../recipe/thirdparty");

            assert(init !== undefined && _default.init !== undefined);
            assert(
                generateStateToSendToOAuthProvider !== undefined &&
                    _default.generateStateToSendToOAuthProvider !== undefined
            );
            assert(getAuthCodeFromURL !== undefined && _default.getAuthCodeFromURL !== undefined);
            assert(getAuthErrorFromURL !== undefined && _default.getAuthErrorFromURL !== undefined);
            assert(getAuthStateFromURL !== undefined && _default.getAuthStateFromURL !== undefined);
            assert(
                getAuthorisationURLFromBackend !== undefined && _default.getAuthorisationURLFromBackend !== undefined
            );
            assert(
                getAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(
                getStateAndOtherInfoFromStorage !== undefined && _default.getStateAndOtherInfoFromStorage !== undefined
            );
            assert(isEmailVerified !== undefined && _default.isEmailVerified !== undefined);
            assert(sendVerificationEmail !== undefined && _default.sendVerificationEmail !== undefined);
            assert(setStateAndOtherInfoToStorage !== undefined && _default.setStateAndOtherInfoToStorage !== undefined);
            assert(signInAndUp !== undefined && _default.signInAndUp !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(verifyAndGetStateOrThrowError !== undefined && _default.verifyAndGetStateOrThrowError !== undefined);
            assert(verifyEmail !== undefined && _default.verifyEmail !== undefined);
        });
    });

    describe("Third Party Email Password", function () {
        it("Index", function () {
            let _default = require("../../recipe/thirdpartyemailpassword");
            let {
                init,
                doesEmailExist,
                emailPasswordSignIn,
                emailPasswordSignUp,
                generateStateToSendToOAuthProvider,
                getAuthCodeFromURL,
                getAuthErrorFromURL,
                getAuthStateFromURL,
                getAuthorisationURLFromBackend,
                getAuthorisationURLWithQueryParamsAndSetState,
                getResetPasswordTokenFromURL,
                getStateAndOtherInfoFromStorage,
                isEmailVerified,
                sendPasswordResetEmail,
                sendVerificationEmail,
                setStateAndOtherInfoToStorage,
                signOut,
                submitNewPassword,
                thirdPartySignInAndUp,
                verifyAndGetStateOrThrowError,
                verifyEmail,
            } = require("../../recipe/thirdpartyemailpassword");

            assert(init !== undefined && _default.init !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(emailPasswordSignIn !== undefined && _default.emailPasswordSignIn !== undefined);
            assert(emailPasswordSignUp !== undefined && _default.emailPasswordSignUp !== undefined);
            assert(
                generateStateToSendToOAuthProvider !== undefined &&
                    _default.generateStateToSendToOAuthProvider !== undefined
            );
            assert(getAuthCodeFromURL !== undefined && _default.getAuthCodeFromURL !== undefined);
            assert(getAuthErrorFromURL !== undefined && _default.getAuthErrorFromURL !== undefined);
            assert(getAuthStateFromURL !== undefined && _default.getAuthStateFromURL !== undefined);
            assert(
                getAuthorisationURLFromBackend !== undefined && _default.getAuthorisationURLFromBackend !== undefined
            );
            assert(
                getAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(getResetPasswordTokenFromURL !== undefined && _default.getResetPasswordTokenFromURL !== undefined);
            assert(
                getStateAndOtherInfoFromStorage !== undefined && _default.getStateAndOtherInfoFromStorage !== undefined
            );
            assert(isEmailVerified !== undefined && _default.isEmailVerified !== undefined);
            assert(sendPasswordResetEmail !== undefined && _default.sendPasswordResetEmail !== undefined);
            assert(sendVerificationEmail !== undefined && _default.sendVerificationEmail !== undefined);
            assert(setStateAndOtherInfoToStorage !== undefined && _default.setStateAndOtherInfoToStorage !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(submitNewPassword !== undefined && _default.submitNewPassword !== undefined);
            assert(thirdPartySignInAndUp !== undefined && _default.thirdPartySignInAndUp !== undefined);
            assert(verifyAndGetStateOrThrowError !== undefined && _default.verifyAndGetStateOrThrowError !== undefined);
            assert(verifyEmail !== undefined && _default.verifyEmail !== undefined);
        });
    });

    describe("Passwordless", function () {
        it("Utils", function () {
            let _default = require("../../recipe/passwordless/utils");
            let { consumeCode, createCode, resendCode } = require("../../recipe/passwordless/utils");

            assert(createCode !== undefined && _default.createCode !== undefined);
            assert(consumeCode !== undefined && _default.consumeCode !== undefined);
            assert(resendCode !== undefined && _default.resendCode !== undefined);
        });

        it("Index", function () {
            let _default = require("../../recipe/passwordless");
            let {
                consumeCode,
                createCode,
                doesEmailExist,
                doesPhoneNumberExist,
                clearLoginAttemptInfo,
                getLinkCodeFromURL,
                getLoginAttemptInfo,
                getPreAuthSessionIdFromURL,
                resendCode,
                init,
                setLoginAttemptInfo,
                signOut,
            } = require("../../recipe/passwordless");

            assert(consumeCode !== undefined && _default.consumeCode !== undefined);
            assert(createCode !== undefined && _default.createCode !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(doesPhoneNumberExist !== undefined && _default.doesPhoneNumberExist !== undefined);
            assert(clearLoginAttemptInfo !== undefined && _default.clearLoginAttemptInfo !== undefined);
            assert(getLinkCodeFromURL !== undefined && _default.getLinkCodeFromURL !== undefined);
            assert(getLoginAttemptInfo !== undefined && _default.getLoginAttemptInfo !== undefined);
            assert(getPreAuthSessionIdFromURL !== undefined && _default.getPreAuthSessionIdFromURL !== undefined);
            assert(resendCode !== undefined && _default.resendCode !== undefined);
            assert(init !== undefined && _default.init !== undefined);
            assert(setLoginAttemptInfo !== undefined && _default.setLoginAttemptInfo !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
        });
    });

    describe("Third Party Passwordless", function () {
        it("Index", function () {
            let _default = require("../../recipe/thirdpartypasswordless");
            let {
                init,
                clearPasswordlessLoginAttemptInfo,
                consumePasswordlessCode,
                createPasswordlessCode,
                doesPasswordlessUserEmailExist,
                doesPasswordlessUserPhoneNumberExist,
                generateThirdPartyStateToSendToOAuthProvider,
                getAuthorisationURLFromBackend,
                getPasswordlessLinkCodeFromURL,
                getPasswordlessLoginAttemptInfo,
                getPasswordlessPreAuthSessionIdFromURL,
                getThirdPartyAuthCodeFromURL,
                getThirdPartyAuthErrorFromURL,
                getThirdPartyAuthStateFromURL,
                getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
                getThirdPartyStateAndOtherInfoFromStorage,
                isEmailVerified,
                resendPasswordlessCode,
                sendVerificationEmail,
                setPasswordlessLoginAttemptInfo,
                setThirdPartyStateAndOtherInfoToStorage,
                signOut,
                thirdPartySignInAndUp,
                verifyAndGetThirdPartyStateOrThrowError,
                verifyEmail,
            } = require("../../recipe/thirdpartypasswordless");

            assert(init !== undefined && _default.init !== undefined);
            assert(
                clearPasswordlessLoginAttemptInfo !== undefined &&
                    _default.clearPasswordlessLoginAttemptInfo !== undefined
            );
            assert(consumePasswordlessCode !== undefined && _default.consumePasswordlessCode !== undefined);
            assert(createPasswordlessCode !== undefined && _default.createPasswordlessCode !== undefined);
            assert(
                doesPasswordlessUserEmailExist !== undefined && _default.doesPasswordlessUserEmailExist !== undefined
            );
            assert(
                doesPasswordlessUserPhoneNumberExist !== undefined &&
                    _default.doesPasswordlessUserPhoneNumberExist !== undefined
            );
            assert(
                generateThirdPartyStateToSendToOAuthProvider !== undefined &&
                    _default.generateThirdPartyStateToSendToOAuthProvider !== undefined
            );
            assert(
                getAuthorisationURLFromBackend !== undefined && _default.getAuthorisationURLFromBackend !== undefined
            );
            assert(
                getPasswordlessLinkCodeFromURL !== undefined && _default.getPasswordlessLinkCodeFromURL !== undefined
            );
            assert(
                getPasswordlessLoginAttemptInfo !== undefined && _default.getPasswordlessLoginAttemptInfo !== undefined
            );
            assert(
                getPasswordlessPreAuthSessionIdFromURL !== undefined &&
                    _default.getPasswordlessPreAuthSessionIdFromURL !== undefined
            );
            assert(getThirdPartyAuthCodeFromURL !== undefined && _default.getThirdPartyAuthCodeFromURL !== undefined);
            assert(getThirdPartyAuthErrorFromURL !== undefined && _default.getThirdPartyAuthErrorFromURL !== undefined);
            assert(getThirdPartyAuthStateFromURL !== undefined && _default.getThirdPartyAuthStateFromURL !== undefined);
            assert(
                getThirdPartyAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getThirdPartyAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(
                getThirdPartyStateAndOtherInfoFromStorage !== undefined &&
                    _default.getThirdPartyStateAndOtherInfoFromStorage !== undefined
            );
            assert(isEmailVerified !== undefined && _default.isEmailVerified !== undefined);
            assert(resendPasswordlessCode !== undefined && _default.resendPasswordlessCode !== undefined);
            assert(sendVerificationEmail !== undefined && _default.sendVerificationEmail !== undefined);
            assert(
                setPasswordlessLoginAttemptInfo !== undefined && _default.setPasswordlessLoginAttemptInfo !== undefined
            );
            assert(
                setThirdPartyStateAndOtherInfoToStorage !== undefined &&
                    _default.setThirdPartyStateAndOtherInfoToStorage !== undefined
            );
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(thirdPartySignInAndUp !== undefined && _default.thirdPartySignInAndUp !== undefined);
            assert(
                verifyAndGetThirdPartyStateOrThrowError !== undefined &&
                    _default.verifyAndGetThirdPartyStateOrThrowError !== undefined
            );
            assert(verifyEmail !== undefined && _default.verifyEmail !== undefined);
        });
    });
});
