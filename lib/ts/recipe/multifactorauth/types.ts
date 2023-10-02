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
import {
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
} from "../authRecipe/types";
import {
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    UserInput as RecipeModuleUserInput,
    RecipeFunctionOptions,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";

export type PreAndPostAPIHookAction = "GET_MFA_INFO";

export type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;

export type UserInput = {
    customFactorChecker?: (
        completedFactors: MFAClaimValue["c"],
        id: string,
        params: any,
        accessTokenPayload: any,
        userContext: any
    ) =>
        | {
              isValid: true;
          }
        | {
              isValid: false;
              message?: string;
          }
        | undefined;

    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;

export type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;

export type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    customFactorChecker: (
        completedFactors: MFAClaimValue["c"],
        id: string,
        params: any,
        accessTokenPayload: any,
        userContext: any
    ) =>
        | {
              isValid: true;
          }
        | {
              isValid: false;
              message?: string;
          }
        | undefined;

    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type MFAInfo = {
    factorsEnabled: string[];
    factorsSetup: string[];
    nextFactors: string[];
};

export type RecipeInterface = {
    getMFAInfo: (input: {
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{ status: "OK"; info: MFAInfo }>;

    checkFactorRequirement: (input: {
        completedFactors: MFAClaimValue["c"];
        req: MFARequirement;
        payload: any;

        options?: RecipeFunctionOptions;
        userContext: any;
    }) => {
        id: string;
        isValid: boolean;
        message?: string;
    };
};

export type MFARequirement =
    | {
          id: string;
          params?: any;
      }
    | string;

export type MFARequirementList = (
    | {
          oneOf: MFARequirement[];
      }
    | {
          allOf: MFARequirement[];
      }
    | MFARequirement
)[];

export type MFAClaimValue = {
    c: Record<string, number>;
    n: string[];
};
