import {
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
} from "../authRecipe/types";
import {
    RecipeFunctionOptions,
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction = "GET_LOGIN_METHODS";
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
export declare type RecipeInterface = {
    /**
     * Gets enabled login methods and their configuration
     *
     * @param userContext
     *
     * @returns Dynamic login methods
     */
    getLoginMethods: (input: { tenantId?: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        emailpassword: {
            enabled: boolean;
        };
        passwordless: {
            enabled: boolean;
        };
        thirdParty: {
            enabled: boolean;
            providers: {
                id: string;
                name: string;
            }[];
        };
        fetchResponse: Response;
    }>;
};
