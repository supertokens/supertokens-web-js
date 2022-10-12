import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface, UserInput } from "./types";
import ThirdPartyRecipe from "../thirdparty/recipe";
import PasswordlessRecipe from "../passwordless/recipe";
import { CreateRecipeFunction } from "../../types";
import AuthRecipe from "../authRecipe";
export default class Recipe extends AuthRecipe<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    recipeImplementation: RecipeInterface;
    thirdPartyRecipe: ThirdPartyRecipe;
    passwordlessRecipe: PasswordlessRecipe;
    constructor(
        config: InputType,
        recipes: {
            thirdParty: ThirdPartyRecipe | undefined;
            passwordless: PasswordlessRecipe | undefined;
        }
    );
    static getInstanceOrThrow(): Recipe;
    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static reset(): void;
}
export { Recipe };
