import Querier from "../../querier";
import { NormalisedAppInfo } from "../../types";
import { getQueryParams } from "../../utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { NormalisedInputType, RecipeInterface } from "./types";

const EMAIL_VERIFY_PATH = "/user/email/verify";
const SEND_VERIFY_EMAIL_PATH = "/user/email/verify/token";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        verifyEmail: async function ({
            token,
            config,
            options,
        }: {
            token?: string;
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK" | "CUSTOM_RESPONSE";
            fetchResponse?: Response;
        }> {
            token = token === undefined ? getQueryParams("token") : token;

            if (token === undefined) {
                return {
                    status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR",
                };
            }

            const { json, fetchResponse } = await querier.post<{ status: string }>(
                EMAIL_VERIFY_PATH,
                {
                    body: JSON.stringify({
                        method: "token",
                        token,
                    }),
                },
                async (context) => {
                    let postRecipeHookContext = await config.preAPIHook({
                        ...context,
                        action: "VERIFY_EMAIL",
                    });

                    if (options === undefined || options.preAPIHook === undefined) {
                        return postRecipeHookContext;
                    }

                    return options.preAPIHook({
                        url: postRecipeHookContext.url,
                        requestInit: postRecipeHookContext.requestInit,
                    });
                }
            );

            if (json.status !== "OK" && json.status !== "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                return {
                    status: "CUSTOM_RESPONSE",
                    fetchResponse,
                };
            }

            return {
                status: json.status,
                fetchResponse,
            };
        },

        isEmailVerified: async function ({
            config,
            options,
        }: {
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
        }): Promise<
            | {
                  status: "OK";
                  isVerified: boolean;
                  fetchResponse: Response;
              }
            | {
                  status: "CUSTOM_RESPONSE";
                  fetchResponse: Response;
              }
        > {
            const { json, fetchResponse } = await querier.get<{ status: string; isVerified: boolean }>(
                EMAIL_VERIFY_PATH,
                {},
                undefined,
                async (context) => {
                    let postRecipeHookContext = await config.preAPIHook({
                        ...context,
                        action: "IS_EMAIL_VERIFIED",
                    });

                    if (options === undefined || options.preAPIHook === undefined) {
                        return postRecipeHookContext;
                    }

                    return options.preAPIHook({
                        url: postRecipeHookContext.url,
                        requestInit: postRecipeHookContext.requestInit,
                    });
                }
            );

            if (json.status !== "OK") {
                return {
                    status: "CUSTOM_RESPONSE",
                    fetchResponse,
                };
            }

            return {
                status: "OK",
                isVerified: json.isVerified,
                fetchResponse,
            };
        },

        sendVerificationEmail: async function ({
            config,
            options,
        }: {
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
        }): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" | "CUSTOM_RESPONSE";
            fetchResponse: Response;
        }> {
            const { json, fetchResponse } = await querier.post<{ status: string }>(
                SEND_VERIFY_EMAIL_PATH,
                {},
                async (context) => {
                    let postRecipeHookContext = await config.preAPIHook({
                        ...context,
                        action: "SEND_VERIFY_EMAIL",
                    });

                    if (options === undefined || options.preAPIHook === undefined) {
                        return postRecipeHookContext;
                    }

                    return options.preAPIHook({
                        url: postRecipeHookContext.url,
                        requestInit: postRecipeHookContext.requestInit,
                    });
                }
            );

            if (json.status !== "OK" && json.status !== "EMAIL_ALREADY_VERIFIED_ERROR") {
                return {
                    status: "CUSTOM_RESPONSE",
                    fetchResponse,
                };
            }

            return {
                status: json.status,
                fetchResponse,
            };
        },
    };
}
