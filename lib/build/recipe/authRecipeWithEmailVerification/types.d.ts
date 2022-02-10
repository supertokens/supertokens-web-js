import { NormalisedRecipeConfig, RecipeConfig } from "../recipeModule/types";
import {
    InputType as EmailVerificationInputType,
    RecipeInterface as EmailVerificationRecipeInterface,
} from "../emailverification/types";
export declare type InputType<Action> = RecipeConfig<Action> & {
    emailVerificationFeature?: EmailVerificationInputType;
};
export declare type NormalisedInputType<Action> = NormalisedRecipeConfig<Action> & {
    emailVerificationFeature?: EmailVerificationInputType;
    override?: {
        emailVerification?: {
            functions?: (originalImplementation: EmailVerificationRecipeInterface) => EmailVerificationRecipeInterface;
        };
    };
};
