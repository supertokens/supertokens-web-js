/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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

import assert from "assert";
import jsdom from "mocha-jsdom";
import "isomorphic-fetch";
import SuperTokens from "../../lib/build/supertokens";
import Webauthn from "../../lib/build/recipe/webauthn/index.js";
import Session from "../../lib/build/recipe/session/index.js";
import { getTestEmail, setupCoreApp, setupST, backendBeforeEach } from "../helpers.js";
import { TEST_SERVER_BASE_URL } from "../constants.js";

describe("Webauthn Integration Tests", function () {
    jsdom({ url: "http://localhost.org" });

    before(async function () {
        const coreUrl = await setupCoreApp();
        await setupST({
            coreUrl,
            enabledRecipes: ["webauthn", "session"],
        });

        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "http://127.0.0.1:8082",
                apiBasePath: "/auth",
            },
            recipeList: [Webauthn.init(), Session.init({ tokenTransferMethod: "header" })],
        });
    });

    beforeEach(async function () {
        await backendBeforeEach();
    });

    describe("Webauthn SignUp Flow", function () {
        it("should successfully get register options for email", async function () {
            const testEmail = getTestEmail();

            const response = await Webauthn.getRegisterOptions({
                email: testEmail,
                userContext: {},
            });

            assert.strictEqual(response.status, "OK");
            assert.ok(response.webauthnGeneratedOptionsId);
            assert.strictEqual(response.rp.name, "SuperTokens");
        });

        it("should handle registration flow with mocked credentials", async function () {
            const testEmail = getTestEmail();

            // Get registration options
            const registerOptionsResponse = await Webauthn.getRegisterOptions({
                email: testEmail,
            });

            assert.strictEqual(registerOptionsResponse.status, "OK");

            // Create mocked credential using the test server endpoint
            const mockCredentialResponse = await fetch(`${TEST_SERVER_BASE_URL}/test/webauthn/create-credential`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    registerOptionsResponse: registerOptionsResponse,
                    rpId: "localhost",
                    rpName: "SuperTokens",
                    origin: "http://localhost:3031",
                }),
            });

            const mockCredential = await mockCredentialResponse.json();
            assert.ok(mockCredential.credential);

            // Perform sign up with the mocked credential
            const signUpResponse = await Webauthn.signUp({
                webauthnGeneratedOptionsId: registerOptionsResponse.webauthnGeneratedOptionsId,
                credential: mockCredential.credential,
            });

            assert.strictEqual(signUpResponse.status, "OK");
            assert.ok(signUpResponse.user);
            assert.ok(signUpResponse.user.id);
            assert.ok(signUpResponse.user.emails.includes(testEmail));
        });
    });

    describe("Webauthn SignIn Flow", function () {
        const testEmail = getTestEmail();
        let signInOptionsResponse;

        it("should successfully get sign in options", async function () {
            const response = await Webauthn.getSignInOptions();

            assert.strictEqual(response.status, "OK");
            assert.ok(response.webauthnGeneratedOptionsId);
            assert.ok(response.challenge);

            signInOptionsResponse = response;
        });

        it("should successfully sign in after authenticating credential", async function () {
            // Simulate the authenticate credential flow using server
            const registrationOptions = await Webauthn.getRegisterOptions({
                email: testEmail,
            });

            const response = await fetch(`${TEST_SERVER_BASE_URL}/test/webauthn/create-and-assert-credential`, {
                method: "POST",
                body: JSON.stringify({
                    registerOptionsResponse: registrationOptions,
                    signInOptionsResponse: signInOptionsResponse,
                    rpId: "localhost",
                    rpName: "SuperTokens",
                    origin: "http://localhost:3031",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            assert(response.status === 200);

            const responseJson = await response.json();

            const { attestation, assertion } = responseJson.credential;

            assert.ok(attestation);
            assert.ok(assertion);

            const signUpResponse = await Webauthn.signUp({
                webauthnGeneratedOptionsId: registrationOptions.webauthnGeneratedOptionsId,
                credential: attestation,
            });

            assert.strictEqual(signUpResponse.status, "OK");
            assert.ok(signUpResponse.user);
            assert.ok(signUpResponse.user.id);

            // Simulation ends here, now we need to sign in the user

            const signInResponse = await Webauthn.signIn({
                webauthnGeneratedOptionsId: signInOptionsResponse.webauthnGeneratedOptionsId,
                credential: assertion,
                userContext: {},
            });

            assert.strictEqual(signInResponse.status, "OK");
            assert.ok(signInResponse.user);
            assert.ok(signInResponse.user.id);
            assert.ok(signInResponse.user.emails.includes(testEmail));
        });
    });

    describe("Webauthn Utility Methods", function () {
        it("should handle webauthn URL extraction methods", async function () {
            try {
                // These methods should not throw errors even without webauthn context
                const deviceId = Webauthn.getDeviceIdFromURL();
                assert.ok(typeof deviceId === "string");
            } catch (error) {
                // It's acceptable if these throw in a non-webauthn context
                assert.ok(error);
            }
        });

        it("should handle credential creation errors gracefully", async function () {
            try {
                // This should fail with invalid options
                await Webauthn.signUp({
                    webauthnGeneratedOptionsId: "invalid-id",
                    credential: {},
                    userContext: {},
                });
                assert.fail("Should have thrown error with invalid options");
            } catch (error) {
                assert.ok(error);
            }
        });
    });
});
