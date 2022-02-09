import { RecipePostAPIHookContext, RecipePreAPIHookContext } from "../../types";
import { RecipeConfig } from "./types";
export default abstract class RecipeModule<
    Action,
    PreAPIHookContext extends RecipePreAPIHookContext<Action>,
    PostAPIHookContext extends RecipePostAPIHookContext<Action>,
    Config extends RecipeConfig<Action, PreAPIHookContext, PostAPIHookContext>
> {
    config: Config;
    constructor(config: Config);
}
