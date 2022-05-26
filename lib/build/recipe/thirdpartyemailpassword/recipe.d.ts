import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface, UserInput } from "./types";
import EmailVerificationRecipe from "../emailverification/recipe";
import EmailPasswordRecipe from "../emailpassword/recipe";
import ThirdPartyRecipe from "../thirdparty/recipe";
import { CreateRecipeFunction } from "../../types";
export default class Recipe extends AuthRecipeWithEmailVerification<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    recipeImplementation: RecipeInterface;
    emailPasswordRecipe: EmailPasswordRecipe;
    thirdPartyRecipe: ThirdPartyRecipe;
    constructor(
        config: InputType,
        recipes: {
            emailVerification: EmailVerificationRecipe | undefined;
            thirdParty: ThirdPartyRecipe | undefined;
            emailPassword: EmailPasswordRecipe | undefined;
        }
    );
    static getInstanceOrThrow(): Recipe;
    static init(config?: UserInput): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static reset(): void;
}
export { Recipe };
