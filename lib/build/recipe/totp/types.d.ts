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
export declare type RecipeInterface = {
    createDevice: (input: { deviceName?: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<
        | {
              status: "OK";
              issuerName: string;
              deviceName: string;
              secret: string;
              userIdentifier?: string;
              qrCodeString: string;
          }
        | {
              status: "DEVICE_ALREADY_EXISTS_ERROR";
          }
    >;
    verifyCode: (input: { totp: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<
        | {
              status: "OK" | "INVALID_TOTP_ERROR";
          }
        | {
              status: "LIMIT_REACHED_ERROR";
              retryAfterMs: number;
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
          }
        | {
              status: "INVALID_TOTP_ERROR" | "UNKNOWN_DEVICE_ERROR";
          }
        | {
              status: "LIMIT_REACHED_ERROR";
              retryAfterMs: number;
          }
    >;
    removeDevice: (input: { deviceName: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        didDeviceExist: boolean;
    }>;
    listDevices: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        devices: {
            name: string;
            period: number;
            skew: number;
            verified: boolean;
        }[];
    }>;
};
