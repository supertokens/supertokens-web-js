import { NormalisedStorageHandlers, StorageHandlerInput } from "../../types";
import { NormalisedRecipeConfig, RecipeConfig } from "./types";
export declare function normaliseRecipeModuleConfig<Action>(
    config: RecipeConfig<Action>
): NormalisedRecipeConfig<Action>;
export declare function normaliseStorageHandlerInput(
    storageHandlerInput?: StorageHandlerInput
): NormalisedStorageHandlers;
