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
import Querier from "../../querier";
import { RecipeInterface } from "./types";
import { NormalisedAppInfo } from "../../types";
import { getQueryParams } from "../../utils";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { NormalisedInputType, UserType } from "./types";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        submitNewPassword: async function ({
            formFields,
            token,
            config,
            options,
            userContext,
        }: {
            formFields: {
                id: string;
                value: string;
            }[];
            token?: string;
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
                  fetchResponse: Response;
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  fetchResponse: Response;
              }
        > {
            token = token === undefined ? getQueryParams("token") : token;

            if (token === undefined) {
                token = "";
            }

            const { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
                  }
                | {
                      status: "FIELD_ERROR";
                      formFields: {
                          id: string;
                          error: string;
                      }[];
                  }
            >(
                "/user/password/reset",
                { body: JSON.stringify({ formFields, token, method: "token" }) },
                Querier.preparePreAPIHook({
                    config,
                    action: "SUBMIT_NEW_PASSWORD",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    config,
                    action: "SUBMIT_NEW_PASSWORD",
                    userContext,
                })
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    fetchResponse,
                };
            }

            return {
                status: jsonBody.status,
                fetchResponse,
            };
        },

        sendPasswordResetEmail: async function ({
            formFields,
            config,
            options,
            userContext,
        }: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK";
                  fetchResponse: Response;
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  fetchResponse: Response;
              }
        > {
            let { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                  }
                | {
                      status: "FIELD_ERROR";
                      formFields: {
                          id: string;
                          error: string;
                      }[];
                  }
            >(
                "/user/password/reset/token",
                { body: JSON.stringify({ formFields }) },
                Querier.preparePreAPIHook({
                    config,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    config,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                    userContext,
                })
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    fetchResponse,
                };
            }

            return {
                status: jsonBody.status,
                fetchResponse,
            };
        },

        signUp: async function ({
            formFields,
            config,
            options,
            userContext,
        }: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK";
                  user: UserType;
                  fetchResponse: Response;
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  fetchResponse: Response;
              }
        > {
            let { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      user: UserType;
                  }
                | {
                      status: "FIELD_ERROR";
                      formFields: {
                          id: string;
                          error: string;
                      }[];
                  }
            >(
                "/signup",
                { body: JSON.stringify({ formFields }) },
                Querier.preparePreAPIHook({
                    config,
                    action: "EMAIL_PASSWORD_SIGN_UP",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    config,
                    action: "EMAIL_PASSWORD_SIGN_UP",
                    userContext,
                })
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    fetchResponse,
                };
            }

            return {
                status: jsonBody.status,
                user: jsonBody.user,
                fetchResponse,
            };
        },

        signIn: async function ({
            formFields,
            config,
            options,
            userContext,
        }: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<
            | {
                  status: "OK";
                  user: UserType;
                  fetchResponse: Response;
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  fetchResponse: Response;
              }
            | {
                  status: "WRONG_CREDENTIALS_ERROR";
                  fetchResponse: Response;
              }
        > {
            let { jsonBody, fetchResponse } = await querier.post<
                | {
                      status: "OK";
                      user: UserType;
                  }
                | {
                      status: "FIELD_ERROR";
                      formFields: {
                          id: string;
                          error: string;
                      }[];
                  }
                | {
                      status: "WRONG_CREDENTIALS_ERROR";
                  }
            >(
                "/signin",
                { body: JSON.stringify({ formFields }) },
                Querier.preparePreAPIHook({
                    config,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    config,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    userContext,
                })
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    fetchResponse,
                };
            }

            if (jsonBody.status === "WRONG_CREDENTIALS_ERROR") {
                return {
                    status: "WRONG_CREDENTIALS_ERROR",
                    fetchResponse,
                };
            }

            return {
                status: "OK",
                user: jsonBody.user,
                fetchResponse,
            };
        },

        doesEmailExist: async function ({
            email,
            config,
            options,
            userContext,
        }: {
            email: string;
            config: NormalisedInputType;
            options?: RecipeFunctionOptions;
            userContext: any;
        }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            let { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                exists: boolean;
            }>(
                "/signup/email/exists",
                {},
                { email },
                Querier.preparePreAPIHook({
                    config,
                    action: "EMAIL_EXISTS",
                    options,
                    userContext,
                }),
                Querier.preparePostAPIHook({
                    config,
                    action: "EMAIL_EXISTS",
                    userContext,
                })
            );

            return {
                status: jsonBody.status,
                doesExist: jsonBody.exists,
                fetchResponse,
            };
        },
    };
}
