import { RecipeInterface } from "supertokens-website";
import { NormalisedAppInfo } from "../../types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction = "SIGN_OUT" | "REFRESH_SESSION";
export declare type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED";
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
      };
export declare type InputType = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    apiDomain?: string;
    apiBasePath?: string;
    sessionScope?: string;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
    cookieDomain?: string;
    preAPIHook?: (context: {
        action: "SIGN_OUT" | "REFRESH_SESSION";
        requestInit: RequestInit;
        url: string;
    }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    postAPIHook?: (context: {
        action: "SIGN_OUT" | "REFRESH_SESSION";
        requestInit: RequestInit;
        url: string;
        fetchResponse: Response;
    }) => Promise<void>;
    onHandleEvent?: (event: RecipeEvent) => void;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
