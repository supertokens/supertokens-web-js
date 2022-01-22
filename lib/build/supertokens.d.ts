import RecipeModule from "./recipe/recipeModule";
import { NormalisedAppInfo, SuperTokensConfig } from "./types";
import { NormalisedRecipeConfig } from "./recipe/recipeModule/types";
export default class SuperTokens {
    private static instance?;
    appInfo: NormalisedAppInfo;
    recipeList: RecipeModule<any, any>[];
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    getRecipeOrThrow<PreAPIHookContext, Config extends NormalisedRecipeConfig<PreAPIHookContext>>(
        recipeId: string
    ): RecipeModule<PreAPIHookContext, Config>;
    static reset(): void;
}
