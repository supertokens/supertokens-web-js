import { NormalisedRecipeConfig, RecipeConfig, RecipeFunctionOptions } from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAPIHookContext = {
    action: "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";
    requestInit: RequestInit;
    url: string;
};
export declare type InputType = RecipeConfig<PreAPIHookContext> & {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type NormalisedInputType = NormalisedRecipeConfig<PreAPIHookContext> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type RecipeInterface = {
    verifyEmail: (input: { token?: string; config: NormalisedInputType; options?: RecipeFunctionOptions }) => Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        jsonBody: any;
        fetchResponse: Response;
    }>;
    sendVerificationEmail: (input: { config: NormalisedInputType; options?: RecipeFunctionOptions }) => Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        jsonBody: any;
        fetchResponse: Response;
    }>;
    isEmailVerified: (input: { config: NormalisedInputType; options?: RecipeFunctionOptions }) => Promise<{
        status: "OK";
        isVerified: boolean;
        jsonBody: any;
        fetchResponse: Response;
    }>;
};
