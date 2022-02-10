import { NormalisedAppInfo } from "./types";
import {
    NormalisedRecipeConfig,
    PostAPIHookFunction,
    PreAPIHookFunction,
    RecipeFunctionOptions,
} from "./recipe/recipeModule/types";
export default class Querier {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    get: <JsonBodyType>(
        path: string,
        config: RequestInit,
        queryParams?: Record<string, string> | undefined,
        preAPIHook?: PreAPIHookFunction | undefined,
        postAPIHook?: PostAPIHookFunction | undefined
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    post: <JsonBodyType>(
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction | undefined,
        postAPIHook?: PostAPIHookFunction | undefined
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    delete: <JsonBodyType>(
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction | undefined,
        postAPIHook?: PostAPIHookFunction | undefined
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    put: <JsonBodyType>(
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction | undefined,
        postAPIHook?: PostAPIHookFunction | undefined
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    fetch: (
        url: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction | undefined,
        postAPIHook?: PostAPIHookFunction | undefined
    ) => Promise<Response>;
    callPreAPIHook: (context: { preAPIHook?: PreAPIHookFunction; requestInit: RequestInit; url: string }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    getFullUrl: (pathStr: string, queryParams?: Record<string, string> | undefined) => string;
    getResponseJsonOrThrowGeneralError: (response: Response) => Promise<any>;
    static preparePreAPIHook: <Action>({
        config,
        action,
        options,
        userContext,
    }: {
        config: NormalisedRecipeConfig<Action>;
        action: Action;
        options?: RecipeFunctionOptions | undefined;
        userContext: any;
    }) => PreAPIHookFunction;
    static preparePostAPIHook: <Action>({
        config,
        action,
        userContext,
    }: {
        config: NormalisedRecipeConfig<Action>;
        action: Action;
        userContext: any;
    }) => PostAPIHookFunction;
}
