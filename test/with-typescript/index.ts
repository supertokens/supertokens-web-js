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

/**
 * with-typescript allows unused variables. This is because we specifically want to read
 * variables and check for types, for example in post API hooks
 *
 * const url: string = context.url;
 *
 * The above line will make sure that the context object has a `url` property and it is of type string,
 * but building this file would normally fail because of the variable being unused
 *
 * The differences in tsconfig for with-typescript compared to the main project:
 * - noUnusedLocals is set to false
 */
import { SuperTokensConfig, AppInfoUserInput, CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import SuperTokens from "../../";
import {
    RecipeInterface as EmailVerificationRecipeInterface,
    PreAndPostAPIHookAction as EmailVerificationAction,
    UserInput as EmailVerificationUserInput,
} from "../../recipe/emailverification/types";
import EmailVerification, { EmailVerificationClaim } from "../../recipe/emailverification";
import {
    RecipeInterface as EmailPasswordRecipeInterface,
    PreAndPostAPIHookAction as EmailPasswordAction,
    UserInput as EmailPasswordUserInput,
} from "../../recipe/emailpassword/types";
import EmailPassword from "../../recipe/emailpassword";
import {
    RecipeInterface as ThirdPartyRecipeInterface,
    PreAndPostAPIHookAction as ThirdPartyAction,
    UserInput as ThirdPartyUserInput,
} from "../../recipe/thirdparty/types";
import ThirdParty from "../../recipe/thirdparty";
import {
    RecipeInterface as TPEPRecipeInterface,
    PreAndPostAPIHookAction as TPEPPartyAction,
    UserInput as TPEPPartyUserInput,
} from "../../recipe/thirdpartyemailpassword/types";
import ThirdPartyEmailPassword from "../../recipe/thirdpartyemailpassword";
import {
    RecipeInterface as PasswordlessRecipeInterface,
    PreAndPostAPIHookAction as PasswordlessAction,
    UserInput as PasswordlessUserInput,
    PasswordlessFlowType,
} from "../../recipe/passwordless/types";
import Passwordless from "../../recipe/passwordless";
import {
    RecipeInterface as TPPRecipeInterface,
    PreAndPostAPIHookAction as TPPlessAction,
    UserInput as TPPUserInput,
} from "../../recipe/thirdpartypasswordless";
import ThirdPartyPasswordless from "../../recipe/thirdpartypasswordless";
import { RecipeInterface as SessionRecipeInterface, UserInput as SessionUserInput } from "../../recipe/session/types";
import Session from "../../recipe/session";
import STGeneralError from "../../utils/error";
import NormalisedURLDomain from "../../utils/normalisedURLDomain";
import NormalisedURLPath from "../../utils/normalisedURLPath";
import {
    RecipePostAPIHookContext,
    RecipePostAPIHookFunction,
    RecipePreAPIHookContext,
    RecipePreAPIHookFunction,
} from "../../recipe/recipeModule/types";
import { Recipe as EmailVerificationRecipe } from "../../recipe/emailverification/recipe";
import { getRecipeImplementation as EmailVerificationRecipeImplementation } from "../../recipe/emailverification/recipeImplementation";
import EmailVerificationUtils from "../../recipe/emailverification/utils";
import { Recipe as EmailPasswordRecipe } from "../../recipe/emailpassword/recipe";
import { getRecipeImplementation as EmailPasswordRecipeImplementation } from "../../recipe/emailpassword/recipeImplementation";
import EmailPasswordUtils from "../../recipe/emailpassword/utils";
import { Recipe as ThirdPartyRecipe } from "../../recipe/thirdparty/recipe";
import { getRecipeImplementation as ThirdPartyRecipeImplementation } from "../../recipe/thirdparty/recipeImplementation";
import ThirdPartyUtils from "../../recipe/thirdparty/utils";
import { Recipe as TPEPRecipe } from "../../recipe/thirdpartyemailpassword/recipe";
import { getRecipeImplementation as TPEPRecipeImplementation } from "../../recipe/thirdpartyemailpassword/recipeImplementation";
import TPEPUtils from "../../recipe/thirdpartyemailpassword/utils";
import { Recipe as PasswordlessRecipe } from "../../recipe/passwordless/recipe";
import { getRecipeImplementation as PasswordlessRecipeImplementation } from "../../recipe/passwordless/recipeImplementation";
import PasswordlessUtils from "../../recipe/passwordless/utils";
import { Recipe as TPPRecipe } from "../../recipe/thirdpartypasswordless/recipe";
import { getRecipeImplementation as TPPRecipeImplementation } from "../../recipe/thirdpartypasswordless/recipeImplementation";
import TPPUtils from "../../recipe/thirdpartypasswordless/utils";
import { WindowHandlerInput, WindowHandlerInterface } from "../../utils/windowHandler/types";
import { CookieHandlerInput, CookieHandlerInterface } from "../../utils/cookieHandler/types";
import { BooleanClaim, PrimitiveClaim, SessionClaimValidator } from "../../recipe/session";
import { PermissionClaim, UserRoleClaim } from "../../recipe/userroles";
import { CookieHandlerReference } from "../../utils/cookieHandler";
import { WindowHandlerReference } from "../../utils/windowHandler";

// Email verification init
function getEmailVerificationFunctions(original: EmailVerificationRecipeInterface): EmailVerificationRecipeInterface {
    return {
        verifyEmail: async function (input) {
            return original.verifyEmail(input);
        },
        sendVerificationEmail: async function (input) {
            return original.sendVerificationEmail(input);
        },
        isEmailVerified: async function (input) {
            return original.isEmailVerified(input);
        },
        getEmailVerificationTokenFromURL: function (input) {
            return original.getEmailVerificationTokenFromURL(input);
        },
    };
}

const emailVerificationPreAPIHook: RecipePreAPIHookFunction<EmailVerificationAction> = async function (
    context: RecipePreAPIHookContext<EmailVerificationAction>
) {
    if (context.action === "IS_EMAIL_VERIFIED") {
        //
    } else if (context.action === "SEND_VERIFY_EMAIL") {
        //
    } else if (context.action === "VERIFY_EMAIL") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const requestInit: RequestInit = context.requestInit;

    return {
        requestInit: context.requestInit,
        url: context.url,
    };
};

const emailVerificationPostAPIHook: RecipePostAPIHookFunction<EmailVerificationAction> = async function (
    context: RecipePostAPIHookContext<EmailVerificationAction>
) {
    if (context.action === "IS_EMAIL_VERIFIED") {
        //
    } else if (context.action === "SEND_VERIFY_EMAIL") {
        //
    } else if (context.action === "VERIFY_EMAIL") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const fetchResponse: Response = context.fetchResponse;
    const requestInit: RequestInit = context.requestInit;
};

function getEmailverification(): CreateRecipeFunction<EmailVerificationAction> {
    const config: EmailVerificationUserInput = {
        override: {
            functions: getEmailVerificationFunctions,
        },
        preAPIHook: emailVerificationPreAPIHook,
        postAPIHook: emailVerificationPostAPIHook,
    };

    return EmailVerification.init(config);
}

// Email password init
function getEmailPasswordFunctions(original: EmailPasswordRecipeInterface): EmailPasswordRecipeInterface {
    return {
        doesEmailExist: async function (input) {
            return original.doesEmailExist(input);
        },
        getResetPasswordTokenFromURL: function (input) {
            return original.getResetPasswordTokenFromURL(input);
        },
        sendPasswordResetEmail: async function (input) {
            return original.sendPasswordResetEmail(input);
        },
        submitNewPassword: async function (input) {
            return original.submitNewPassword(input);
        },
        signIn: async function (input) {
            return original.signIn(input);
        },
        signUp: async function (input) {
            return original.signUp(input);
        },
    };
}

const emailPasswordPreAPIHook: RecipePreAPIHookFunction<EmailPasswordAction> = async function (
    context: RecipePreAPIHookContext<EmailPasswordAction>
) {
    if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
        //
    } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
        //
    } else if (context.action === "SUBMIT_NEW_PASSWORD") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const requestInit: RequestInit = context.requestInit;

    return {
        requestInit: context.requestInit,
        url: context.url,
    };
};

const emailPasswordPostAPIHook: RecipePostAPIHookFunction<EmailPasswordAction> = async function (
    context: RecipePostAPIHookContext<EmailPasswordAction>
) {
    if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
        //
    } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
        //
    } else if (context.action === "SUBMIT_NEW_PASSWORD") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const fetchResponse: Response = context.fetchResponse;
    const requestInit: RequestInit = context.requestInit;
};

function getEmailPassword(): CreateRecipeFunction<EmailPasswordAction> {
    const config: EmailPasswordUserInput = {
        override: {
            functions: getEmailPasswordFunctions,
        },
        preAPIHook: emailPasswordPreAPIHook,
        postAPIHook: emailPasswordPostAPIHook,
    };

    return EmailPassword.init(config);
}

// Thirdparty init

function getThirdPartyFunctions(original: ThirdPartyRecipeInterface): ThirdPartyRecipeInterface {
    return {
        generateStateToSendToOAuthProvider: function (input) {
            return original.generateStateToSendToOAuthProvider(input);
        },
        getAuthCodeFromURL: function (input) {
            return original.getAuthCodeFromURL(input);
        },
        getAuthErrorFromURL: function (input) {
            return original.getAuthErrorFromURL(input);
        },
        getAuthStateFromURL: function (input) {
            return original.getAuthStateFromURL(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return original.getAuthorisationURLFromBackend(input);
        },
        getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return original.getAuthorisationURLWithQueryParamsAndSetState(input);
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return original.getStateAndOtherInfoFromStorage(input);
        },
        setStateAndOtherInfoToStorage: async function (input) {
            return original.setStateAndOtherInfoToStorage(input);
        },
        signInAndUp: async function (input) {
            return original.signInAndUp(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return original.verifyAndGetStateOrThrowError(input);
        },
    };
}

const thirdPartyPreAPIHook: RecipePreAPIHookFunction<ThirdPartyAction> = async function (
    context: RecipePreAPIHookContext<ThirdPartyAction>
) {
    if (context.action === "GET_AUTHORISATION_URL") {
        //
    } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const requestInit: RequestInit = context.requestInit;

    return {
        requestInit: context.requestInit,
        url: context.url,
    };
};

const thirdPartyPostAPIHook: RecipePostAPIHookFunction<ThirdPartyAction> = async function (
    context: RecipePostAPIHookContext<ThirdPartyAction>
) {
    if (context.action === "GET_AUTHORISATION_URL") {
        //
    } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const fetchResponse: Response = context.fetchResponse;
    const requestInit: RequestInit = context.requestInit;
};

function getThirdParty(): CreateRecipeFunction<ThirdPartyAction> {
    const config: ThirdPartyUserInput = {
        override: {
            functions: getThirdPartyFunctions,
        },
        preAPIHook: thirdPartyPreAPIHook,
        postAPIHook: thirdPartyPostAPIHook,
    };

    return ThirdParty.init(config);
}

// Third party email password init

function getThirdPartyEmailPasswordFunctions(original: TPEPRecipeInterface): TPEPRecipeInterface {
    return {
        doesEmailExist: async function (input) {
            return original.doesEmailExist(input);
        },
        emailPasswordSignIn: async function (input) {
            return original.emailPasswordSignIn(input);
        },
        emailPasswordSignUp: async function (input) {
            return original.emailPasswordSignUp(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return original.generateStateToSendToOAuthProvider(input);
        },
        getAuthCodeFromURL: function (input) {
            return original.getAuthCodeFromURL(input);
        },
        getAuthErrorFromURL: function (input) {
            return original.getAuthErrorFromURL(input);
        },
        getAuthStateFromURL: function (input) {
            return original.getAuthStateFromURL(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return original.getAuthorisationURLFromBackend(input);
        },
        getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return original.getAuthorisationURLWithQueryParamsAndSetState(input);
        },
        getResetPasswordTokenFromURL: function (input) {
            return original.getResetPasswordTokenFromURL(input);
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return original.getStateAndOtherInfoFromStorage(input);
        },
        setStateAndOtherInfoToStorage: async function (input) {
            return original.setStateAndOtherInfoToStorage(input);
        },
        sendPasswordResetEmail: async function (input) {
            return original.sendPasswordResetEmail(input);
        },
        submitNewPassword: async function (input) {
            return original.submitNewPassword(input);
        },
        thirdPartySignInAndUp: async function (input) {
            return original.thirdPartySignInAndUp(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return original.verifyAndGetStateOrThrowError(input);
        },
    };
}

const tpepPreAPIHook: RecipePreAPIHookFunction<TPEPPartyAction> = async function (
    context: RecipePreAPIHookContext<TPEPPartyAction>
) {
    if (context.action === "GET_AUTHORISATION_URL") {
        //
    } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
        //
    } else if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
        //
    } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
        //
    } else if (context.action === "SUBMIT_NEW_PASSWORD") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const requestInit: RequestInit = context.requestInit;

    return {
        requestInit: context.requestInit,
        url: context.url,
    };
};

const tpepPostAPIHook: RecipePostAPIHookFunction<TPEPPartyAction> = async function (
    context: RecipePostAPIHookContext<TPEPPartyAction>
) {
    if (context.action === "GET_AUTHORISATION_URL") {
        //
    } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
        //
    } else if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
        //
    } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
        //
    } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
        //
    } else if (context.action === "SUBMIT_NEW_PASSWORD") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const fetchResponse: Response = context.fetchResponse;
    const requestInit: RequestInit = context.requestInit;
};

function getThirdPartyEmailPassword(): CreateRecipeFunction<TPEPPartyAction> {
    const config: TPEPPartyUserInput = {
        override: {
            functions: getThirdPartyEmailPasswordFunctions,
        },
        preAPIHook: tpepPreAPIHook,
        postAPIHook: tpepPostAPIHook,
    };

    return ThirdPartyEmailPassword.init(config);
}

// Passwordless Init

function getPasswordlessFunctions(original: PasswordlessRecipeInterface): PasswordlessRecipeInterface {
    return {
        createCode: async function (input) {
            return original.createCode(input);
        },
        resendCode: async function (input) {
            return original.resendCode(input);
        },
        consumeCode: async function (input) {
            return original.consumeCode(input);
        },
        doesEmailExist: async function (input) {
            return original.doesEmailExist(input);
        },
        doesPhoneNumberExist: async function (input) {
            return original.doesPhoneNumberExist(input);
        },
        getLoginAttemptInfo: async function (input) {
            return original.getLoginAttemptInfo(input);
        },
        setLoginAttemptInfo: async function (input) {
            return original.setLoginAttemptInfo(input);
        },
        clearLoginAttemptInfo: async function (input) {
            return original.clearLoginAttemptInfo(input);
        },
        getLinkCodeFromURL: function (input) {
            return original.getLinkCodeFromURL(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return original.getPreAuthSessionIdFromURL(input);
        },
    };
}

const passwordlessPreAPIHook: RecipePreAPIHookFunction<PasswordlessAction> = async function (
    context: RecipePreAPIHookContext<PasswordlessAction>
) {
    if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
        //
    } else if (context.action === "PHONE_NUMBER_EXISTS") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const requestInit: RequestInit = context.requestInit;

    return {
        requestInit: context.requestInit,
        url: context.url,
    };
};

const passwordlessPostAPIHook: RecipePostAPIHookFunction<PasswordlessAction> = async function (
    context: RecipePostAPIHookContext<PasswordlessAction>
) {
    if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
        //
    } else if (context.action === "PHONE_NUMBER_EXISTS") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const fetchResponse: Response = context.fetchResponse;
    const requestInit: RequestInit = context.requestInit;
};

function getPasswordless(): CreateRecipeFunction<PasswordlessAction> {
    const config: PasswordlessUserInput = {
        override: {
            functions: getPasswordlessFunctions,
        },
        preAPIHook: passwordlessPreAPIHook,
        postAPIHook: passwordlessPostAPIHook,
    };

    return Passwordless.init(config);
}

// Third party passwordless init

function getThirdPartyPasswordlessFunctions(original: TPPRecipeInterface): TPPRecipeInterface {
    return {
        createPasswordlessCode: async function (input) {
            return original.createPasswordlessCode(input);
        },
        resendPasswordlessCode: async function (input) {
            return original.resendPasswordlessCode(input);
        },
        consumePasswordlessCode: async function (input) {
            return original.consumePasswordlessCode(input);
        },
        getPasswordlessLoginAttemptInfo: async function (input) {
            return original.getPasswordlessLoginAttemptInfo(input);
        },
        setPasswordlessLoginAttemptInfo: async function (input) {
            return original.setPasswordlessLoginAttemptInfo(input);
        },
        clearPasswordlessLoginAttemptInfo: async function (input) {
            return original.clearPasswordlessLoginAttemptInfo(input);
        },
        doesPasswordlessUserEmailExist: async function (input) {
            return original.doesPasswordlessUserEmailExist(input);
        },
        doesPasswordlessUserPhoneNumberExist: async function (input) {
            return original.doesPasswordlessUserPhoneNumberExist(input);
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return original.generateThirdPartyStateToSendToOAuthProvider(input);
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return original.verifyAndGetThirdPartyStateOrThrowError(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return original.getAuthorisationURLFromBackend(input);
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return original.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input);
        },
        setThirdPartyStateAndOtherInfoToStorage: async function (input) {
            return original.setThirdPartyStateAndOtherInfoToStorage(input);
        },
        thirdPartySignInAndUp: async function (input) {
            return original.thirdPartySignInAndUp(input);
        },
        getPasswordlessLinkCodeFromURL: function (input) {
            return original.getPasswordlessLinkCodeFromURL(input);
        },
        getPasswordlessPreAuthSessionIdFromURL: function (input) {
            return original.getPasswordlessPreAuthSessionIdFromURL(input);
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return original.getThirdPartyAuthCodeFromURL(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return original.getThirdPartyAuthErrorFromURL(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return original.getThirdPartyAuthStateFromURL(input);
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return original.getThirdPartyStateAndOtherInfoFromStorage(input);
        },
    };
}

const tppPreAPIHook: RecipePreAPIHookFunction<TPPlessAction> = async function (
    context: RecipePreAPIHookContext<TPPlessAction>
) {
    if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
        //
    } else if (context.action === "PHONE_NUMBER_EXISTS") {
        //
    } else if (context.action === "GET_AUTHORISATION_URL") {
        //
    } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
        //
    } else if (context.action === "IS_EMAIL_VERIFIED") {
        //
    } else if (context.action === "SEND_VERIFY_EMAIL") {
        //
    } else if (context.action === "VERIFY_EMAIL") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const requestInit: RequestInit = context.requestInit;

    return {
        requestInit: context.requestInit,
        url: context.url,
    };
};

const tppPostAPIHook: RecipePostAPIHookFunction<TPPlessAction> = async function (
    context: RecipePostAPIHookContext<TPPlessAction>
) {
    if (context.action === "EMAIL_EXISTS") {
        //
    } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
        //
    } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
        //
    } else if (context.action === "PHONE_NUMBER_EXISTS") {
        //
    } else if (context.action === "GET_AUTHORISATION_URL") {
        //
    } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
        //
    } else if (context.action === "IS_EMAIL_VERIFIED") {
        //
    } else if (context.action === "SEND_VERIFY_EMAIL") {
        //
    } else if (context.action === "VERIFY_EMAIL") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const fetchResponse: Response = context.fetchResponse;
    const requestInit: RequestInit = context.requestInit;
};

function getThirdPartyPasswordless(): CreateRecipeFunction<TPPlessAction> {
    const config: TPPUserInput = {
        override: {
            functions: getThirdPartyPasswordlessFunctions,
        },
        preAPIHook: tppPreAPIHook,
        postAPIHook: tppPostAPIHook,
    };

    return ThirdPartyPasswordless.init(config);
}

// Session init

function getSessionFunctions(original: SessionRecipeInterface): SessionRecipeInterface {
    return {
        signOut: async function (input) {
            return original.signOut(input);
        },
        addAxiosInterceptors: function (input) {
            return original.addAxiosInterceptors(input);
        },
        addXMLHttpRequestInterceptor: function (input) {
            return original.addXMLHttpRequestInterceptor(input);
        },
        addFetchInterceptorsAndReturnModifiedFetch: function (input) {
            return original.addFetchInterceptorsAndReturnModifiedFetch(input);
        },
        doesSessionExist: async function (input) {
            return original.doesSessionExist(input);
        },
        getAccessTokenPayloadSecurely: async function (input) {
            return original.getAccessTokenPayloadSecurely(input);
        },
        getUserId: async function (input) {
            return original.getUserId(input);
        },
        getInvalidClaimsFromResponse: async function (input) {
            return original.getInvalidClaimsFromResponse(input);
        },
        getGlobalClaimValidators: function (input) {
            return original.getGlobalClaimValidators(input);
        },
        validateClaims: async function (input) {
            return original.validateClaims(input);
        },
    };
}

const sessionPreAPIHook: RecipePreAPIHookFunction<"SIGN_OUT" | "REFRESH_SESSION"> = async function (
    context: RecipePreAPIHookContext<"SIGN_OUT" | "REFRESH_SESSION">
) {
    if (context.action === "REFRESH_SESSION") {
        //
    } else if (context.action === "SIGN_OUT") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const requestInit: RequestInit = context.requestInit;

    return {
        requestInit: context.requestInit,
        url: context.url,
    };
};

const sessionPostAPIHook: RecipePostAPIHookFunction<"SIGN_OUT" | "REFRESH_SESSION"> = async function (
    context: RecipePostAPIHookContext<"SIGN_OUT" | "REFRESH_SESSION">
) {
    if (context.action === "REFRESH_SESSION") {
        //
    } else if (context.action === "SIGN_OUT") {
        //
    }

    if (context.userContext === undefined) {
        //
    }

    const url: string = context.url;
    const fetchResponse: Response = context.fetchResponse;
    const requestInit: RequestInit = context.requestInit;
};

function getSession(): CreateRecipeFunction<"SIGN_OUT" | "REFRESH_SESSION"> {
    const config: SessionUserInput = {
        sessionTokenFrontendDomain: undefined,
        sessionExpiredStatusCode: undefined,
        autoAddCredentials: undefined,
        sessionTokenBackendDomain: undefined,
        isInIframe: undefined,
        onHandleEvent: function (event) {
            if (event.action === "REFRESH_SESSION") {
                //
            } else if (event.action === "SESSION_CREATED") {
                //
            } else if (event.action === "SIGN_OUT") {
                //
            } else if (event.action === "UNAUTHORISED") {
                //
            } else if (event.action === "API_INVALID_CLAIM") {
                //
            }

            if (event.userContext === undefined) {
                //
            }
        },
        override: {
            functions: getSessionFunctions,
        },
        preAPIHook: sessionPreAPIHook,
        postAPIHook: async function (context) {
            if (context.action === "REFRESH_SESSION") {
                //
            } else if (context.action === "SIGN_OUT") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return Session.init(config);
}

// SuperTokens init
const appInfo: AppInfoUserInput = {
    apiDomain: "http://localhost:8080",
    appName: "SuperTokens",
    apiBasePath: "/auth",
    apiGatewayPath: "/",
};

const recipeList: CreateRecipeFunction<any>[] = [
    getEmailverification(),
    getEmailPassword(),
    getThirdParty(),
    getThirdPartyEmailPassword(),
    getPasswordless(),
    getThirdPartyPasswordless(),
    getSession(),
];

const windowHandlerInput: WindowHandlerInput = (original: WindowHandlerInterface) => {
    return {
        getDocument: () => {
            return document;
        },
        localStorage: {
            clear: async () => {
                return window.localStorage.clear();
            },
            clearSync: () => {
                return window.localStorage.clear();
            },
            getItem: async (key: string) => {
                return window.localStorage.getItem(key);
            },
            getItemSync: (key: string) => {
                return window.localStorage.getItem(key);
            },
            key: async (index: number) => {
                return window.localStorage.key(index);
            },
            keySync: (index: number) => {
                return window.localStorage.key(index);
            },
            removeItem: async (key: string) => {
                return window.localStorage.removeItem(key);
            },
            removeItemSync: (key: string) => {
                return window.localStorage.removeItem(key);
            },
            setItem: async (key: string, value: string) => {
                return window.localStorage.setItem(key, value);
            },
            setItemSync: (key: string, value: string) => {
                return window.localStorage.setItem(key, value);
            },
        },
        sessionStorage: {
            clear: async () => {
                return window.localStorage.clear();
            },
            clearSync: () => {
                return window.localStorage.clear();
            },
            getItem: async (key: string) => {
                return window.localStorage.getItem(key);
            },
            getItemSync: (key: string) => {
                return window.localStorage.getItem(key);
            },
            key: async (index: number) => {
                return window.localStorage.key(index);
            },
            keySync: (index: number) => {
                return window.localStorage.key(index);
            },
            removeItem: async (key: string) => {
                return window.localStorage.removeItem(key);
            },
            removeItemSync: (key: string) => {
                return window.localStorage.removeItem(key);
            },
            setItem: async (key: string, value: string) => {
                return window.localStorage.setItem(key, value);
            },
            setItemSync: (key: string, value: string) => {
                return window.localStorage.setItem(key, value);
            },
        },
        history: {
            ...original.history,
            getState: () => {
                return window.history.state;
            },
            replaceState: (data: any, unused: string, url?: string | null | undefined) => {
                window.history.replaceState(data, unused, url);
            },
        },
        location: {
            ...original.location,
            assign: (url: string | URL) => {
                window.location.assign(url);
            },
            getHash: () => {
                return window.location.hash;
            },
            getHostName: () => {
                return window.location.hostname;
            },
            getHref: () => {
                return window.location.href;
            },
            getOrigin: () => {
                return window.location.origin;
            },
            getPathName: () => {
                return window.location.pathname;
            },
            getSearch: () => {
                return window.location.pathname;
            },
            setHref: (newHref: string) => {
                window.location.href = newHref;
            },
        },
        getWindowUnsafe: () => window,
    };
};

const cookieHandlerInput: CookieHandlerInput = (original: CookieHandlerInterface) => {
    return {
        ...original,
        getCookie: async function () {
            return document.cookie;
        },
        setCookie: async function (newCookie: string) {
            document.cookie = newCookie;
        },
    };
};

const config: SuperTokensConfig = {
    appInfo,
    recipeList,
    windowHandler: windowHandlerInput,
    cookieHandler: cookieHandlerInput,
};

SuperTokens.init(config);

// General

const error: any = {};

if (STGeneralError.isThisError(error)) {
    const message: string = error.message;
}

const normalisedAppInfo: NormalisedAppInfo = {
    appName: "",
    apiDomain: new NormalisedURLDomain(""),
    apiBasePath: new NormalisedURLPath(""),
};

const evId: string = EmailVerificationRecipe.RECIPE_ID;
EmailVerificationRecipe.init();
EmailVerificationRecipe.getInstanceOrThrow();
EmailVerificationRecipe.reset();

EmailVerificationUtils.normaliseUserInput({
    appInfo: normalisedAppInfo,
    recipeId: evId,
    override: {
        functions: getEmailVerificationFunctions,
    },
    preAPIHook: emailVerificationPreAPIHook,
    postAPIHook: emailVerificationPostAPIHook,
});

EmailVerificationRecipeImplementation({
    appInfo: normalisedAppInfo,
    postAPIHook: emailVerificationPostAPIHook,
    preAPIHook: emailVerificationPreAPIHook,
    recipeId: evId,
});

const epId: string = EmailPasswordRecipe.RECIPE_ID;
EmailPasswordRecipe.init();
EmailPasswordRecipe.getInstanceOrThrow();
EmailPasswordRecipe.reset();

EmailPasswordUtils.normaliseUserInput({
    appInfo: normalisedAppInfo,
    recipeId: epId,
    override: {
        functions: getEmailPasswordFunctions,
    },
    preAPIHook: emailPasswordPreAPIHook,
    postAPIHook: emailPasswordPostAPIHook,
});

EmailPasswordRecipeImplementation({
    appInfo: normalisedAppInfo,
    postAPIHook: emailPasswordPostAPIHook,
    preAPIHook: emailPasswordPreAPIHook,
    recipeId: epId,
});

const tpId: string = ThirdPartyRecipe.RECIPE_ID;
ThirdPartyRecipe.init();
ThirdPartyRecipe.getInstanceOrThrow();
ThirdPartyRecipe.reset();

ThirdPartyUtils.normaliseUserInput({
    appInfo: normalisedAppInfo,
    recipeId: tpId,
    override: {
        functions: getThirdPartyFunctions,
    },
    preAPIHook: thirdPartyPreAPIHook,
    postAPIHook: thirdPartyPostAPIHook,
});

ThirdPartyRecipeImplementation({
    appInfo: normalisedAppInfo,
    postAPIHook: thirdPartyPostAPIHook,
    preAPIHook: thirdPartyPreAPIHook,
    recipeId: tpId,
});

const tpepId: string = TPEPRecipe.RECIPE_ID;
TPEPRecipe.init();
TPEPRecipe.getInstanceOrThrow();
TPEPRecipe.reset();

TPEPUtils.normaliseUserInput({
    appInfo: normalisedAppInfo,
    recipeId: tpepId,
    override: {
        functions: getThirdPartyEmailPasswordFunctions,
    },
    preAPIHook: tpepPreAPIHook,
    postAPIHook: tpepPostAPIHook,
});

TPEPRecipeImplementation({
    appInfo: normalisedAppInfo,
    postAPIHook: tpepPostAPIHook,
    preAPIHook: tpepPreAPIHook,
    recipeId: tpepId,
});

const passwordlessId: string = PasswordlessRecipe.RECIPE_ID;
PasswordlessRecipe.init();
PasswordlessRecipe.getInstanceOrThrow();
PasswordlessRecipe.reset();

PasswordlessUtils.normaliseUserInput({
    appInfo: normalisedAppInfo,
    recipeId: passwordlessId,
    override: {
        functions: getPasswordlessFunctions,
    },
    preAPIHook: passwordlessPreAPIHook,
    postAPIHook: passwordlessPostAPIHook,
});

const passwordlessRecipeImplementation = PasswordlessRecipeImplementation({
    appInfo: normalisedAppInfo,
    postAPIHook: passwordlessPostAPIHook,
    preAPIHook: passwordlessPreAPIHook,
    recipeId: passwordlessId,
});

PasswordlessUtils.consumeCode({
    userInputCode: "",
    recipeImplementation: passwordlessRecipeImplementation,
});

PasswordlessUtils.createCode({
    email: "",
    recipeImplementation: passwordlessRecipeImplementation,
    phoneNumber: "",
});

PasswordlessUtils.resendCode({
    recipeImplementation: passwordlessRecipeImplementation,
});

const tppId: string = TPPRecipe.RECIPE_ID;
TPPRecipe.init();
TPPRecipe.getInstanceOrThrow();
TPPRecipe.reset();

TPPUtils.normaliseUserInput({
    appInfo: normalisedAppInfo,
    recipeId: passwordlessId,
    override: {
        functions: getThirdPartyPasswordlessFunctions,
    },
    preAPIHook: tppPreAPIHook,
    postAPIHook: tppPostAPIHook,
});

TPPRecipeImplementation({
    appInfo: normalisedAppInfo,
    postAPIHook: tppPostAPIHook,
    preAPIHook: tppPreAPIHook,
    recipeId: tppId,
});

/**
 * Calling recipe functions exported from recipe/index files
 */

// Email Verificiation
EmailVerification.verifyEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
EmailVerification.verifyEmail(undefined);
EmailVerification.verifyEmail();

EmailVerification.isEmailVerified({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
EmailVerification.isEmailVerified(undefined);
EmailVerification.isEmailVerified();

EmailVerification.sendVerificationEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
EmailVerification.sendVerificationEmail(undefined);
EmailVerification.sendVerificationEmail();

EmailVerification.getEmailVerificationTokenFromURL({
    userContext: undefined,
});
EmailVerification.getEmailVerificationTokenFromURL(undefined);
EmailVerification.getEmailVerificationTokenFromURL();

// Email password
EmailPassword.doesEmailExist({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
EmailPassword.doesEmailExist();
// @ts-expect-error
EmailPassword.doesEmailExist(undefined);

EmailPassword.getResetPasswordTokenFromURL({
    userContext: undefined,
});
EmailPassword.getResetPasswordTokenFromURL(undefined);
EmailPassword.getResetPasswordTokenFromURL();

EmailPassword.sendPasswordResetEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
//@ts-expect-error
EmailPassword.sendPasswordResetEmail(undefined);
//@ts-expect-error
EmailPassword.sendPasswordResetEmail();

EmailPassword.signIn({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.signIn(undefined);
// @ts-expect-error
EmailPassword.signIn();

EmailPassword.signOut({
    userContext: undefined,
});
EmailPassword.signOut(undefined);
EmailPassword.signOut();

EmailPassword.signUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.signUp(undefined);
// @ts-expect-error
EmailPassword.signUp();

EmailPassword.submitNewPassword({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.submitNewPassword(undefined);
// @ts-expect-error
EmailPassword.submitNewPassword();

// Passwordless
Passwordless.clearLoginAttemptInfo({
    userContext: undefined,
});
Passwordless.clearLoginAttemptInfo(undefined);
Passwordless.clearLoginAttemptInfo();

Passwordless.consumeCode({
    userInputCode: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.consumeCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
Passwordless.consumeCode(undefined);
Passwordless.consumeCode();

Passwordless.createCode({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.createCode({
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.createCode({
    email: "",
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
Passwordless.createCode(undefined);
// @ts-expect-error
Passwordless.createCode();

Passwordless.doesEmailExist({
    email: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
Passwordless.doesEmailExist(undefined);
// @ts-expect-error
Passwordless.doesEmailExist();

Passwordless.doesPhoneNumberExist({
    phoneNumber: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
Passwordless.doesPhoneNumberExist(undefined);
// @ts-expect-error
Passwordless.doesPhoneNumberExist();

Passwordless.getLinkCodeFromURL({
    userContext: undefined,
});
Passwordless.getLinkCodeFromURL(undefined);
Passwordless.getLinkCodeFromURL();

async function getLoginAttemptInfo() {
    // @ts-expect-error
    const incorrectCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await Passwordless.getLoginAttemptInfo<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const correctCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await Passwordless.getLoginAttemptInfo<{
        customData: string;
    }>(undefined);

    const defaultType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          }
        | undefined = await Passwordless.getLoginAttemptInfo();
}

Passwordless.getPreAuthSessionIdFromURL({
    userContext: undefined,
});
Passwordless.getPreAuthSessionIdFromURL(undefined);
Passwordless.getPreAuthSessionIdFromURL();

Passwordless.resendCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
Passwordless.resendCode(undefined);
Passwordless.resendCode();

Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    // @ts-expect-error
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        // @ts-expect-error
        customData: 123,
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        customData: "",
    },
    userContext: undefined,
});
// @ts-expect-error
Passwordless.setLoginAttemptInfo(undefined);
// @ts-expect-error
Passwordless.setLoginAttemptInfo();

Passwordless.signOut({
    userContext: undefined,
});
Passwordless.signOut(undefined);
Passwordless.signOut();

// Third party
ThirdParty.generateStateToSendToOAuthProvider({
    userContext: undefined,
});
ThirdParty.generateStateToSendToOAuthProvider(undefined);
ThirdParty.generateStateToSendToOAuthProvider();

ThirdParty.getAuthCodeFromURL({
    userContext: undefined,
});
ThirdParty.getAuthCodeFromURL(undefined);
ThirdParty.getAuthCodeFromURL();

ThirdParty.getAuthErrorFromURL({
    userContext: undefined,
});
ThirdParty.getAuthErrorFromURL(undefined);
ThirdParty.getAuthErrorFromURL();

ThirdParty.getAuthStateFromURL({
    userContext: undefined,
});
ThirdParty.getAuthStateFromURL(undefined);
ThirdParty.getAuthStateFromURL();

ThirdParty.getAuthorisationURLFromBackend({
    providerId: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
ThirdParty.getAuthorisationURLFromBackend(undefined);
// @ts-expect-error
ThirdParty.getAuthorisationURLFromBackend();

ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    providerClientId: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
ThirdParty.getAuthorisationURLWithQueryParamsAndSetState(undefined);
// @ts-expect-error
ThirdParty.getAuthorisationURLWithQueryParamsAndSetState();

function getStateAndOtherInfoFromStorage() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdParty.getStateAndOtherInfoFromStorage<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdParty.getStateAndOtherInfoFromStorage<{
        customData: string;
    }>(undefined);

    const defaultType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
          }
        | undefined = ThirdParty.getStateAndOtherInfoFromStorage();
}

ThirdParty.setStateAndOtherInfoToStorage({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdParty.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdParty.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    // @ts-expect-error
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
    },
});
ThirdParty.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdParty.signInAndUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdParty.signInAndUp(undefined);
ThirdParty.signInAndUp();

ThirdParty.signOut({
    userContext: undefined,
});
ThirdParty.signOut(undefined);
ThirdParty.signOut();

ThirdParty.verifyAndGetStateOrThrowError({
    userContext: undefined,
    stateFromAuthProvider: "",
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdParty.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    userContext: undefined,
    stateFromAuthProvider: "",
    // @ts-expect-error
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdParty.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    userContext: undefined,
    stateFromAuthProvider: "",
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdParty.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    userContext: undefined,
    stateFromAuthProvider: "",
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 0,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
        customData: "",
    },
});

// TPEP
ThirdPartyEmailPassword.doesEmailExist({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
ThirdPartyEmailPassword.doesEmailExist(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.doesEmailExist();

ThirdPartyEmailPassword.emailPasswordSignIn({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignIn(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignIn();

ThirdPartyEmailPassword.emailPasswordSignUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignUp(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.emailPasswordSignUp();

ThirdPartyEmailPassword.generateStateToSendToOAuthProvider({
    userContext: undefined,
});
ThirdPartyEmailPassword.generateStateToSendToOAuthProvider(undefined);
ThirdPartyEmailPassword.generateStateToSendToOAuthProvider();

ThirdPartyEmailPassword.getAuthCodeFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getAuthCodeFromURL(undefined);
ThirdPartyEmailPassword.getAuthCodeFromURL();

ThirdPartyEmailPassword.getAuthErrorFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getAuthErrorFromURL(undefined);
ThirdPartyEmailPassword.getAuthErrorFromURL();

ThirdPartyEmailPassword.getAuthStateFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getAuthStateFromURL(undefined);
ThirdPartyEmailPassword.getAuthStateFromURL();

ThirdPartyEmailPassword.getAuthorisationURLFromBackend({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    providerId: "",
});
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLFromBackend(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLFromBackend();

ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    options: {
        preAPIHook: undefined,
    },
    providerClientId: "",
    userContext: undefined,
});
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState();

ThirdPartyEmailPassword.getResetPasswordTokenFromURL({
    userContext: undefined,
});
ThirdPartyEmailPassword.getResetPasswordTokenFromURL(undefined);
ThirdPartyEmailPassword.getResetPasswordTokenFromURL();

function tpepgetStateAndOtherInfoFromStorage() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyEmailPassword.getStateAndOtherInfoFromStorage<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyEmailPassword.getStateAndOtherInfoFromStorage<{
        customData: string;
    }>({
        userContext: undefined,
    });

    const defaultType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
          }
        | undefined = ThirdPartyEmailPassword.getStateAndOtherInfoFromStorage({
        userContext: undefined,
    });
}

ThirdPartyEmailPassword.sendPasswordResetEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.sendPasswordResetEmail(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.sendPasswordResetEmail();

ThirdPartyEmailPassword.setStateAndOtherInfoToStorage({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdPartyEmailPassword.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    // @ts-expect-error
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});
ThirdPartyEmailPassword.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdPartyEmailPassword.setStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdPartyEmailPassword.signOut({
    userContext: undefined,
});
ThirdPartyEmailPassword.signOut(undefined);
ThirdPartyEmailPassword.signOut();

ThirdPartyEmailPassword.submitNewPassword({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
ThirdPartyEmailPassword.submitNewPassword(undefined);
// @ts-expect-error
ThirdPartyEmailPassword.submitNewPassword();

ThirdPartyEmailPassword.thirdPartySignInAndUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyEmailPassword.thirdPartySignInAndUp(undefined);
ThirdPartyEmailPassword.thirdPartySignInAndUp();

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    // @ts-expect-error
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});

ThirdPartyEmailPassword.verifyAndGetStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

// TPP
ThirdPartyPasswordless.clearPasswordlessLoginAttemptInfo({
    userContext: undefined,
});
ThirdPartyPasswordless.clearPasswordlessLoginAttemptInfo(undefined);
ThirdPartyPasswordless.clearPasswordlessLoginAttemptInfo();

ThirdPartyPasswordless.consumePasswordlessCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    userInputCode: "",
});
ThirdPartyPasswordless.consumePasswordlessCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});

ThirdPartyPasswordless.createPasswordlessCode({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
ThirdPartyPasswordless.createPasswordlessCode({
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
ThirdPartyPasswordless.createPasswordlessCode({
    email: "",
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});

ThirdPartyPasswordless.doesPasswordlessUserEmailExist({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    email: "",
});

ThirdPartyPasswordless.doesPasswordlessUserPhoneNumberExist({
    userContext: undefined,
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
});

ThirdPartyPasswordless.generateThirdPartyStateToSendToOAuthProvider({
    userContext: undefined,
});
ThirdPartyPasswordless.generateThirdPartyStateToSendToOAuthProvider(undefined);
ThirdPartyPasswordless.generateThirdPartyStateToSendToOAuthProvider();

ThirdPartyPasswordless.getAuthorisationURLFromBackend({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    providerId: "",
});

ThirdPartyPasswordless.getPasswordlessLinkCodeFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getPasswordlessLinkCodeFromURL(undefined);
ThirdPartyPasswordless.getPasswordlessLinkCodeFromURL();

async function getPasswordlessLoginAttemptInfo() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await ThirdPartyPasswordless.getPasswordlessLoginAttemptInfo<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await ThirdPartyPasswordless.getPasswordlessLoginAttemptInfo<{
        customData: string;
    }>({
        userContext: undefined,
    });

    const defaultType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          }
        | undefined = await ThirdPartyPasswordless.getPasswordlessLoginAttemptInfo({
        userContext: undefined,
    });
}

ThirdPartyPasswordless.getPasswordlessPreAuthSessionIdFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getPasswordlessPreAuthSessionIdFromURL(undefined);
ThirdPartyPasswordless.getPasswordlessPreAuthSessionIdFromURL();

ThirdPartyPasswordless.getThirdPartyAuthCodeFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthCodeFromURL(undefined);
ThirdPartyPasswordless.getThirdPartyAuthCodeFromURL();

ThirdPartyPasswordless.getThirdPartyAuthErrorFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthErrorFromURL(undefined);
ThirdPartyPasswordless.getThirdPartyAuthErrorFromURL();

ThirdPartyPasswordless.getThirdPartyAuthStateFromURL({
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthStateFromURL(undefined);
ThirdPartyPasswordless.getThirdPartyAuthStateFromURL();

ThirdPartyPasswordless.getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    options: {
        preAPIHook: undefined,
    },
    providerClientId: "",
    userContext: undefined,
});
ThirdPartyPasswordless.getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
    authorisationURL: "",
    providerId: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});

function tppgetThirdPartyStateAndOtherInfoFromStorage() {
    // @ts-expect-error
    const invalidCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyPasswordless.getThirdPartyStateAndOtherInfoFromStorage<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const validCustomType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
              customData: string;
          }
        | undefined = ThirdPartyPasswordless.getThirdPartyStateAndOtherInfoFromStorage<{
        customData: string;
    }>({
        userContext: undefined,
    });

    const defaultType:
        | {
              expiresAt: number;
              providerId: string;
              authorisationURL: string;
              stateForAuthProvider: string;
              providerClientId?: string;
          }
        | undefined = ThirdPartyPasswordless.getThirdPartyStateAndOtherInfoFromStorage({
        userContext: undefined,
    });
}

ThirdPartyPasswordless.resendPasswordlessCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyPasswordless.resendPasswordlessCode(undefined);
ThirdPartyPasswordless.resendPasswordlessCode();

ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "MAGIC_LINK",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo<{
    customData: string;
}>({
    // @ts-expect-error
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        // @ts-expect-error
        customData: 123,
    },
    userContext: undefined,
});
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        customData: "",
    },
    userContext: undefined,
});
// @ts-expect-error
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo(undefined);
// @ts-expect-error
ThirdPartyPasswordless.setPasswordlessLoginAttemptInfo();

ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});
ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    // @ts-expect-error
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});
ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});
ThirdPartyPasswordless.setThirdPartyStateAndOtherInfoToStorage<{
    customData: string;
}>({
    userContext: undefined,
    state: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

ThirdPartyPasswordless.signOut({
    userContext: undefined,
});
ThirdPartyPasswordless.signOut(undefined);
ThirdPartyPasswordless.signOut();

ThirdPartyPasswordless.thirdPartySignInAndUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdPartyPasswordless.thirdPartySignInAndUp(undefined);
ThirdPartyPasswordless.thirdPartySignInAndUp();

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        providerClientId: "",
    },
});

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    // @ts-expect-error
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
    },
});

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        // @ts-expect-error
        customData: 123,
    },
});

ThirdPartyPasswordless.verifyAndGetThirdPartyStateOrThrowError<{
    customData: string;
}>({
    stateFromAuthProvider: "",
    userContext: undefined,
    stateObjectFromStorage: {
        authorisationURL: "",
        expiresAt: 123,
        providerId: "",
        stateForAuthProvider: "",
        customData: "",
    },
});

class TestBoolClaimWithCustomValidators extends BooleanClaim {
    constructor() {
        super({
            id: "custom",
            refresh: async () => {
                console.log("refresh...");
            },
        });

        this.validators = {
            ...this.validators,
            custVal: (minTimeStamp: number) => ({
                id: "test1-v1",
                refresh: this.refresh,
                shouldRefresh: (payload: any) => payload[this.id] === undefined || payload[this.id].t <= minTimeStamp,
                validate: () => ({ isValid: true }),
            }),
        };
    }

    validators!: BooleanClaim["validators"] & { custVal: (minTimeStamp: number) => SessionClaimValidator };
}

const customClaimInstance = new TestBoolClaimWithCustomValidators();

const TestPrimitiveClaim = new PrimitiveClaim<number>({
    id: "test2",
    refresh: async (ctx) => {
        if (ctx) {
            ctx.refreshCalled = 1;
        }
    },
});

const primitiveValidator = TestPrimitiveClaim.validators.hasValue(321, 600);

Session.validateClaims({
    overrideGlobalClaimValidators: () => [primitiveValidator, customClaimInstance.validators.custVal(1)],
});

Session.validateClaims({
    overrideGlobalClaimValidators: (globalClaimValidators) => [
        ...globalClaimValidators,
        primitiveValidator,
        customClaimInstance.validators.custVal(1),
        UserRoleClaim.validators.excludes("admin", 15),
        PermissionClaim.validators.includesAll(["support", "moderator"]),
        EmailVerificationClaim.validators.isVerified(10, 3600),
    ],
    userContext: {
        refreshCalled: 0,
    },
});

Session.addAxiosInterceptors({});

function reexportedHandlers() {
    CookieHandlerReference.getReferenceOrThrow();
    WindowHandlerReference.getReferenceOrThrow();
}
