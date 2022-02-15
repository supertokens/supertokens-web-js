import { NormalisedRecipeConfig, RecipeConfig } from "./types";
export declare function normaliseRecipeModuleConfig<Action>(
    config: RecipeConfig<Action>
): NormalisedRecipeConfig<Action>;
