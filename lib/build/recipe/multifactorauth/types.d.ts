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
export declare type PreAndPostAPIHookAction = "GET_MFA_INFO";
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type UserInput = {
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
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
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
export declare type MFAInfo = {
    factorsEnabled: string[];
    factorsSetup: string[];
    nextFactors: string[];
};
export declare type RecipeInterface = {
    getMFAInfo: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        info: MFAInfo;
    }>;
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
export declare type MFARequirement =
    | {
          id: string;
          params?: any;
      }
    | string;
export declare type MFARequirementList = (
    | {
          oneOf: MFARequirement[];
      }
    | {
          allOf: MFARequirement[];
      }
    | MFARequirement
)[];
export declare type MFAClaimValue = {
    c: Record<string, number>;
    n: string[];
};
