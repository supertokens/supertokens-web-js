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
                sendPasswordResetEmail,
                signIn,
                signOut,
                signUp,
                submitNewPassword,
            } = require("../../recipe/emailpassword");

            assert(init !== undefined && _default.init !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(getResetPasswordTokenFromURL !== undefined && _default.getResetPasswordTokenFromURL !== undefined);
            assert(sendPasswordResetEmail !== undefined && _default.sendPasswordResetEmail !== undefined);
            assert(signIn !== undefined && _default.signIn !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(signUp !== undefined && _default.signUp !== undefined);
            assert(submitNewPassword !== undefined && _default.submitNewPassword !== undefined);
        });
    });

    describe("Third Party", function () {
        it("Index", function () {
            let _default = require("../../recipe/thirdparty");
            let {
                init,
                getAuthorisationURLWithQueryParamsAndSetState,
                signInAndUp,
                signOut,
            } = require("../../recipe/thirdparty");

            assert(init !== undefined && _default.init !== undefined);
            assert(
                getAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(signInAndUp !== undefined && _default.signInAndUp !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
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
                getAuthorisationURLWithQueryParamsAndSetState,
                getResetPasswordTokenFromURL,
                signOut,
                submitNewPassword,
                thirdPartySignInAndUp,
            } = require("../../recipe/thirdpartyemailpassword");

            assert(init !== undefined && _default.init !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(emailPasswordSignIn !== undefined && _default.emailPasswordSignIn !== undefined);
            assert(emailPasswordSignUp !== undefined && _default.emailPasswordSignUp !== undefined);

            assert(
                getAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(getResetPasswordTokenFromURL !== undefined && _default.getResetPasswordTokenFromURL !== undefined);

            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(submitNewPassword !== undefined && _default.submitNewPassword !== undefined);
            assert(thirdPartySignInAndUp !== undefined && _default.thirdPartySignInAndUp !== undefined);
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
                getPasswordlessLinkCodeFromURL,
                getPasswordlessLoginAttemptInfo,
                getPasswordlessPreAuthSessionIdFromURL,
                getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
                getThirdPartyStateAndOtherInfoFromStorage,
                resendPasswordlessCode,
                setPasswordlessLoginAttemptInfo,
                signOut,
                thirdPartySignInAndUp,
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
                getPasswordlessLinkCodeFromURL !== undefined && _default.getPasswordlessLinkCodeFromURL !== undefined
            );
            assert(
                getPasswordlessLoginAttemptInfo !== undefined && _default.getPasswordlessLoginAttemptInfo !== undefined
            );
            assert(
                getPasswordlessPreAuthSessionIdFromURL !== undefined &&
                    _default.getPasswordlessPreAuthSessionIdFromURL !== undefined
            );
            assert(
                getThirdPartyAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getThirdPartyAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(
                getThirdPartyStateAndOtherInfoFromStorage !== undefined &&
                    _default.getThirdPartyStateAndOtherInfoFromStorage !== undefined
            );
            assert(resendPasswordlessCode !== undefined && _default.resendPasswordlessCode !== undefined);
            assert(
                setPasswordlessLoginAttemptInfo !== undefined && _default.setPasswordlessLoginAttemptInfo !== undefined
            );
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(thirdPartySignInAndUp !== undefined && _default.thirdPartySignInAndUp !== undefined);
        });
    });
});
