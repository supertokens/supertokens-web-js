import { RecipePreAPIHookContext } from "../../types";
import { InputType, NormalisedInputType } from "./types";
export declare function normaliseAuthRecipeWithEmailVerificationConfig<
    Action,
    PreAPIHookContext extends RecipePreAPIHookContext<Action>
>(config: InputType<Action, PreAPIHookContext>): NormalisedInputType<Action, PreAPIHookContext>;
