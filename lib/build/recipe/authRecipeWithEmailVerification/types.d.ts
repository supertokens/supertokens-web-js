import { NormalisedRecipeConfig, RecipeConfig } from "../recipeModule/types";
import {
    InputType as EmailVerificationInputType,
    RecipeInterface as EmailVerificationRecipeInterface,
} from "../emailverification/types";
export declare type InputType<PreAPIHookContext> = RecipeConfig<PreAPIHookContext> & {
    emailVerificationFeature?: EmailVerificationInputType;
};
export declare type NormalisedInputType<PreAPIHookContext> = NormalisedRecipeConfig<PreAPIHookContext> & {
    emailVerificationFeature?: EmailVerificationInputType;
    override?: {
        emailVerification?: {
            functions?: (originalImplementation: EmailVerificationRecipeInterface) => EmailVerificationRecipeInterface;
        };
    };
};
