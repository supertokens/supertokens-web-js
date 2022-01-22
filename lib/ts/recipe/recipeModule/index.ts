import { RecipeConfig } from "./types";

export default abstract class RecipeModule<PreAPIHookContext, Config extends RecipeConfig<PreAPIHookContext>> {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }
}
