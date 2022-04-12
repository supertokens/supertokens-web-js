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

import { NormalisedStorageHandlers, StorageHandlerFunction, StorageHandlerInput } from "../../types";
import getDefaultLocalStorageHandler from "./defaultLocalStorageHandler";
import getDefaultSessionStorageHandler from "./defaultSessionStorageHandler";

/*
 * Here we dont use the override builder (the way we do for function overrides), because
 * storage functions are not expected to call each other.
 */
export function normaliseStorageHandlerInput(storageHandlerInput?: StorageHandlerInput): NormalisedStorageHandlers {
    let localStorageFunction: StorageHandlerFunction = (original) => original;
    let sessionStorageFunction: StorageHandlerFunction = (original) => original;

    if (storageHandlerInput !== undefined) {
        if (storageHandlerInput.localStorage !== undefined) {
            localStorageFunction = storageHandlerInput.localStorage;
        }

        if (storageHandlerInput.sessionStorage !== undefined) {
            sessionStorageFunction = storageHandlerInput.sessionStorage;
        }
    }

    return {
        localStorage: localStorageFunction(getDefaultLocalStorageHandler()),
        sessionStorage: sessionStorageFunction(getDefaultSessionStorageHandler()),
    };
}
