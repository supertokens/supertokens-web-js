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
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type MFAFactorInfo = {
    alreadySetup: string[];
    allowedToSetup: string[];
    next: string[];
};
export declare type RecipeInterface = {
    resyncSessionAndFetchMFAInfo: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        factors: MFAFactorInfo;
        emails: Record<string, string[] | undefined>;
        phoneNumbers: Record<string, string[] | undefined>;
        fetchResponse: Response;
    }>;
};
export declare type MFARequirement = string;
export declare type MFARequirementList = (
    | {
          oneOf: MFARequirement[];
      }
    | {
          allOfInAnyOrder: MFARequirement[];
      }
    | MFARequirement
)[];
export declare type MFAClaimValue = {
    c: Record<string, number | undefined>;
    v: boolean;
};
