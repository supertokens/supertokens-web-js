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

import { User } from "../../types";
import { getNormalisedUserContext } from "../../utils";
import Multitenancy from "../multitenancy/recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";
import Recipe from "./recipe";
import {
    PasswordlessFlowType,
    PostAPIHookContext,
    PreAPIHookContext,
    RecipeInterface,
    PreAndPostAPIHookAction,
    UserInput,
} from "./types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    /**
     * Create and send a code to the user for passwordless auth
     *
     * @param email Email of the user, ignored if `phoneNumber` is provided
     *
     * @param phoneNumber Phone number of the user
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", deviceId, preAuthSessionId, flowType}` If successful
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async createCode(
        input:
            | { email: string; tryLinkingWithSessionUser?: boolean; userContext?: any; options?: RecipeFunctionOptions }
            | {
                  phoneNumber: string;
                  tryLinkingWithSessionUser?: boolean;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
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
    > {
        const recipe: Recipe = Recipe.getInstanceOrThrow();
        const recipeImplementation = recipe.recipeImplementation;

        const normalisedUserContext = getNormalisedUserContext(input.userContext);

        const tenantId = await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({
            userContext: input.userContext,
        });
        const createCodeResponse = await recipeImplementation.createCode({
            ...input,
            tryLinkingWithSessionUser: input.tryLinkingWithSessionUser,
            userContext: normalisedUserContext,
        });

        if (createCodeResponse.status === "OK") {
            await recipeImplementation.setLoginAttemptInfo({
                attemptInfo: {
                    tenantId,
                    deviceId: createCodeResponse.deviceId,
                    preAuthSessionId: createCodeResponse.preAuthSessionId,
                    tryLinkingWithSessionUser: input.tryLinkingWithSessionUser,
                    flowType: createCodeResponse.flowType,
                },
                userContext: normalisedUserContext,
            });
        }

        return createCodeResponse;
    }

    /**
     * Resend the code to the user
     *
     * @param deviceId The device if from the reponse of `createCode`
     *
     * @param preAuthSessionId The id from the response of `createCode`
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if succesful
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async resendCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        const recipe: Recipe = Recipe.getInstanceOrThrow();
        const recipeImplementation = recipe.recipeImplementation;

        const normalisedUserContext = getNormalisedUserContext(input?.userContext);

        const previousAttemptInfo = await recipeImplementation.getLoginAttemptInfo({
            userContext: normalisedUserContext,
        });

        /**
         * If previousAttemptInfo is undefined then local storage was probably cleared by another tab.
         * In this case we use empty strings when calling the API because we want to
         * return "RESTART_FLOW_ERROR"
         */
        return recipeImplementation.resendCode({
            ...input,
            tenantId: previousAttemptInfo?.tenantId,
            userContext: normalisedUserContext,
            deviceId: previousAttemptInfo === undefined ? "" : previousAttemptInfo.deviceId,
            preAuthSessionId: previousAttemptInfo === undefined ? "" : previousAttemptInfo.preAuthSessionId,
            tryLinkingWithSessionUser: previousAttemptInfo?.tryLinkingWithSessionUser,
        });
    }

    /**
     * Log the user in using the input code or link code
     *
     * @param userInputCode Code that the user inputs
     *
     * @param deviceId The device if from the reponse of `createCode`. (Not required when using `linkCode`)
     *
     * @param preAuthSessionId The id from the response of `createCode`.
     *
     * @param linkCode The code from the URL to use when logging the user in. Ignored if `userInputCode` is provided
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", user, createdNewRecipeUser: bool}` if succesful
     *
     * @returns `{status: "INCORRECT_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is incorrect
     *
     * @returns `{status: "EXPIRED_USER_INPUT_CODE_ERROR", failedCodeInputAttemptCount, maximumCodeInputAttempts}` if the code is expired
     *
     * @returns `{status: "RESTART_FLOW_ERROR"}` if the auth flow should be restarted
     * @returns `{status: "SIGN_IN_UP_NOT_ALLOWED", reason: string}` if sign in or up is not allowed because of account-linking conflicts
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async consumeCode(
        input?:
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
        | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
        | { status: "SIGN_IN_UP_NOT_ALLOWED"; reason: string; fetchResponse: Response }
    > {
        const recipe: Recipe = Recipe.getInstanceOrThrow();
        const recipeImplementation = recipe.recipeImplementation;
        const userContext = getNormalisedUserContext(input?.userContext);

        let additionalParams:
            | {
                  tenantId: string | undefined;
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
                  tryLinkingWithSessionUser: boolean | undefined;
              }
            | {
                  tenantId: string | undefined;
                  linkCode: string;
                  preAuthSessionId: string;
                  tryLinkingWithSessionUser: boolean | undefined;
              };

        if (input !== undefined && "userInputCode" in input) {
            const attemptInfoFromStorage = await recipeImplementation.getLoginAttemptInfo({
                userContext: userContext,
            });

            /**
             * If attemptInfoFromStorage is undefined then local storage was probably cleared by another tab.
             * In this case we use empty strings when calling the API because we want to
             * return "RESTART_FLOW_ERROR"
             *
             * Note: We dont do this for the linkCode flow because that does not depend on local storage.
             */

            additionalParams = {
                userInputCode: input.userInputCode,
                deviceId: attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.deviceId,
                preAuthSessionId: attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.preAuthSessionId,
                tryLinkingWithSessionUser: attemptInfoFromStorage?.tryLinkingWithSessionUser,
                tenantId: attemptInfoFromStorage?.tenantId,
            };
        } else {
            const linkCode = recipeImplementation.getLinkCodeFromURL({
                userContext,
            });

            const tenantId = recipeImplementation.getTenantIdFromURL({
                userContext,
            });

            const preAuthSessionId = recipeImplementation.getPreAuthSessionIdFromURL({
                userContext: userContext,
            });

            additionalParams = {
                tenantId,
                linkCode,
                preAuthSessionId,
                tryLinkingWithSessionUser: undefined, // TODO: verify
            };
        }

        return recipeImplementation.consumeCode({
            userContext: userContext,
            options: input?.options,
            ...additionalParams,
        });
    }

    /**
     * Reads and returns the link code from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The hash (#) property of the current URL
     */
    static getLinkCodeFromURL(input?: { userContext?: any }): string {
        return Recipe.getInstanceOrThrow().recipeImplementation.getLinkCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Reads and returns the pre auth session id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "preAuthSessionId" query parameter from the current URL
     */
    static getPreAuthSessionIdFromURL(input?: { userContext?: any }): string {
        return Recipe.getInstanceOrThrow().recipeImplementation.getPreAuthSessionIdFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Reads and returns the tenant id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns The "tenantId" query parameter from the current location
     */
    static getTenantIdFromURL(input?: { userContext?: any }): string | undefined {
        return Recipe.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Check if a user with the given email exists
     *
     * @param email Email to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static doesEmailExist(input: { email: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Check if a user with the given phone number exists
     *
     * @param phoneNumber Phone number to check
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", doesExist: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static doesPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().recipeImplementation.doesPhoneNumberExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Get information about the current login attempt from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     *
     * @returns `{deviceId, preAuthSessionId, flowType}` if present, returns undefined otherwise
     */
    static getLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              tenantId?: string | string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.getLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Set information about the current login attempt to storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    static async setLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            tryLinkingWithSessionUser?: boolean;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        const userContext = getNormalisedUserContext(input.userContext);
        const recipe = Recipe.getInstanceOrThrow();
        const tenantId = await Multitenancy.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext });
        return recipe.recipeImplementation.setLoginAttemptInfo({
            attemptInfo: {
                tenantId,
                tryLinkingWithSessionUser: input.attemptInfo.tryLinkingWithSessionUser,
                ...input.attemptInfo,
            },
            userContext,
        });
    }

    /**
     * Clear any information about login attempts from storage
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/passwordless/advanced-customizations/user-context the documentation}
     */
    static clearLoginAttemptInfo(input?: { userContext?: any }): Promise<void> {
        return Recipe.getInstanceOrThrow().recipeImplementation.clearLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static signOut(input?: { userContext?: any }) {
        return Recipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const createCode = RecipeWrapper.createCode;
const resendCode = RecipeWrapper.resendCode;
const consumeCode = RecipeWrapper.consumeCode;
const doesEmailExist = RecipeWrapper.doesEmailExist;
const doesPhoneNumberExist = RecipeWrapper.doesPhoneNumberExist;
const signOut = RecipeWrapper.signOut;
const getLinkCodeFromURL = RecipeWrapper.getLinkCodeFromURL;
const getPreAuthSessionIdFromURL = RecipeWrapper.getPreAuthSessionIdFromURL;
const getTenantIdFromURL = RecipeWrapper.getTenantIdFromURL;
const getLoginAttemptInfo = RecipeWrapper.getLoginAttemptInfo;
const setLoginAttemptInfo = RecipeWrapper.setLoginAttemptInfo;
const clearLoginAttemptInfo = RecipeWrapper.clearLoginAttemptInfo;

export {
    init,
    createCode,
    resendCode,
    consumeCode,
    doesEmailExist,
    doesPhoneNumberExist,
    signOut,
    getLinkCodeFromURL,
    getPreAuthSessionIdFromURL,
    getTenantIdFromURL,
    getLoginAttemptInfo,
    setLoginAttemptInfo,
    clearLoginAttemptInfo,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
};
