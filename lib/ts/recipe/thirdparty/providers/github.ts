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

import Provider from ".";
import { isTest } from "../../../utils";
import { BuiltInProviderConfig } from "./types";

export default class Github extends Provider {
    private static instance?: Github;

    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "github",
            name: "Github",
            clientId: config?.clientId,
        });

        if (config === undefined) {
            return;
        }
    }

    static init(config?: BuiltInProviderConfig): Provider {
        if (Github.instance !== undefined) {
            console.warn("Github Provider was already initialized");
            return Github.instance;
        }
        Github.instance = new Github(config);
        return Github.instance;
    }

    static reset(): void {
        if (!isTest()) {
            return;
        }
        Github.instance = undefined;
        return;
    }
}
