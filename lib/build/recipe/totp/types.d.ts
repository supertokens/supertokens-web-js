import {
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
} from "../authRecipe/types";
import {
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    UserInput as RecipeModuleUserInput,
    RecipeFunctionOptions,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction =
    | "CREATE_DEVICE"
    | "VERIFY_CODE"
    | "VERIFY_DEVICE"
    | "REMOVE_DEVICE"
    | "LIST_DEVICES";
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type UserInput = {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type DeviceInfo = {
    deviceName: string;
    secret: string;
    qrCodeString: string;
};
export declare type RecipeInterface = {
    createDevice: (input: { deviceName?: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<
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
    verifyCode: (input: { totp: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<
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
    verifyDevice: (input: {
        deviceName: string;
        totp: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
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
    removeDevice: (input: { deviceName: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        didDeviceExist: boolean;
        fetchResponse: Response;
    }>;
    listDevices: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        devices: {
            name: string;
            period: number;
            skew: number;
            verified: boolean;
        }[];
        fetchResponse: Response;
    }>;
};
