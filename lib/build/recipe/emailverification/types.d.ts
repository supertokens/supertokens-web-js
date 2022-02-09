import { NormalisedRecipeConfig, RecipeConfig, RecipeFunctionOptions } from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAPIHookAction = "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";
export declare type PreAPIHookContext = {
    action: PreAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type PostAPIHookContext = {
    action: PreAPIHookAction;
    requestInit: RequestInit;
    url: string;
    fetchResponse: Response;
    userContext: any;
};
export declare type InputType = RecipeConfig<PreAPIHookAction, PreAPIHookContext, PostAPIHookContext> & {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type NormalisedInputType = NormalisedRecipeConfig<
    PreAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext
> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type RecipeInterface = {
    verifyEmail: (input: {
        token?: string;
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;
    sendVerificationEmail: (input: {
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    isEmailVerified: (input: {
        config: NormalisedInputType;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
};
