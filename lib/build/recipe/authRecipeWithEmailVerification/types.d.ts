import { NormalisedRecipeConfig, RecipeConfig } from "../recipeModule/types";
import {
    PreAndPostAPIHookAction as EmailVerificationAction,
    InputTypeOverride as EmailVerificationOverride,
} from "../emailverification/types";
export declare type InputType<Action> = RecipeConfig<EmailVerificationAction | Action>;
export declare type NormalisedInputType<Action> = NormalisedRecipeConfig<EmailVerificationAction | Action> & {
    override?: {
        emailVerification?: EmailVerificationOverride;
    };
};
