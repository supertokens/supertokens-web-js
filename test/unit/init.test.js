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

import EmailPassword from "../../recipe/emailpassword";
import ThirdPartyPasswordless from "../../recipe/thirdpartypasswordless";
import ThirdParty from "../../recipe/thirdparty";
import ThirdPartyEmailPassword from "../../recipe/thirdpartyemailpassword";
import EmailVerification from "../../recipe/emailverification";
import Passwordless from "../../recipe/passwordless";
import Session from "../../recipe/session";
import Multitenancy from "../../recipe/multitenancy";

import EmailPasswordRecipeCore from "../../recipe/emailpassword/recipe";
import ThirdPartyPasswordlessRecipeCore from "../../recipe/thirdpartypasswordless/recipe";
import ThirdPartyRecipeCore from "../../recipe/thirdparty/recipe";
import ThirdPartyEmailPasswordRecipeCore from "../../recipe/thirdpartyemailpassword/recipe";
import EmailVerificationRecipeCore from "../../recipe/emailverification/recipe";
import PasswordlessRecipeCore from "../../recipe/passwordless/recipe";
import SessionRecipeCore from "../../recipe/session/recipe";

import SuperTokens from "../../lib/build/supertokens";
import assert from "assert";

describe("Init tests for recipes", function () {
    beforeEach(function () {
        SuperTokens.reset();

        // Reset all the recipes
        EmailPasswordRecipeCore.reset();
        ThirdPartyPasswordlessRecipeCore.reset();
        ThirdPartyRecipeCore.reset();
        ThirdPartyEmailPasswordRecipeCore.reset();
        EmailVerificationRecipeCore.reset();
        PasswordlessRecipeCore.reset();
        SessionRecipeCore.reset();
    });

    it("Throws correct error when calling ThirdPartyPasswordless methods if SuperTokens is not initialized", async function () {
        try {
            await ThirdPartyPasswordless.getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: "google",
                frontendRedirectURI: "http://localhost:3000/auth/callback/google",
            });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of ThirdPartyPasswordless found. Ensure that the 'ThirdPartyPasswordless.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling ThirdPartyPasswordless methods if recipe is not initialized but SuperTokens is initialized", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            windowHandler: function (original) {
                return {
                    ...original,
                    location: {
                        ...original.location,
                        getHostName: () => {
                            return "http://localhost:3000";
                        },
                    },
                };
            },
            recipeList: [EmailPassword.init()],
        });
        try {
            await ThirdPartyPasswordless.getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: "google",
                frontendRedirectURI: "http://localhost:3000/auth/callback/google",
            });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of ThirdPartyPasswordless found. Ensure that the 'ThirdPartyPasswordless.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling EmailPassword methods if SuperTokens is not initialized", async function () {
        try {
            await EmailPassword.doesEmailExist({ email: "test@supertokens.com" });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of EmailPassword found. Ensure that the 'EmailPassword.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling EmailPassword methods if recipe is not initialized but SuperTokens is initialized", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            windowHandler: function (original) {
                return {
                    ...original,
                    location: {
                        ...original.location,
                        getHostName: () => {
                            return "http://localhost:3000";
                        },
                    },
                };
            },
            recipeList: [ThirdPartyPasswordless.init()],
        });
        try {
            await EmailPassword.doesEmailExist({ email: "test@supertokens.com" });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of EmailPassword found. Ensure that the 'EmailPassword.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling ThirdParty methods if SuperTokens is not initialized", async function () {
        try {
            await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: "google",
                frontendRedirectURI: "http://localhost:3000/auth/callback/google",
            });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of ThirdParty found. Ensure that the 'ThirdParty.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling ThirdParty methods if recipe is not initialized but SuperTokens is initialized", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            windowHandler: function (original) {
                return {
                    ...original,
                    location: {
                        ...original.location,
                        getHostName: () => {
                            return "http://localhost:3000";
                        },
                    },
                };
            },
            recipeList: [EmailPassword.init()],
        });
        try {
            await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: "google",
                frontendRedirectURI: "http://localhost:3000/auth/callback/google",
            });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of ThirdParty found. Ensure that the 'ThirdParty.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling ThirdPartyEmailPassword methods if SuperTokens is not initialized", async function () {
        try {
            await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: "google",
                frontendRedirectURI: "http://localhost:3000/auth/callback/google",
            });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of ThirdPartyEmailPassword found. Ensure that the 'ThirdPartyEmailPassword.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling ThirdPartyEmailPassword methods if recipe is not initialized but SuperTokens is initialized", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            windowHandler: function (original) {
                return {
                    ...original,
                    location: {
                        ...original.location,
                        getHostName: () => {
                            return "http://localhost:3000";
                        },
                    },
                };
            },
            recipeList: [EmailPassword.init()],
        });
        try {
            await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: "google",
                frontendRedirectURI: "http://localhost:3000/auth/callback/google",
            });
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of ThirdPartyEmailPassword found. Ensure that the 'ThirdPartyEmailPassword.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling EmailVerification methods if SuperTokens is not initialized", async function () {
        try {
            await EmailVerification.isEmailVerified();
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of EmailVerification found. Ensure that the 'EmailVerification.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling EmailVerification methods if recipe is not initialized but SuperTokens is initialized", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            windowHandler: function (original) {
                return {
                    ...original,
                    location: {
                        ...original.location,
                        getHostName: () => {
                            return "http://localhost:3000";
                        },
                    },
                };
            },
            recipeList: [EmailPassword.init()],
        });
        try {
            await EmailVerification.isEmailVerified();
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of EmailVerification found. Ensure that the 'EmailVerification.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling Passwordless methods if SuperTokens is not initialized", async function () {
        try {
            Passwordless.getLinkCodeFromURL();
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of Passwordless found. Ensure that the 'Passwordless.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling Passwordless methods if recipe is not initialized but SuperTokens is initialized", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            windowHandler: function (original) {
                return {
                    ...original,
                    location: {
                        ...original.location,
                        getHostName: () => {
                            return "http://localhost:3000";
                        },
                    },
                };
            },
            recipeList: [EmailPassword.init()],
        });
        try {
            Passwordless.getLinkCodeFromURL();
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of Passwordless found. Ensure that the 'Passwordless.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling Session methods if SuperTokens is not initialized", async function () {
        try {
            await Session.getUserId();
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of Session found. Ensure that the 'Session.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling Session methods if recipe is not initialized but SuperTokens is initialized", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            windowHandler: function (original) {
                return {
                    ...original,
                    location: {
                        ...original.location,
                        getHostName: () => {
                            return "http://localhost:3000";
                        },
                    },
                };
            },
            recipeList: [EmailPassword.init()],
        });
        try {
            await Session.getUserId();
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of Session found. Ensure that the 'Session.init' method is called within the 'SuperTokens.init' recipeList."
                )
            );
        }
    });

    it("Throws correct error when calling Multitenancy methods if SuperTokens is not initialized", async function () {
        try {
            await Multitenancy.getTenantId();
        } catch (err) {
            assert(
                err.message.startsWith(
                    "No instance of Multitenancy found. Ensure that 'SuperTokens.init' method has been called."
                )
            );
        }
    });
});
