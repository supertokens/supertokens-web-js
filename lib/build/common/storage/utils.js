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
exports.normaliseStorageHandlerInput = void 0;
var defaultLocalStorageHandler_1 = require("./defaultLocalStorageHandler");
var defaultSessionStorageHandler_1 = require("./defaultSessionStorageHandler");
/*
 * Here we dont use the override builder (the way we do for function overrides), because
 * storage functions are not expected to call each other.
 */
function normaliseStorageHandlerInput(storageHandlerInput) {
    var localStorageFunction = function (original) {
        return original;
    };
    var sessionStorageFunction = function (original) {
        return original;
    };
    if (storageHandlerInput !== undefined) {
        if (storageHandlerInput.localStorage !== undefined) {
            localStorageFunction = storageHandlerInput.localStorage;
        }
        if (storageHandlerInput.sessionStorage !== undefined) {
            sessionStorageFunction = storageHandlerInput.sessionStorage;
        }
    }
    return {
        localStorage: localStorageFunction((0, defaultLocalStorageHandler_1.default)()),
        sessionStorage: sessionStorageFunction((0, defaultSessionStorageHandler_1.default)()),
    };
}
exports.normaliseStorageHandlerInput = normaliseStorageHandlerInput;
