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
export declare type PreAndPostAPIHookAction =
    | "GET_LOGIN_CHALLENGE_INFO"
    | "GET_REDIRECT_URL_TO_CONTINUE_OAUTH_FLOW"
    | "LOG_OUT";
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
    getLoginChallengeInfo: (input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        info: LoginInfo;
        fetchResponse: Response;
    }>;
    getRedirectURLToContinueOAuthFlow: (input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }>;
    logOut: (input: { logoutChallenge: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }>;
};
export declare type LoginInfo = {
    clientId: string;
    clientName: string;
    tosUri?: string;
    policyUri?: string;
    logoUri?: string;
    clientUri?: string;
    metadata?: Record<string, any> | null;
};
