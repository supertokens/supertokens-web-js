import RecipeModule from "./recipe/recipeModule";
import { NormalisedAppInfo, SuperTokensConfig } from "./types";
export default class SuperTokens {
    private static instance?;
    appInfo: NormalisedAppInfo;
    recipeList: RecipeModule<any, any, any, any>[];
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    static reset(): void;
}
