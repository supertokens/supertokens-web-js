import {
    RecipeInterface as STWebsiteRecipeInterface,
    InputType as WebsiteInputType,
    ClaimValidationError,
} from "supertokens-website";
import { NormalisedAppInfo } from "../../types";
export declare type RecipeEvent =
    | {
          action:
              | "SIGN_OUT"
              | "REFRESH_SESSION"
              | "SESSION_CREATED"
              | "ACCESS_TOKEN_PAYLOAD_UPDATED"
              | "SESSION_ALREADY_EXISTS";
          userContext: any;
      }
    | {
          action: "API_INVALID_CLAIM";
          claimValidationErrors: ClaimValidationError[];
          userContext: any;
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
          userContext: any;
      };
export declare type UserInput = Omit<
    WebsiteInputType,
    "apiDomain" | "apiBasePath" | "enableDebugLogs" | "cookieHandler" | "windowHandler"
>;
export declare type RecipeInterface = STWebsiteRecipeInterface;
export declare type InputType = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    enableDebugLogs: boolean;
} & UserInput;
