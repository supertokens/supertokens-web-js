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
import EmailPassword from "../../lib/build/recipe/emailpassword/index.js";
import Session from "../../lib/build/recipe/session/index.js";
import { getTestEmail, setupCoreApp, setupST, backendBeforeEach } from "../helpers.js";

describe("EmailPassword Integration Tests", function () {
    jsdom({ url: "http://localhost.org" });

    before(async function () {
        const coreUrl = await setupCoreApp();
        await setupST({
            coreUrl,
            enabledRecipes: ["emailpassword", "session"],
        });

        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "http://localhost:8082",
                apiBasePath: "/auth",
            },
            recipeList: [EmailPassword.init(), Session.init()],
        });
    });

    beforeEach(async function () {
        await backendBeforeEach();
    });

    describe("SignUp Flow", function () {
        it("should successfully sign up a user with valid credentials", async function () {
            const email = getTestEmail();
            const password = "TestPass123!";

            const response = await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: email },
                    { id: "password", value: password },
                    { id: "name", value: "John Doe" },
                    { id: "age", value: 20 },
                ],
            });

            assert.strictEqual(response.status, "OK");
            assert.strictEqual(response.user.emails[0], email);
            assert.ok(response.user.id);
        });

        it("should return field error for invalid email", async function () {
            const invalidEmail = "invalid-email";
            const password = "TestPass123!";

            const response = await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: invalidEmail },
                    { id: "password", value: password },
                    { id: "name", value: "John Doe" },
                    { id: "age", value: 20 },
                ],
            });

            assert.strictEqual(response.status, "FIELD_ERROR");
            assert.ok(response.formFields.find((field) => field.id === "email"));
        });

        it("should return field error for weak password", async function () {
            const email = getTestEmail();
            const weakPassword = "123";

            const response = await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: email },
                    { id: "password", value: weakPassword },
                    { id: "name", value: "John Doe" },
                    { id: "age", value: 20 },
                ],
            });

            assert.strictEqual(response.status, "FIELD_ERROR");
            assert.ok(response.formFields.find((field) => field.id === "password"));
        });
    });

    describe("SignIn Flow", function () {
        let testEmail;
        const testPassword = "TestPass123!";

        beforeEach(async function () {
            // Create a user for signin tests
            testEmail = getTestEmail();
            const signUpResponse = await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: testPassword },
                    { id: "name", value: "John Doe" },
                    { id: "age", value: 20 },
                ],
            });
            assert.strictEqual(signUpResponse.status, "OK");
        });

        it("should successfully sign in with valid credentials", async function () {
            const response = await EmailPassword.signIn({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: testPassword },
                ],
            });

            assert.strictEqual(response.status, "OK");
            assert.strictEqual(response.user.emails[0], testEmail);
            assert.ok(response.user.id);
        });

        it("should return wrong credentials error for invalid email", async function () {
            const response = await EmailPassword.signIn({
                formFields: [
                    { id: "email", value: "nonexistent@example.com" },
                    { id: "password", value: testPassword },
                ],
            });

            assert.strictEqual(response.status, "WRONG_CREDENTIALS_ERROR");
        });

        it("should return wrong credentials error for invalid password", async function () {
            const response = await EmailPassword.signIn({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: "WrongPassword123!" },
                ],
            });

            assert.strictEqual(response.status, "WRONG_CREDENTIALS_ERROR");
        });

        it("should return field error for malformed email", async function () {
            const response = await EmailPassword.signIn({
                formFields: [
                    { id: "email", value: "invalid-email" },
                    { id: "password", value: testPassword },
                ],
            });

            assert.strictEqual(response.status, "FIELD_ERROR");
            assert.ok(response.formFields.find((field) => field.id === "email"));
        });

        it("should return field error for empty password", async function () {
            const response = await EmailPassword.signIn({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: "" },
                ],
            });

            assert.strictEqual(response.status, "FIELD_ERROR");
            assert.ok(response.formFields.find((field) => field.id === "password"));
        });
    });

    describe("Email Exists Check", function () {
        let existingEmail;

        beforeEach(async function () {
            // Create a user for email exists tests
            existingEmail = getTestEmail();
            const signUpResponse = await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: existingEmail },
                    { id: "password", value: "TestPass123!" },
                    { id: "name", value: "John Doe" },
                    { id: "age", value: 20 },
                ],
            });
            assert.strictEqual(signUpResponse.status, "OK");
        });

        it("should return true for existing email", async function () {
            const response = await EmailPassword.doesEmailExist({
                email: existingEmail,
            });

            assert.strictEqual(response.status, "OK");
            assert.strictEqual(response.doesExist, true);
        });

        it("should return false for non-existing email", async function () {
            const response = await EmailPassword.doesEmailExist({
                email: "nonexistent@example.com",
            });

            assert.strictEqual(response.status, "OK");
            assert.strictEqual(response.doesExist, false);
        });
    });

    describe("Password Reset Flow", function () {
        let testEmail;

        beforeEach(async function () {
            // Create a user for password reset tests
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
        });

        it("should successfully send password reset email for existing user", async function () {
            const response = await EmailPassword.sendPasswordResetEmail({
                formFields: [{ id: "email", value: testEmail }],
            });

            assert.strictEqual(response.status, "OK");
        });

        it("should return field error for invalid email format", async function () {
            const response = await EmailPassword.sendPasswordResetEmail({
                formFields: [{ id: "email", value: "invalid-email" }],
            });

            assert.strictEqual(response.status, "FIELD_ERROR");
            assert.ok(response.formFields.find((field) => field.id === "email"));
        });

        it("should still return OK for non-existing email (security)", async function () {
            const response = await EmailPassword.sendPasswordResetEmail({
                formFields: [{ id: "email", value: "nonexistent@example.com" }],
            });

            // For security reasons, the API typically returns OK even for non-existing emails
            assert.strictEqual(response.status, "OK");
        });
    });

    describe("SignOut Flow", function () {
        let testEmail;
        const testPassword = "TestPass123!";

        beforeEach(async function () {
            // Create and sign in a user
            testEmail = getTestEmail();
            await EmailPassword.signUp({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: testPassword },
                    { id: "name", value: "John Doe" },
                    { id: "age", value: 20 },
                ],
            });
            await EmailPassword.signIn({
                formFields: [
                    { id: "email", value: testEmail },
                    { id: "password", value: testPassword },
                ],
            });
        });

        it("should successfully sign out", async function () {
            try {
                await EmailPassword.signOut();
            } catch (error) {
                assert.fail(`SignOut should not throw an error, but got: ${error.message}`);
            }
        });
    });
});
