import ThirdParty from "../../recipe/thirdparty";
import Passwordless from "../../recipe/passwordless";
import SuperTokens from "../../lib/build/supertokens";
import assert from "assert";

describe("Storage Abstraction tests", function () {
    let storageLogs = [];

    beforeEach(function () {
        SuperTokens.reset();
        storageLogs = [];
    });

    describe("Session storage tests", function () {
        it("Test that calling recipe functions uses custom storage handlers", async function () {
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
                                    getAuthStateFromURL: () => {
                                        throw new Error("Expected error during tests");
                                    },
                                };
                            },
                        },
                    }),
                ],
                storageHandlers: {
                    sessionStorage: (original) => {
                        return {
                            ...original,
                            getItem: async function (key) {
                                storageLogs.push(`GET_ITEM ${key}`);
                                /**
                                 * When fetching from storage in sign in up, errors are handled by
                                 * returning undefined. In this case  we make getAuthStateFromURL
                                 *  throw an error
                                 */
                                throw new Error("Unexpected error");
                            },
                            setItem: async function (key, _) {
                                storageLogs.push(`SET_ITEM ${key}`);
                                throw new Error("Expected error during tests");
                            },
                        };
                    },
                },
            });

            try {
                await ThirdParty.getAuthorizationURLWithQueryParamsAndSetState({
                    providerId: "",
                    authorisationURL: "",
                });
                throw new Error("getAuthorizationURLWithQueryParamsAndSetState should have failed but didnt");
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

            assert.deepEqual(storageLogs, ["SET_ITEM supertokens-oauth-state-2", "GET_ITEM supertokens-oauth-state-2"]);
        });

        it("Test that recipe functions use default handlers", async function () {
            /**
             * In normal SDK operation, the recipe functions will use storage from the
             * `window` object. We do this to mimic sessionStorage
             */
            global.window = {
                sessionStorage: {
                    getItem: async function (key) {
                        storageLogs.push(`GET_ITEM_GLOBAL ${key}`);
                        /**
                         * When fetching from storage in sign in up, errors are handled by
                         * returning undefined. In this case  we make getAuthStateFromURL
                         *  throw an error
                         */
                        throw new Error("Unexpected error");
                    },
                    setItem: async function (key, _) {
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
                                    getAuthStateFromURL: () => {
                                        throw new Error("Expected error during tests");
                                    },
                                };
                            },
                        },
                    }),
                ],
            });

            try {
                await ThirdParty.getAuthorizationURLWithQueryParamsAndSetState({
                    providerId: "",
                    authorisationURL: "",
                });
                throw new Error("getAuthorizationURLWithQueryParamsAndSetState should have failed but didnt");
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
                recipeList: [
                    Passwordless.init({
                        override: {
                            functions: function (original) {
                                return {
                                    ...original,
                                    resendCode: () => {
                                        throw new Error("Expected error during tests");
                                    },
                                    createCode: () => {
                                        return {};
                                    },
                                };
                            },
                        },
                    }),
                ],
                storageHandlers: {
                    localStorage: (original) => {
                        return {
                            ...original,
                            getItem: async function (key) {
                                storageLogs.push(`GET_ITEM ${key}`);
                                /**
                                 * When fetching from storage in sign in up, errors are handled by
                                 * returning undefined. In this case  we make getAuthStateFromURL
                                 *  throw an error
                                 */
                                throw new Error("Unexpected error");
                            },
                            setItem: async function (key, _) {
                                storageLogs.push(`SET_ITEM ${key}`);
                                throw new Error("Expected error during tests");
                            },
                        };
                    },
                },
            });

            try {
                await Passwordless.createCode({
                    email: "",
                });
                throw new Error("createCode should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            try {
                await Passwordless.resendCode();
                throw new Error("resendCode should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            assert.deepEqual(storageLogs, [
                "SET_ITEM supertokens-passwordless-loginAttemptInfo",
                "GET_ITEM supertokens-passwordless-loginAttemptInfo",
            ]);
        });

        it("Test that recipe functions use default handlers", async function () {
            /**
             * In normal SDK operation, the recipe functions will use storage from the
             * `window` object. We do this to mimic localStorage
             */
            global.window = {
                localStorage: {
                    getItem: async function (key) {
                        storageLogs.push(`GET_ITEM_GLOBAL ${key}`);
                        /**
                         * When fetching from storage in sign in up, errors are handled by
                         * returning undefined. In this case  we make getAuthStateFromURL
                         *  throw an error
                         */
                        throw new Error("Unexpected error");
                    },
                    setItem: async function (key, _) {
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
                    Passwordless.init({
                        override: {
                            functions: function (original) {
                                return {
                                    ...original,
                                    resendCode: () => {
                                        throw new Error("Expected error during tests");
                                    },
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
                await Passwordless.createCode({
                    email: "",
                });
                throw new Error("createCode should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            try {
                await Passwordless.resendCode();
                throw new Error("resendCode should have failed but didnt");
            } catch (e) {
                if (e.message !== "Expected error during tests") {
                    throw e;
                }
            }

            assert.deepEqual(storageLogs, [
                "SET_ITEM_GLOBAL supertokens-passwordless-loginAttemptInfo",
                "GET_ITEM_GLOBAL supertokens-passwordless-loginAttemptInfo",
            ]);
        });
    });
});
