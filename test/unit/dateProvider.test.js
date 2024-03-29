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
import jsdom from "mocha-jsdom";
import { BooleanClaim } from "../../recipe/session";
import EmailPassword from "../../recipe/emailpassword";
import SuperTokens from "../../lib/build/supertokens";
import assert from "assert";

describe("Date Provider test", function () {
    jsdom({ url: "http://localhost.org" });

    let storageLogs = [];

    beforeEach(function () {
        SuperTokens.reset();
        storageLogs = [];
    });

    it("should use custom date provider when calling init", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                apiDomain: "api.supertokens.io",
            },
            dateProvider: function () {
                return {
                    getThresholdInSeconds: function () {
                        storageLogs.push("ST_LOGS DATE_PROVIDER_GET_THRESHOLD");
                        return 7;
                    },
                    now: function () {
                        storageLogs.push("ST_LOGS DATE_PROVIDER_NOW");
                        return Date.now();
                    },
                };
            },
            recipeList: [EmailPassword.init()],
        });

        // Calling the shouldRefresh method on a SessionClaimValidator should call the DateProvider now method
        const claim = new BooleanClaim({ id: "test-claim", defaultMaxAgeInSeconds: 1000 });
        const validator = claim.validators.isTrue();
        await validator.shouldRefresh({ "test-claim": { v: true, t: Date.now() } });

        assert.deepEqual(storageLogs, ["ST_LOGS DATE_PROVIDER_GET_THRESHOLD", "ST_LOGS DATE_PROVIDER_NOW"]);
    });
});
