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
import SuperTokens from "../../lib/build/supertokens";
import assert from "assert";

describe("EmailVerificationClaim test", function () {
    jsdom({ url: "http://localhost.org" });

    let storageLogs = [];

    beforeEach(function () {
        SuperTokens.reset();
        storageLogs = [];
    });

    it("should require refresh less often for true values", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            dateProvider: function () {
                return {
                    getThresholdInSeconds: function () {
                        return 2;
                    },
                    now: function () {
                        return Date.now();
                    },
                };
            },
            recipeList: [EmailVerification.init()],
        });

        const validator = EmailVerification.EmailVerificationClaim.validators.isVerified();
        const shouldRefreshVerified = await validator.shouldRefresh({ "st-ev": { v: true, t: Date.now() - 15000 } });
        const shouldRefreshUnverified = await validator.shouldRefresh({ "st-ev": { v: false, t: Date.now() - 15000 } });
        const shouldRefreshUndefined = await validator.shouldRefresh({});

        assert.strictEqual(shouldRefreshVerified, false);
        assert.strictEqual(shouldRefreshUnverified, true);
        assert.strictEqual(shouldRefreshUndefined, true);
    });
});
