import { RecipeConfig } from "./types";
export default abstract class RecipeModule<Action> {
    config: RecipeConfig<Action>;
    constructor(config: RecipeConfig<Action>);
}
