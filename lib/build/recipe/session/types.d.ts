import { RecipeInterface as STWebsiteRecipeInterface } from "supertokens-website";
import { NormalisedAppInfo } from "../../types";
import OverrideableBuilder from "supertokens-js-override";
import { RecipePostAPIHookFunction, RecipePreAPIHookFunction } from "../recipeModule/types";
export declare type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED" | "ACCESS_TOKEN_PAYLOAD_UPDATED";
          userContext: any;
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
          userContext: any;
      };
export declare type UserInput = {
    enableDebugLogs?: boolean;
    apiDomain?: string;
    apiBasePath?: string;
    sessionScope?: string;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
    cookieDomain?: string;
    preAPIHook?: RecipePreAPIHookFunction<"SIGN_OUT" | "REFRESH_SESSION">;
    postAPIHook?: RecipePostAPIHookFunction<"SIGN_OUT" | "REFRESH_SESSION">;
    onHandleEvent?: (event: RecipeEvent) => void;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type RecipeInterface = STWebsiteRecipeInterface;
export declare type InputType = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    enableDebugLogs: boolean;
} & UserInput;
