/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
import jsdom from "mocha-jsdom";
import EmailVerification from "../../recipe/emailverification";
import EmailVerificationRecipe from "../../lib/build/recipe/emailverification/recipe";
import SuperTokens from "../../lib/build/supertokens";
import assert from "assert";

/*
 * Delay function is used in case of email verification claim as we have added a debouncing
 * mechanism that shouldRefresh will return false if multiple calls are done in 1000ms.
 * Hence adding delay after each email verification or shouldRefresh calls will result in
 * correct tests.
 * Test for checking when the shouldRefresh returning false when called multiple times in 1000ms
 * is added.
 */
let delayCounter = 0;
const delay = async () => {
    ++delayCounter;
};

const commonConfig = {
    appInfo: {
        appName: "SuperTokens",
        apiDomain: "api.supertokens.io",
    },
    dateProvider: function () {
        return {
            getThresholdInSeconds: function () {
                return 7;
            },
            now: function () {
                return Date.now() + delayCounter * 1000;
            },
        };
    },
    recipeList: [EmailVerification.init()],
};

describe("EmailVerificationClaim test", function () {
    jsdom({ url: "http://localhost.org" });

    beforeEach(function () {
        SuperTokens.reset();
        EmailVerificationRecipe.reset();
        delayCounter = 0;
    });

    describe("EmailVerification Claim", function () {
        it("value should be refreshed if it is undefined", async function () {
            SuperTokens.init(commonConfig);

            const validator = EmailVerification.EmailVerificationClaim.validators.isVerified();
            const shouldRefreshUndefined = await validator.shouldRefresh({});
            assert.strictEqual(shouldRefreshUndefined, true);
        });

        it("value should be refreshed as per maxAgeInSeconds if it is provided", async function () {
            SuperTokens.init(commonConfig);

            const validator = EmailVerification.EmailVerificationClaim.validators.isVerified(10, 200);
            const shouldRefreshValid = await validator.shouldRefresh({
                "st-ev": { v: true, t: Date.now() + delayCounter * 1000 - 199 * 1000 },
            });
            const shouldRefreshExpired = await validator.shouldRefresh({
                "st-ev": { v: true, t: Date.now() + delayCounter * 1000 - 201 * 1000 },
            });
            assert.strictEqual(shouldRefreshValid, false);
            assert.strictEqual(shouldRefreshExpired, true);
        });

        it("value should be refreshed as per refetchTimeOnFalseInSeconds if it is provided", async function () {
            SuperTokens.init(commonConfig);

            const validator = EmailVerification.EmailVerificationClaim.validators.isVerified(8);
            const shouldRefreshValid = await validator.shouldRefresh({
                "st-ev": { v: false, t: Date.now() + delayCounter * 1000 - 7 * 1000 },
            });
            const shouldRefreshExpired = await validator.shouldRefresh({
                "st-ev": { v: false, t: Date.now() + delayCounter * 1000 - 9 * 1000 },
            });
            assert.strictEqual(shouldRefreshValid, false);
            assert.strictEqual(shouldRefreshExpired, true);
        });

        it("value should be refreshed as per default the refetchTimeOnFalseInSeconds if it is not provided", async function () {
            SuperTokens.init(commonConfig);

            // NOTE: the default value of refetchTimeOnFalseInSeconds is 10 seconds
            const validator = EmailVerification.EmailVerificationClaim.validators.isVerified();
            const shouldRefreshValid = await validator.shouldRefresh({
                "st-ev": { v: false, t: Date.now() + delayCounter * 1000 - 9 * 1000 },
            });
            await delay(); // Added for correct results, since shouldRefresh is debounced
            const shouldRefreshExpired = await validator.shouldRefresh({
                "st-ev": { v: false, t: Date.now() + delayCounter * 1000 - 11 * 1000 },
            });
            assert.strictEqual(shouldRefreshValid, false);
            assert.strictEqual(shouldRefreshExpired, true);
        });

        it("shouldRefresh should return false if called before 1000ms", async function () {
            SuperTokens.init(commonConfig);

            // NOTE: the default value of refetchTimeOnFalseInSeconds is 10 seconds
            const validator = EmailVerification.EmailVerificationClaim.validators.isVerified();
            const shouldRefresh = await validator.shouldRefresh({
                "st-ev": { v: false, t: Date.now() + delayCounter * 1000 - 11 * 1000 },
            });
            const shouldRefreshAgain = await validator.shouldRefresh({
                "st-ev": { v: false, t: Date.now() + delayCounter * 1000 - 11 * 1000 },
            });
            assert.strictEqual(shouldRefresh, true);
            assert.strictEqual(shouldRefreshAgain, false);
        });
    });
});
