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
import { RecipeInterface as STWebsiteRecipeInterface } from "supertokens-website";
import { NormalisedAppInfo } from "../../types";
import OverrideableBuilder from "supertokens-js-override";
import { RecipePostAPIHookFunction, RecipePreAPIHookFunction } from "../recipeModule/types";

export type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED" | "ACCESS_TOKEN_PAYLOAD_UPDATED";
          userContext: any;
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
          userContext: any;
      };

export type UserInput = {
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

export type RecipeInterface = STWebsiteRecipeInterface;

export type InputType = {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    enableDebugLogs: boolean;
} & UserInput;
