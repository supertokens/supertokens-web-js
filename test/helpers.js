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

/*
 * Imports.
 */
import fetch from "isomorphic-fetch";
import { TEST_APPLICATION_SERVER_BASE_URL, TEST_SERVER_BASE_URL } from "./constants";

export function getTestEmail(post) {
    return `john.doe+${Date.now()}-${post ?? "0"}@supertokens.io`;
}

export async function backendHook(hookType) {
    const serverUrls = Array.from(new Set([TEST_SERVER_BASE_URL, TEST_APPLICATION_SERVER_BASE_URL]));

    await Promise.all(
        serverUrls.map((url) => fetch(`${url}/test/${hookType}`, { method: "POST" }).catch(console.error))
    );
}

export async function setupCoreApp({ appId, coreConfig } = {}) {
    const response = await fetch(`${TEST_SERVER_BASE_URL}/test/setup/app`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify({
            appId,
            coreConfig,
        }),
    });

    return await response.text();
}

export async function setupST({
    coreUrl,
    accountLinkingConfig = {},
    enabledRecipes,
    enabledProviders,
    passwordlessFlowType,
    passwordlessContactMethod,
    mfaInfo = {},
} = {}) {
    await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/test/setup/st`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify({
            coreUrl,
            accountLinkingConfig,
            enabledRecipes,
            enabledProviders,
            passwordlessFlowType,
            passwordlessContactMethod,
            mfaInfo,
        }),
    });
}

export async function backendBeforeEach() {
    await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
        method: "POST",
    }).catch(console.error);
    if (TEST_SERVER_BASE_URL !== TEST_APPLICATION_SERVER_BASE_URL) {
        await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/beforeeach`, {
            method: "POST",
        }).catch(console.error);
    }
}
