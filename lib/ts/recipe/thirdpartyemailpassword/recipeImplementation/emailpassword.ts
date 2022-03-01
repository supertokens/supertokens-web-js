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
import { RecipeInterface } from "../../emailpassword/types";
import { RecipeInterface as ThirdPartyEmailPasswordRecipeInterface } from "../types";

export default function getRecipeImplementation(
    originalImplementation: ThirdPartyEmailPasswordRecipeInterface
): RecipeInterface {
    return {
        doesEmailExist: originalImplementation.doesEmailExist.bind(originalImplementation),
        sendPasswordResetEmail: originalImplementation.sendPasswordResetEmail.bind(originalImplementation),
        submitNewPassword: originalImplementation.submitNewPassword.bind(originalImplementation),
        getResetPasswordTokenFromURL: originalImplementation.getResetPasswordTokenFromURL.bind(originalImplementation),
        signIn: async function (input) {
            const response = await originalImplementation.signInAndUp({
                type: "emailpassword",
                isSignIn: true,
                ...input,
            });

            if (response.type === "emailpassword") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        user: response.user,
                        fetchResponse: response.fetchResponse,
                    };
                } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    return {
                        status: "WRONG_CREDENTIALS_ERROR",
                        fetchResponse: response.fetchResponse,
                    };
                } else {
                    return {
                        status: "FIELD_ERROR",
                        formFields: response.formFields,
                        fetchResponse: response.fetchResponse,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
        signUp: async function (input) {
            const response = await originalImplementation.signInAndUp({
                type: "emailpassword",
                isSignIn: false,
                ...input,
            });

            if (response.type === "emailpassword") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        user: response.user,
                        fetchResponse: response.fetchResponse,
                    };
                } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    throw Error("Should never come here");
                } else {
                    return {
                        status: "FIELD_ERROR",
                        formFields: response.formFields,
                        fetchResponse: response.fetchResponse,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
    };
}
