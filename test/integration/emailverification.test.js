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
import EmailPassword from "../../lib/build/recipe/emailpassword/index.js";
import EmailVerification from "../../lib/build/recipe/emailverification/index.js";
import Session from "../../lib/build/recipe/session/index.js";
import { getTestEmail, setupCoreApp, setupST, backendBeforeEach } from "../helpers.js";

describe("EmailVerification Integration Tests", function () {
    jsdom({ url: "http://localhost.org" });

    before(async function () {
        const coreUrl = await setupCoreApp();
        await setupST({
            coreUrl,
            enabledRecipes: ["emailpassword", "emailverification", "session"],
        });

        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "http://127.0.0.1:8082",
                apiBasePath: "/auth",
            },
            recipeList: [
                EmailPassword.init(),
                EmailVerification.init(),
                Session.init({ tokenTransferMethod: "header" }),
            ],
        });
    });

    beforeEach(async function () {
        await backendBeforeEach();
    });

    describe("Email Verification Flow", function () {
        let testUser;
        let testEmail;

        beforeEach(async function () {
            testEmail = getTestEmail();
            const signUpResponse = await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: "TestPass123!" },
                    { id: "name", value: "John Doe" },
                    { id: "age", value: 20 },
                ],
            });
            assert.strictEqual(signUpResponse.status, "OK");
            testUser = signUpResponse.user;

            const signInResponse = await EmailPassword.signIn({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: "TestPass123!" },
                ],
            });
            assert.strictEqual(signInResponse.status, "OK");
        });

        it("should check if email is verified for new user", async function () {
            // Verify session exists before calling EmailVerification
            const sessionExists = await Session.doesSessionExist();
            assert.strictEqual(sessionExists, true, "Session should exist before EmailVerification call");

            const response = await EmailVerification.isEmailVerified();
            assert.strictEqual(response.status, "OK");
            assert.strictEqual(response.isVerified, false);
        });

        it("should successfully send verification email", async function () {
            const response = await EmailVerification.sendVerificationEmail();
            assert.strictEqual(response.status, "OK");
        });

        it("should have EmailVerificationClaim available", async function () {
            assert.ok(EmailVerification.EmailVerificationClaim);
            assert.ok(typeof EmailVerification.EmailVerificationClaim === "object");
            assert.ok(EmailVerification.EmailVerificationClaim.id === "st-ev");
        });

        it("should handle URL token extraction methods", async function () {
            try {
                const token = EmailVerification.getEmailVerificationTokenFromURL();
                assert.ok(typeof token === "string");
            } catch (error) {
                assert.fail(`URL extraction should not throw: ${error.message}`);
            }
        });
    });

    describe("Email Verification Error Handling", function () {
        it("should handle verification when no user is signed in", async function () {
            try {
                await EmailVerification.sendVerificationEmail();
                assert.fail("Should throw when no session exists");
            } catch (error) {
                assert.ok(error);
            }
        });

        it("should handle isEmailVerified when no user is signed in", async function () {
            try {
                await EmailVerification.isEmailVerified();
                assert.fail("Should throw when no session exists");
            } catch (error) {
                assert.ok(error);
            }
        });
    });
});
