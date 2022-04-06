"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRecipeImplementation(originalImplementation) {
    return {
        getAuthorisationURLFromBackend:
            originalImplementation.getAuthorisationURLFromBackend.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getThirdPartyStateAndOtherInfoFromStorage.bind(originalImplementation),
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        setStateAndOtherInfoToStorage:
            originalImplementation.setThirdPartyStateAndOtherInfoToStorage.bind(originalImplementation),
        generateStateToSendToOAuthProvider:
            originalImplementation.generateThirdPartyStateToSendToOAuthProvider.bind(originalImplementation),
        getAuthCodeFromURL: originalImplementation.getThirdPartyAuthCodeFromURL.bind(originalImplementation),
        getAuthErrorFromURL: originalImplementation.getThirdPartyAuthErrorFromURL.bind(originalImplementation),
        getAuthStateFromURL: originalImplementation.getThirdPartyAuthStateFromURL.bind(originalImplementation),
        verifyAndGetStateOrThrowError:
            originalImplementation.verifyAndGetThirdPartyStateOrThrowError.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
    };
}
exports.default = getRecipeImplementation;
