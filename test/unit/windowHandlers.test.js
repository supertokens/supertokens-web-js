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

import ThirdParty from "../../recipe/thirdparty";
import Passwordless from "../../recipe/passwordless";
import Session from "../../recipe/session";
import SuperTokens from "../../lib/build/supertokens";
import assert from "assert";
import { CookieHandlerReference } from "../../utils/cookieHandler";
import { WindowHandlerReference } from "../../utils/windowHandler";

describe("Window handlers test", function () {
    let storageLogs = [];

    beforeEach(function () {
        SuperTokens.reset();
        CookieHandlerReference.instance = undefined;
        WindowHandlerReference.instance = undefined;
        storageLogs = [];
    });

    describe("General tests", function () {
        it("Test that window handlers are correctly used in website SDK", async function () {
            try {
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
                                // This is called when supertokens website init is called
                                getHostName: () => {
                                    throw new Error("Expected error during tests");
                                },
                            },
                        };
                    },
                    recipeList: [Session.init()],
                });
                throw new Error("SuperTokens.init should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }
        });
    });

    describe("Session storage tests", function () {
        it("Test that calling recipe functions uses custom storage handlers", async function () {
            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    apiDomain: "api.supertokens.io",
                },
                windowHandler: function (original) {
                    return {
                        ...original,
                        sessionStorage: {
                            ...original.sessionStorage,
                            getItemSync: function (key) {
                                storageLogs.push(`GET_ITEM_SYNC ${key}`);
                                /**
                                 * When fetching from storage in sign in up, errors are handled by
                                 * returning undefined. In this case  we make getAuthStateFromURL
                                 *  throw an error
                                 */
                                throw new Error("Expected error during tests");
                            },
                            setItem: async function (key, _) {
                                storageLogs.push(`SET_ITEM ${key}`);
                                throw new Error("Expected error during tests");
                            },
                        },
                    };
                },
                recipeList: [
                    ThirdParty.init({
                        override: {
                            functions: function (original) {
                                return {
                                    ...original,
                                    generateStateToSendToOAuthProvider: () => "state",
                                    getAuthorisationURLFromBackend: () => ({
                                        status: "OK",
                                        url: "https://test.provider.com/authorize",
                                    }),
                                };
                            },
                        },
                    }),
                ],
            });

            try {
                await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
                    providerId: "",
                    authorisationURL: "",
                });
                throw new Error("getAuthorisationURLWithQueryParamsAndSetState should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            try {
                await ThirdParty.signInAndUp();
                throw new Error("signInAndUp should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            assert.deepEqual(storageLogs, [
                "SET_ITEM supertokens-oauth-state-2",
                "GET_ITEM_SYNC supertokens-oauth-state-2",
            ]);
        });

        it("Test that recipe functions use default window APIs", async function () {
            /**
             * In normal SDK operation, the recipe functions will use storage from the
             * `window` object. We do this to mimic sessionStorage
             */
            global.window = {
                sessionStorage: {
                    /**
                     * In this test because we rely on default Window APIs, when getStateAndOtherInfoFromStorage
                     * calls getItemSync it will internally call sessionStorage.getItem
                     */
                    getItem: function (key) {
                        storageLogs.push(`GET_ITEM_GLOBAL ${key}`);
                        /**
                         * When fetching from storage in sign in up, errors are handled by
                         * returning undefined. In this case  we make getAuthStateFromURL
                         *  throw an error
                         */
                        throw new Error("Expected error during tests");
                    },
                    setItem: function (key, _) {
                        storageLogs.push(`SET_ITEM_GLOBAL ${key}`);
                        throw new Error("Expected error during tests");
                    },
                },
            };

            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    apiDomain: "api.supertokens.io",
                },
                recipeList: [
                    ThirdParty.init({
                        override: {
                            functions: function (original) {
                                return {
                                    ...original,
                                    generateStateToSendToOAuthProvider: () => "state",
                                    getAuthorisationURLFromBackend: () => ({
                                        status: "OK",
                                        url: "https://test.provider.com/authorize",
                                    }),
                                };
                            },
                        },
                    }),
                ],
            });

            try {
                await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
                    providerId: "",
                    authorisationURL: "",
                });
                throw new Error("getAuthorisationURLWithQueryParamsAndSetState should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            try {
                await ThirdParty.signInAndUp();
                throw new Error("signInAndUp should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            assert.deepEqual(storageLogs, [
                "SET_ITEM_GLOBAL supertokens-oauth-state-2",
                "GET_ITEM_GLOBAL supertokens-oauth-state-2",
            ]);
        });
    });

    describe("Local storage tests", function () {
        it("Test that calling recipe functions uses custom storage handlers", async function () {
            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    apiDomain: "api.supertokens.io",
                },
                windowHandler: function (original) {
                    return {
                        ...original,
                        localStorage: {
                            ...original.localStorage,
                            getItem: async function (key) {
                                storageLogs.push(`GET_ITEM ${key}`);
                                throw new Error("Expected error during tests");
                            },
                            setItem: async function (key, _) {
                                storageLogs.push(`SET_ITEM ${key}`);
                                throw new Error("Expected error during tests");
                            },
                        },
                    };
                },
                recipeList: [
                    Passwordless.init({
                        override: {
                            functions: function (original) {
                                return {
                                    ...original,
                                    createCode: () => {
                                        return {};
                                    },
                                };
                            },
                        },
                    }),
                ],
            });

            try {
                await Passwordless.resendCode();
                throw new Error("resendCode should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            assert.deepEqual(storageLogs, ["GET_ITEM supertokens-passwordless-loginAttemptInfo"]);
        });

        it("Test that recipe functions use default handlers", async function () {
            /**
             * In normal SDK operation, the recipe functions will use storage from the
             * `window` object. We do this to mimic localStorage
             */
            global.window = {
                localStorage: {
                    getItem: function (key) {
                        storageLogs.push(`GET_ITEM_GLOBAL ${key}`);
                        /**
                         * When fetching from storage in sign in up, errors are handled by
                         * returning undefined. In this case  we make getAuthStateFromURL
                         *  throw an error
                         */
                        throw new Error("Expected error during tests");
                    },
                    setItem: function (key, _) {
                        storageLogs.push(`SET_ITEM_GLOBAL ${key}`);
                        throw new Error("Expected error during tests");
                    },
                },
            };

            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    apiDomain: "api.supertokens.io",
                },
                recipeList: [
                    ThirdParty.init({
                        override: {
                            functions: function (original) {
                                return {
                                    ...original,
                                    createPasswordlessCode: () => {
                                        return {};
                                    },
                                };
                            },
                        },
                    }),
                ],
            });

            try {
                await Passwordless.resendCode();
                throw new Error("resendCode should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            assert.deepEqual(storageLogs, ["GET_ITEM_GLOBAL supertokens-passwordless-loginAttemptInfo"]);
        });
    });
});
