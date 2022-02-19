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

export default class Facebook extends Provider {
    private static instance?: Facebook;

    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "facebook",
            name: "Facebook",
            clientId: config?.clientId,
        });

        if (config === undefined) {
            return;
        }
    }

    static init(config?: BuiltInProviderConfig): Provider {
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    }

    static reset(): void {
        if (!isTest()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    }
}
