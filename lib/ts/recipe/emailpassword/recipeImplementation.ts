/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
import { RecipeFunctionOptions, UserType } from "../recipeModule/types";
import { NormalisedInputType, PreAPIAction } from "./types";

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
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
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
                userContext,
                Querier.preparePreAPIHook<PreAPIAction>({
                    config,
                    action: "SUBMIT_NEW_PASSWORD",
                    options,
                    userContext,
                }),
                config.postAPIHook
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    networkResponse: {
                        jsonBody,
                        fetchResponse,
                    },
                };
            }

            return {
                status: jsonBody.status,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
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
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
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
                userContext,
                Querier.preparePreAPIHook<PreAPIAction>({
                    config,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                    options,
                    userContext,
                }),
                config.postAPIHook
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    networkResponse: {
                        jsonBody,
                        fetchResponse,
                    },
                };
            }

            return {
                status: jsonBody.status,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
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
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
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
                userContext,
                Querier.preparePreAPIHook<PreAPIAction>({
                    config,
                    action: "EMAIL_PASSWORD_SIGN_UP",
                    options,
                    userContext,
                }),
                config.postAPIHook
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    networkResponse: {
                        jsonBody,
                        fetchResponse,
                    },
                };
            }

            return {
                status: jsonBody.status,
                user: jsonBody.user,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
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
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
              }
            | {
                  status: "FIELD_ERROR";
                  formFields: {
                      id: string;
                      error: string;
                  }[];
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
              }
            | {
                  status: "WRONG_CREDENTIALS_ERROR";
                  networkResponse: {
                      jsonBody: any;
                      fetchResponse: Response;
                  };
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
                userContext,
                Querier.preparePreAPIHook<PreAPIAction>({
                    config,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    options,
                    userContext,
                }),
                config.postAPIHook
            );

            if (jsonBody.status === "FIELD_ERROR") {
                return {
                    status: "FIELD_ERROR",
                    formFields: jsonBody.formFields,
                    networkResponse: {
                        jsonBody,
                        fetchResponse,
                    },
                };
            }

            if (jsonBody.status === "WRONG_CREDENTIALS_ERROR") {
                return {
                    status: "WRONG_CREDENTIALS_ERROR",
                    networkResponse: {
                        jsonBody,
                        fetchResponse,
                    },
                };
            }

            return {
                status: "OK",
                user: jsonBody.user,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
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
            networkResponse: {
                jsonBody: any;
                fetchResponse: Response;
            };
        }> {
            let { jsonBody, fetchResponse } = await querier.get<{
                status: "OK";
                exists: boolean;
            }>(
                "/signup/email/exists",
                {},
                userContext,
                { email },
                Querier.preparePreAPIHook<PreAPIAction>({
                    config,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    options,
                    userContext,
                }),
                config.postAPIHook
            );

            return {
                status: jsonBody.status,
                doesExist: jsonBody.exists,
                networkResponse: {
                    jsonBody,
                    fetchResponse,
                },
            };
        },
    };
}
