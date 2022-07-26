import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface, UserInput } from "./types";
import EmailPasswordRecipe from "../emailpassword/recipe";
import ThirdPartyRecipe from "../thirdparty/recipe";
import { CreateRecipeFunction } from "../../types";
import AuthRecipe from "../authRecipe";
export default class Recipe extends AuthRecipe<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    recipeImplementation: RecipeInterface;
    emailPasswordRecipe: EmailPasswordRecipe;
    thirdPartyRecipe: ThirdPartyRecipe;
    constructor(
        config: InputType,
        recipes: {
            thirdParty: ThirdPartyRecipe | undefined;
            emailPassword: EmailPasswordRecipe | undefined;
        }
    );
    static getInstanceOrThrow(): Recipe;
    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static reset(): void;
}
export { Recipe };
