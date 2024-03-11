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

import { getNormalisedUserContext } from "../../utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import Recipe from "./recipe";
import {
    PreAndPostAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext,
    RecipeInterface,
    UserInput,
    DeviceInfo,
} from "./types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    /**
     * Creates a new unverified device.
     *
     * @param deviceName (OPTIONAL) A display name for the device
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful along a description of the created device (secret, etc.)
     */
    static createDevice(input?: { deviceName?: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<
        | {
              status: "OK";
              deviceName: string;
              secret: string;
              qrCodeString: string;
              fetchResponse: Response;
          }
        | { status: "DEVICE_ALREADY_EXISTS_ERROR"; fetchResponse: Response }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.createDevice({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Verifies that the totp code belongs to a verified device of the current user
     *
     * @param totp The TOTP code
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful
     */
    static verifyCode(input: { totp: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<
        | { status: "OK"; fetchResponse: Response }
        | {
              status: "INVALID_TOTP_ERROR";
              currentNumberOfFailedAttempts: number;
              maxNumberOfFailedAttempts: number;
              fetchResponse: Response;
          }
        | { status: "LIMIT_REACHED_ERROR"; retryAfterMs: number; fetchResponse: Response }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.verifyCode({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Verifies the totp device for the current user
     *
     * @param deviceName The name of the device we are verifying
     *
     * @param totp The TOTP code
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful
     */
    static verifyDevice(input: {
        deviceName: string;
        totp: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | { status: "OK"; wasAlreadyVerified: boolean; fetchResponse: Response }
        | {
              status: "INVALID_TOTP_ERROR";
              currentNumberOfFailedAttempts: number;
              maxNumberOfFailedAttempts: number;
              fetchResponse: Response;
          }
        | { status: "UNKNOWN_DEVICE_ERROR"; fetchResponse: Response }
        | { status: "LIMIT_REACHED_ERROR"; retryAfterMs: number; fetchResponse: Response }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.verifyDevice({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Removes a TOTP device
     *
     * @param deviceName The name of the device we are verifying
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful
     */
    static removeDevice(input: {
        deviceName: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<{ status: "OK"; didDeviceExist: boolean; fetchResponse: Response }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.removeDevice({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Lists all TOTP devices of the current user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{ status: "OK", ...}` if successful with a list of devices in the `devices` prop
     */
    static listDevices(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        devices: { name: string; period: number; skew: number; verified: boolean }[];
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.listDevices({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const createDevice = RecipeWrapper.createDevice;
const verifyCode = RecipeWrapper.verifyCode;
const verifyDevice = RecipeWrapper.verifyDevice;
const removeDevice = RecipeWrapper.removeDevice;
const listDevices = RecipeWrapper.listDevices;

export {
    init,
    createDevice,
    verifyCode,
    verifyDevice,
    removeDevice,
    listDevices,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    RecipeFunctionOptions,
    DeviceInfo,
};
