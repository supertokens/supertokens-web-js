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

import NormalisedURLPath from "../../../normalisedURLPath";
import { NormalisedAppInfo } from "../../../types";
import { ProviderConfig } from "./types";
export default abstract class Provider {
    id: string;
    name: string;
    clientId?: string;

    constructor(config: ProviderConfig) {
        this.id = config.id;
        this.name = config.name;
        this.clientId = config.clientId;
    }

    getRedirectURL(appInfo: NormalisedAppInfo): string {
        const domain = appInfo.websiteDomain.getAsStringDangerous();
        const callbackPath = new NormalisedURLPath(`/callback/${this.id}`);
        const path = appInfo.websiteBasePath.appendPath(callbackPath).getAsStringDangerous();
        return `${domain}${path}`;
    }

    generateState = (): string => {
        // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
        return `${1e20}`.replace(/[018]/g, (c) =>
            (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(16)
        );
    };
}
