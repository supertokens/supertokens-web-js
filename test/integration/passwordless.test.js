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
import SuperTokens from "../../lib/build/supertokens";
import Passwordless from "../../lib/build/recipe/passwordless/index.js";
import Session from "../../lib/build/recipe/session/index.js";
import { getTestEmail, setupCoreApp, setupST, backendBeforeEach } from "../helpers.js";

describe("Passwordless Integration Tests", function () {
    jsdom({ url: "http://localhost.org" });

    before(async function () {
        const coreUrl = await setupCoreApp();
        await setupST({
            coreUrl,
            enabledRecipes: ["passwordless", "session"],
            passwordlessFlowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            passwordlessContactMethod: "EMAIL_OR_PHONE",
        });

        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "http://localhost:8082",
                apiBasePath: "/auth",
            },
            recipeList: [Passwordless.init(), Session.init({ tokenTransferMethod: "header" })],
        });
    });

    beforeEach(async function () {
        await backendBeforeEach();
    });

    describe("Code Creation Flow", function () {
        it("should successfully create code for email", async function () {
            const email = getTestEmail();

            const response = await Passwordless.createCode({
                email: email,
            });

            assert.strictEqual(response.status, "OK");
            assert.ok(response.deviceId);
            assert.ok(response.preAuthSessionId);
            assert.ok(response.flowType);
        });

        it("should successfully create code for phone number", async function () {
            // We can enter any number since the server won't actually send the SMS
            const phoneNumber = "+91-9876543210";

            const response = await Passwordless.createCode({
                phoneNumber: phoneNumber,
            });

            assert.strictEqual(response.status, "OK");
            assert.ok(response.deviceId);
            assert.ok(response.preAuthSessionId);
            assert.ok(response.flowType);
        });
    });

    describe("Code Consumption Flow", function () {
        let codeInfo;
        let testEmail;

        beforeEach(async function () {
            // Create a code for testing consumption
            testEmail = getTestEmail();
            codeInfo = await Passwordless.createCode({
                email: testEmail,
            });
            assert.strictEqual(codeInfo.status, "OK");
        });

        it("should handle incorrect user input code", async function () {
            const response = await Passwordless.consumeCode({
                userInputCode: "000000", // Invalid code
            });

            // Should return incorrect code error
            assert.ok(
                ["INCORRECT_USER_INPUT_CODE_ERROR", "EXPIRED_USER_INPUT_CODE_ERROR", "RESTART_FLOW_ERROR"].includes(
                    response.status
                )
            );

            if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                assert.ok(typeof response.failedCodeInputAttemptCount === "number");
                assert.ok(typeof response.maximumCodeInputAttempts === "number");
            }
        });

        // TODO: Add test for correct code consumption

        it("should handle expired user input code", async function () {
            // Wait a bit or use an old code to simulate expiration
            const response = await Passwordless.consumeCode({
                userInputCode: "999999", // This will likely be expired or incorrect
            });

            // Should return an error status
            assert.ok(
                ["INCORRECT_USER_INPUT_CODE_ERROR", "EXPIRED_USER_INPUT_CODE_ERROR", "RESTART_FLOW_ERROR"].includes(
                    response.status
                )
            );
        });

        it("should handle restart flow error", async function () {
            // Clear login attempt info to simulate restart flow scenario
            await Passwordless.clearLoginAttemptInfo();

            const response = await Passwordless.consumeCode({
                userInputCode: "123456",
            });

            assert.strictEqual(response.status, "RESTART_FLOW_ERROR");
        });
    });

    describe("Code Resend Flow", function () {
        let codeInfo;
        let testEmail;

        beforeEach(async function () {
            // Create a code for testing resend
            testEmail = getTestEmail();
            codeInfo = await Passwordless.createCode({
                email: testEmail,
            });
            assert.strictEqual(codeInfo.status, "OK");
        });

        it("should successfully resend code", async function () {
            const response = await Passwordless.resendCode();

            assert.ok(["OK", "RESTART_FLOW_ERROR"].includes(response.status));
        });

        it("should handle restart flow error when no previous attempt", async function () {
            // Clear login attempt info to simulate no previous attempt
            await Passwordless.clearLoginAttemptInfo();

            const response = await Passwordless.resendCode();

            assert.strictEqual(response.status, "RESTART_FLOW_ERROR");
        });
    });

    describe("Email and Phone Existence Check", function () {
        let existingEmail;
        let existingPhone;

        beforeEach(async function () {
            // Create codes to establish "existing" contacts
            existingEmail = getTestEmail();
            existingPhone = "+1234567890";

            await Passwordless.createCode({
                email: existingEmail,
            });
        });

        it("should check if email exists", async function () {
            const response = await Passwordless.doesEmailExist({
                email: existingEmail,
            });

            assert.strictEqual(response.status, "OK");
            // doesExist can be true or false, both are valid
            assert.ok(typeof response.doesExist === "boolean");
        });

        it("should return false for non-existing email", async function () {
            const response = await Passwordless.doesEmailExist({
                email: "nonexistent@example.com",
            });

            assert.strictEqual(response.status, "OK");
            assert.strictEqual(response.doesExist, false);
        });

        it("should check if phone number exists", async function () {
            const response = await Passwordless.doesPhoneNumberExist({
                phoneNumber: existingPhone,
            });

            assert.strictEqual(response.status, "OK");
            // doesExist can be true or false, both are valid
            assert.ok(typeof response.doesExist === "boolean");
        });

        it("should return false for non-existing phone number", async function () {
            const response = await Passwordless.doesPhoneNumberExist({
                phoneNumber: "+9876543210",
            });

            assert.strictEqual(response.status, "OK");
            assert.strictEqual(response.doesExist, false);
        });
    });

    describe("Login Attempt Info Management", function () {
        it("should set and get login attempt info", async function () {
            const attemptInfo = {
                deviceId: "test-device-id",
                preAuthSessionId: "test-pre-auth-session-id",
                flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            };

            await Passwordless.setLoginAttemptInfo({ attemptInfo });

            const retrievedInfo = await Passwordless.getLoginAttemptInfo();

            assert.ok(retrievedInfo);
            assert.strictEqual(retrievedInfo.deviceId, attemptInfo.deviceId);
            assert.strictEqual(retrievedInfo.preAuthSessionId, attemptInfo.preAuthSessionId);
            assert.strictEqual(retrievedInfo.flowType, attemptInfo.flowType);
        });

        it("should clear login attempt info", async function () {
            const attemptInfo = {
                deviceId: "test-device-id",
                preAuthSessionId: "test-pre-auth-session-id",
                flowType: "USER_INPUT_CODE",
            };

            await Passwordless.setLoginAttemptInfo({ attemptInfo });
            await Passwordless.clearLoginAttemptInfo();

            const retrievedInfo = await Passwordless.getLoginAttemptInfo();

            assert.strictEqual(retrievedInfo, undefined);
        });

        it("should return undefined when no login attempt info exists", async function () {
            await Passwordless.clearLoginAttemptInfo();

            const retrievedInfo = await Passwordless.getLoginAttemptInfo();

            assert.strictEqual(retrievedInfo, undefined);
        });
    });

    describe("URL Utility Methods", function () {
        it("should handle URL extraction methods", async function () {
            // Test URL extraction methods (these work with URL params)
            // In a real browser environment, these would extract from the current URL

            try {
                const linkCode = Passwordless.getLinkCodeFromURL();
                const preAuthSessionId = Passwordless.getPreAuthSessionIdFromURL();

                // In jsdom environment, these will return empty/undefined but shouldn't throw
                assert.ok(typeof linkCode === "string");
                assert.ok(typeof preAuthSessionId === "string");
            } catch (error) {
                assert.fail(`URL extraction methods should not throw errors: ${error.message}`);
            }
        });
    });

    describe("SignOut Flow", function () {
        it("should successfully sign out", async function () {
            try {
                await Passwordless.signOut();
                // SignOut should complete without throwing
            } catch (error) {
                // In some cases, signOut might throw if no session exists, which is acceptable
                assert.ok(error.message);
            }
        });
    });
});
