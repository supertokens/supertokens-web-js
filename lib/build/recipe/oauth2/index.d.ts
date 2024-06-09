import { PreAndPostAPIHookAction, PreAPIHookContext, PostAPIHookContext, RecipeInterface, UserInput } from "./types";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<never>;
}
declare const init: typeof RecipeWrapper.init;
export { init, RecipeInterface, PreAPIHookContext, PostAPIHookContext, PreAndPostAPIHookAction, UserInput };
