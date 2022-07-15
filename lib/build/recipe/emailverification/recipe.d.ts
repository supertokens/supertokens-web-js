import { CreateRecipeFunction } from "../../types";
import RecipeModule from "../recipeModule";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface } from "./types";
import { UserInput } from "./types";
import { EmailVerificationClaimClass } from "./emailVerificationClaim";
export default class Recipe implements RecipeModule<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    static EmailVerificationClaim: EmailVerificationClaimClass;
    config: NormalisedInputType;
    recipeImplementation: RecipeInterface;
    constructor(config: InputType);
    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static getInstanceOrThrow(): Recipe;
    static reset(): void;
}
export { Recipe };
