import { InputType as STWebsiteInputType, RecipeInterface as STWebsiteRecipeInterface } from "supertokens-website";
import { NormalisedAppInfo } from "../../types";
export declare type PreAndPostAPIHookAction = "SIGN_OUT" | "REFRESH_SESSION";
export declare type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED";
          userContext: any;
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
          userContext: any;
      };
export declare type UserInput = STWebsiteInputType;
export declare type RecipeInterface = STWebsiteRecipeInterface;
export declare type InputType = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
} & UserInput;
