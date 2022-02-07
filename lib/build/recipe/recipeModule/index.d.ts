import { RecipePreAPIHookContext } from "../../types";
import { RecipeConfig } from "./types";
export default abstract class RecipeModule<
    Action,
    PreAPIHookContext extends RecipePreAPIHookContext<Action>,
    Config extends RecipeConfig<Action, PreAPIHookContext>
> {
    config: Config;
    constructor(config: Config);
}
