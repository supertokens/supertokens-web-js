"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRecipeImplementation(originalImplementation) {
    return {
        doesEmailExist: originalImplementation.doesEmailExist.bind(originalImplementation),
        sendPasswordResetEmail: originalImplementation.sendPasswordResetEmail.bind(originalImplementation),
        submitNewPassword: originalImplementation.submitNewPassword.bind(originalImplementation),
        getResetPasswordTokenFromURL: originalImplementation.getResetPasswordTokenFromURL.bind(originalImplementation),
        signIn: originalImplementation.emailPasswordSignIn.bind(originalImplementation),
        signUp: originalImplementation.emailPasswordSignUp.bind(originalImplementation),
    };
}
exports.default = getRecipeImplementation;
