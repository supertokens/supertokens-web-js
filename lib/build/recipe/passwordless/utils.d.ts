import { User } from "../../types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { InputType, NormalisedInputType, PasswordlessFlowType, RecipeInterface } from "./types";
export declare function normaliseUserInput(config: InputType): NormalisedInputType;
/**
 * These functions are helper functions so that the logic can be exposed from both
 * passwordless and thirdpartypasswordless recipes without having to duplicate code
 */
export declare function createCode(
    input:
        | {
              email: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
        | {
              phoneNumber: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
): Promise<
    | {
          status: "OK";
          deviceId: string;
          preAuthSessionId: string;
          flowType: PasswordlessFlowType;
          fetchResponse: Response;
      }
    | {
          status: "SIGN_IN_UP_NOT_ALLOWED";
          reason: string;
          fetchResponse: Response;
      }
>;
export declare function resendCode(input: {
    userContext?: any;
    options?: RecipeFunctionOptions;
    recipeImplementation: RecipeInterface;
}): Promise<{
    status: "OK" | "RESTART_FLOW_ERROR";
    fetchResponse: Response;
}>;
export declare function consumeCode(
    input:
        | {
              userInputCode: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
        | {
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
): Promise<
    | {
          status: "OK";
          createdNewRecipeUser: boolean;
          user: User;
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
    | {
          status: "SIGN_IN_UP_NOT_ALLOWED";
          reason: string;
          fetchResponse: Response;
      }
>;
