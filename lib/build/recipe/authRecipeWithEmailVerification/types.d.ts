import { NormalisedRecipeConfig, RecipeConfig } from "../recipeModule/types";
import {
    InputType as EmailVerificationInputType,
    RecipeInterface as EmailVerificationRecipeInterface,
} from "../emailverification/types";
import { RecipePreAPIHookContext } from "../../types";
export declare type InputType<Action, PreAPIHookContext extends RecipePreAPIHookContext<Action>> = RecipeConfig<
    Action,
    PreAPIHookContext
> & {
    emailVerificationFeature?: EmailVerificationInputType;
};
export declare type NormalisedInputType<
    Action,
    PreAPIHookContext extends RecipePreAPIHookContext<Action>
> = NormalisedRecipeConfig<Action, PreAPIHookContext> & {
    emailVerificationFeature?: EmailVerificationInputType;
    override?: {
        emailVerification?: {
            functions?: (originalImplementation: EmailVerificationRecipeInterface) => EmailVerificationRecipeInterface;
        };
    };
};
