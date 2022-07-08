import { CreateRecipeFunction } from "../../types";
import RecipeModule from "../recipeModule";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface } from "./types";
import { UserInput } from "./types";
import { EmailVerifiedClaimClass } from "./emailVerifiedClaim";
export default class Recipe implements RecipeModule<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    static EmailVerifiedClaim: EmailVerifiedClaimClass;
    config: NormalisedInputType;
    recipeImplementation: RecipeInterface;
    constructor(config: InputType);
    static init(config: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getInstanceOrThrow(): Recipe;
    static reset(): void;
}
export { Recipe };
