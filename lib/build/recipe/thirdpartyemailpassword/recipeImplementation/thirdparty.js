"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRecipeImplementation(originalImplementation) {
    return {
        getAuthorisationURLFromBackend:
            originalImplementation.getAuthorisationURLFromBackend.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getStateAndOtherInfoFromStorage.bind(originalImplementation),
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        setStateAndOtherInfoToStorage:
            originalImplementation.setStateAndOtherInfoToStorage.bind(originalImplementation),
        generateStateToSendToOAuthProvider:
            originalImplementation.generateStateToSendToOAuthProvider.bind(originalImplementation),
        getAuthCodeFromURL: originalImplementation.getAuthCodeFromURL.bind(originalImplementation),
        getAuthErrorFromURL: originalImplementation.getAuthErrorFromURL.bind(originalImplementation),
        getAuthStateFromURL: originalImplementation.getAuthStateFromURL.bind(originalImplementation),
        verifyAndGetStateOrThrowError:
            originalImplementation.verifyAndGetStateOrThrowError.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
    };
}
exports.default = getRecipeImplementation;
