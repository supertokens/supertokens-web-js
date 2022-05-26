import { NormalisedRecipeConfig, RecipeConfig } from "../recipeModule/types";
import {
    PreAndPostAPIHookAction as EmailVerificationAction,
    InputTypeOverride as EmailVerificationOverride,
} from "../emailverification/types";
export declare type InputType<Action> = RecipeConfig<PreAndPostAPIHookAction | Action>;
export declare type PreAndPostAPIHookAction = EmailVerificationAction;
export declare type NormalisedInputType<Action> = NormalisedRecipeConfig<PreAndPostAPIHookAction | Action> & {
    override?: {
        emailVerification?: EmailVerificationOverride;
    };
};
export declare type UserType = {
    id: string;
    email: string;
    timeJoined: number;
};
