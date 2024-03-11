import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    PreAndPostAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext,
    RecipeInterface,
    UserInput,
    DeviceInfo,
} from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<PreAndPostAPIHookAction>;
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
        | {
              status: "DEVICE_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
    >;
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
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_TOTP_ERROR";
              currentNumberOfFailedAttempts: number;
              maxNumberOfFailedAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "LIMIT_REACHED_ERROR";
              retryAfterMs: number;
              fetchResponse: Response;
          }
    >;
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
        | {
              status: "OK";
              wasAlreadyVerified: boolean;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_TOTP_ERROR";
              currentNumberOfFailedAttempts: number;
              maxNumberOfFailedAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "UNKNOWN_DEVICE_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "LIMIT_REACHED_ERROR";
              retryAfterMs: number;
              fetchResponse: Response;
          }
    >;
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
    static removeDevice(input: { deviceName: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        didDeviceExist: boolean;
        fetchResponse: Response;
    }>;
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
        devices: {
            name: string;
            period: number;
            skew: number;
            verified: boolean;
        }[];
        fetchResponse: Response;
    }>;
}
declare const init: typeof RecipeWrapper.init;
declare const createDevice: typeof RecipeWrapper.createDevice;
declare const verifyCode: typeof RecipeWrapper.verifyCode;
declare const verifyDevice: typeof RecipeWrapper.verifyDevice;
declare const removeDevice: typeof RecipeWrapper.removeDevice;
declare const listDevices: typeof RecipeWrapper.listDevices;
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
