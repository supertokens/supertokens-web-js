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
import { RecipeInterface as ThirdPartyEmailPasswordRecipeInterface } from "../types";
import { RecipeInterface } from "../../thirdparty/types";

export default function getRecipeImplementation(
    originalImplementation: ThirdPartyEmailPasswordRecipeInterface
): RecipeInterface {
    return {
        getOAuthAuthorisationURL: originalImplementation.getOAuthAuthorisationURL.bind(originalImplementation),
        getOAuthState: originalImplementation.getOAuthState.bind(originalImplementation),
        getThirdPartyLoginRedirectURLWithQueryParams:
            originalImplementation.getThirdPartyLoginRedirectURLWithQueryParams.bind(originalImplementation),
        setOAuthState: originalImplementation.setOAuthState.bind(originalImplementation),
        signInAndUp: async function (input) {
            const response = await originalImplementation.signInAndUp({
                type: "thirdparty",
                ...input,
            });

            if (response.type === "thirdparty") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        createdNewUser: response.createdNewUser,
                        user: response.user,
                        fetchResponse: response.fetchResponse,
                    };
                } else if (response.status === "FIELD_ERROR") {
                    return {
                        status: "FIELD_ERROR",
                        error: response.error,
                        fetchResponse: response.fetchResponse,
                    };
                } else {
                    return {
                        status: response.status,
                        fetchResponse: response.fetchResponse,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
    };
}
