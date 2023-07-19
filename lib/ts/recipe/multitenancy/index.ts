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

import { getNormalisedUserContext } from "../../utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { AllowedDomainsClaim } from "./allowedDomainsClaim";
import Recipe from "./recipe";
import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    /**
     * Gets enabled login methods and their configuration from the backend
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     *
     * @returns `{status: OK, emailpassword, passwordless, thirdParty}` if successful
     */
    static getLoginMethods(input?: { tenantId?: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        emailPassword: {
            enabled: boolean;
        };
        passwordless: {
            enabled: boolean;
        };
        thirdParty: {
            enabled: boolean;
            providers: {
                id: string;
                name: string;
            }[];
        };
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.getLoginMethods({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Gets enabled login methods and their configuration from the backend
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns `Promise<string | undefined> | string | undefined`
     */
    static getTenantId(input?: { userContext?: any }): Promise<string | undefined> | string | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getTenantId({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
    static AllowedDomainsClaim = AllowedDomainsClaim;
}

const init = RecipeWrapper.init;
const getLoginMethods = RecipeWrapper.getLoginMethods;
const getTenantId = RecipeWrapper.getTenantId;

export {
    init,
    getLoginMethods,
    getTenantId,
    RecipeInterface,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    AllowedDomainsClaim,
};
