import { RecipeConfig } from "./types";
export default abstract class RecipeModule<Action, Config extends RecipeConfig<Action>> {
    config: Config;
    constructor(config: Config);
}
