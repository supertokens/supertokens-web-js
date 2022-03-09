import RecipeModule from "../recipeModule";
import { NormalisedRecipeConfig } from "../recipeModule/types";
export default abstract class AuthRecipe<
    Action,
    NormalisedConfig extends NormalisedRecipeConfig<Action>
> extends RecipeModule<Action, NormalisedConfig> {
    constructor(config: NormalisedConfig);
    signOut: (input: { userContext: any }) => Promise<void>;
}
