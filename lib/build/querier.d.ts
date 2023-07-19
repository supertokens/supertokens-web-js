import { NormalisedAppInfo } from "./types";
import {
    PostAPIHookFunction,
    PreAPIHookFunction,
    RecipeFunctionOptions,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
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
    private readonly recipeId;
    private readonly appInfo;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    get: <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        queryParams?: Record<string, string>,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    post: <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    delete: <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    put: <JsonBodyType>(
        tenantId: string | undefined,
        path: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ) => Promise<{
        jsonBody: JsonBodyType;
        fetchResponse: Response;
    }>;
    fetch: (
        url: string,
        config: RequestInit,
        preAPIHook?: PreAPIHookFunction,
        postAPIHook?: PostAPIHookFunction
    ) => Promise<Response>;
    callPreAPIHook: (context: { preAPIHook?: PreAPIHookFunction; requestInit: RequestInit; url: string }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    getFullUrl: (tenantId: string | undefined, pathStr: string, queryParams?: Record<string, string>) => string;
    getResponseJsonOrThrowGeneralError: (response: Response) => Promise<any>;
    static preparePreAPIHook: <Action>({
        recipePreAPIHook,
        action,
        options,
        userContext,
    }: {
        recipePreAPIHook: RecipePreAPIHookFunction<Action>;
        action: Action;
        options?: RecipeFunctionOptions | undefined;
        userContext: any;
    }) => PreAPIHookFunction;
    static preparePostAPIHook: <Action>({
        recipePostAPIHook,
        action,
        userContext,
    }: {
        recipePostAPIHook: RecipePostAPIHookFunction<Action>;
        action: Action;
        userContext: any;
    }) => PostAPIHookFunction;
}
