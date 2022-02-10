import { NormalisedAppInfo } from "./types";
import {
    NormalisedRecipeConfig,
    PostAPIHookFunction,
    PreAPIHookFunction,
    RecipeFunctionOptions,
} from "./recipe/recipeModule/types";
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
