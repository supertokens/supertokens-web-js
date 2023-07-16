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
import NormalisedURLPath from "./normalisedURLPath";
import { supported_fdi } from "./version";
import { NormalisedAppInfo } from "./types";
import {
    PostAPIHookFunction,
    PreAPIHookFunction,
    RecipeFunctionOptions,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "./recipe/recipeModule/types";
import STGeneralError from "./error";

/**
 * When network calls are made the Querier calls .clone() on the response before:
 * 1. Calling the post API hook
 * 2. Calling .json() when trying to read the body
 *
 * This is because the SDK needs to read the json body but we also want to allow users to read
 * the json body themselves (either in the post api hook or from the result of recipe functions)
 * for custom response handling. Since the body can only be read once we use .clone() to allow
 * for multiple reads.
 */
export default class Querier {
    constructor(private readonly recipeId: string, private readonly appInfo: NormalisedAppInfo) {}

    get = async <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        queryParams?: Record<string, string>,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ): Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }> => {
        const result = await this.fetch(
            await this.getFullUrl(tenantId, path, queryParams),
            {
                method: "GET",
                ...config,
            },
            preAPIHook,
            postAPIHook
        );

        let jsonBody = await this.getResponseJsonOrThrowGeneralError(result);

        return {
            jsonBody,
            fetchResponse: result,
        };
    };

    post = async <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ): Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }> => {
        if (config.body === undefined) {
            throw new Error("Post request must have a body");
        }

        const result = await this.fetch(
            await this.getFullUrl(tenantId, path),
            {
                method: "POST",
                ...config,
            },
            preAPIHook,
            postAPIHook
        );

        let jsonBody = await this.getResponseJsonOrThrowGeneralError(result);

        return {
            jsonBody,
            fetchResponse: result,
        };
    };

    delete = async <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ): Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }> => {
        const result = await this.fetch(
            await this.getFullUrl(tenantId, path),
            {
                method: "DELETE",
                ...config,
            },
            preAPIHook,
            postAPIHook
        );

        let jsonBody = await this.getResponseJsonOrThrowGeneralError(result);

        return {
            jsonBody,
            fetchResponse: result,
        };
    };

    put = async <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ): Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }> => {
        const result = await this.fetch(
            await this.getFullUrl(tenantId, path),
            {
                method: "PUT",
                ...config,
            },
            preAPIHook,
            postAPIHook
        );

        let jsonBody = await this.getResponseJsonOrThrowGeneralError(result);

        return {
            jsonBody,
            fetchResponse: result,
        };
    };

    fetch = async (
        url: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ): Promise<Response> => {
        let headers;
        if (config === undefined) {
            headers = {};
        } else {
            headers = config.headers;
        }

        const { requestInit, url: modifiedUrl } = await this.callPreAPIHook({
            preAPIHook,
            url,
            requestInit: {
                ...config,
                headers: {
                    ...headers,
                    "fdi-version": supported_fdi.join(","),
                    "Content-Type": "application/json",
                    rid: this.recipeId,
                },
            },
        });

        const result = await fetch(modifiedUrl, requestInit);

        if (result.status >= 300) {
            throw result;
        }

        if (postAPIHook !== undefined) {
            const reponseForPostAPI = result.clone();

            await postAPIHook({
                requestInit,
                url,
                fetchResponse: reponseForPostAPI,
            });
        }

        return result;
    };

    /*
     * For backward compatibility
     */
    callPreAPIHook = async (context: {
        preAPIHook?: PreAPIHookFunction;
        requestInit: RequestInit;
        url: string;
    }): Promise<{ url: string; requestInit: RequestInit }> => {
        if (context.preAPIHook === undefined) {
            return {
                url: context.url,
                requestInit: context.requestInit,
            };
        }
        const result = await context.preAPIHook({
            url: context.url,
            requestInit: context.requestInit,
        });
        return result;
    };

    getFullUrl = async (
        tenantId: string | undefined,
        pathStr: string,
        queryParams?: Record<string, string>
    ): Promise<string> => {
        let basePath = this.appInfo.apiBasePath.getAsStringDangerous();
        if (tenantId !== undefined && tenantId !== "public") {
            basePath = `${basePath}/${tenantId}`;
        }

        const path = new NormalisedURLPath(pathStr);

        const fullUrl = `${this.appInfo.apiDomain.getAsStringDangerous()}${basePath}${path.getAsStringDangerous()}`;

        if (queryParams === undefined) {
            return fullUrl;
        }

        // If query params, add.
        return fullUrl + "?" + new URLSearchParams(queryParams);
    };

    getResponseJsonOrThrowGeneralError = async (response: Response): Promise<any> => {
        let json = await response.clone().json();

        if (json.status === "GENERAL_ERROR") {
            let message = json.message === undefined ? "No Error Message Provided" : json.message;
            throw new STGeneralError(message);
        }

        return json;
    };

    static preparePreAPIHook = <Action>({
        recipePreAPIHook,
        action,
        options,
        userContext,
    }: {
        recipePreAPIHook: RecipePreAPIHookFunction<Action>;
        action: Action;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): PreAPIHookFunction => {
        return async (context): Promise<{ url: string; requestInit: RequestInit }> => {
            let postRecipeHookContext = await recipePreAPIHook({
                ...context,
                action,
                userContext,
            });

            if (options === undefined || options.preAPIHook === undefined) {
                return postRecipeHookContext;
            }

            return options.preAPIHook({
                url: postRecipeHookContext.url,
                requestInit: postRecipeHookContext.requestInit,
                userContext,
            });
        };
    };

    static preparePostAPIHook = <Action>({
        recipePostAPIHook,
        action,
        userContext,
    }: {
        recipePostAPIHook: RecipePostAPIHookFunction<Action>;
        action: Action;
        userContext: any;
    }): PostAPIHookFunction => {
        return async (context) => {
            await recipePostAPIHook({
                ...context,
                userContext,
                action,
            });
        };
    };
}
