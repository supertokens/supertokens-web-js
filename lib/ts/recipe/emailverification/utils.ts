import { InputType, NormalisedInputType, PreAPIHookContext, RecipeInterface } from "./types";

export function normaliseUserInput(config: InputType): NormalisedInputType {
    const mode = config.mode === undefined ? "OFF" : config.mode;
    const disableDefaultImplementation = config.disableDefaultImplementation === true;
    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    let preAPIHook = config.preAPIHook;

    if (preAPIHook === undefined) {
        preAPIHook = async (context: PreAPIHookContext) => context;
    }

    return {
        recipeId: config.recipeId,
        appInfo: config.appInfo,
        mode,
        disableDefaultImplementation,
        preAPIHook,
        signOut: config.signOut,
        override,
    };
}
