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
import { InputType, RecipeInterface, PreAPIHookContext, NormalisedInputType, PostAPIHookContext } from "./types";
import Recipe from "./recipe";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { getNormalisedUserContext } from "../../utils";

export default class RecipeWrapper {
    static init(config: InputType) {
        return Recipe.init(config);
    }

    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }) {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.submitNewPassword({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }) {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.sendPasswordResetEmail({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }) {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.signUp({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }) {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.signIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesEmailExist(input: {
        email: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }) {
        let recipeInstance: Recipe = Recipe.getInstanceOrThrow();

        return recipeInstance.recipeImplementation.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const submitNewPassword = RecipeWrapper.submitNewPassword;
const sendPasswordResetEmail = RecipeWrapper.sendPasswordResetEmail;
const signUp = RecipeWrapper.signUp;
const signIn = RecipeWrapper.signIn;
const doesEmailExist = RecipeWrapper.doesEmailExist;

export {
    init,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    InputType,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
};
