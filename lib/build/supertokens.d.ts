import RecipeModule from "./recipe/recipeModule";
import { NormalisedAppInfo, NormalisedStorageHandlers, SuperTokensConfig } from "./types";
export default class SuperTokens {
    private static instance?;
    appInfo: NormalisedAppInfo;
    storageHandlers: NormalisedStorageHandlers;
    recipeList: RecipeModule<any, any>[];
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    static reset(): void;
}
