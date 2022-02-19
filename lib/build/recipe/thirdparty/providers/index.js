"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var normalisedURLPath_1 = require("../../../normalisedURLPath");
var Provider = /** @class */ (function () {
    function Provider(config) {
        this.generateState = function () {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return "".concat(1e20).replace(/[018]/g, function (c) {
                return (
                    parseInt(c) ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                ).toString(16);
            });
        };
        this.id = config.id;
        this.name = config.name;
        this.clientId = config.clientId;
    }
    Provider.prototype.getRedirectURL = function (appInfo) {
        var domain = appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new normalisedURLPath_1.default("/callback/".concat(this.id));
        var path = appInfo.websiteBasePath.appendPath(callbackPath).getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    return Provider;
})();
exports.default = Provider;
