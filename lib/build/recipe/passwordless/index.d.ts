import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    InputType,
    PasswordlessFlowType,
    PasswordlessUser,
    PostAPIHookContext,
    PreAPIHookContext,
    RecipeInterface,
} from "./types";
export default class RecipeWrapper {
    static init(
        config?: InputType
    ): import("../../types").CreateRecipeFunction<import("./types").PreAndPostAPIHookAction>;
    static createCode(
        input:
            | {
                  email: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;
    static resendCode(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    static consumeCode(
        input:
            | {
                  userInputCode: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              createdUser: boolean;
              user: PasswordlessUser;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "RESTART_FLOW_ERROR";
              fetchResponse: Response;
          }
    >;
    static doesEmailExist(input: { email: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static doesPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static signOut(input?: { userContext?: any }): Promise<void>;
}
declare const init: typeof RecipeWrapper.init;
declare const createCodeAndSetState: typeof RecipeWrapper.createCode;
declare const resendCodeAndUpdateState: typeof RecipeWrapper.resendCode;
declare const consumeCode: typeof RecipeWrapper.consumeCode;
declare const doesEmailExist: typeof RecipeWrapper.doesEmailExist;
declare const doesPhoneNumberExist: typeof RecipeWrapper.doesPhoneNumberExist;
declare const signOut: typeof RecipeWrapper.signOut;
export {
    init,
    createCodeAndSetState,
    resendCodeAndUpdateState,
    consumeCode,
    doesEmailExist,
    doesPhoneNumberExist,
    signOut,
    PasswordlessUser,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
