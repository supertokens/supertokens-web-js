import { NormalisedRecipeConfig } from "./types";
export default abstract class RecipeModule<Action, NormalisedConfig extends NormalisedRecipeConfig<Action>> {
    config: NormalisedConfig;
    constructor(config: NormalisedConfig);
}
