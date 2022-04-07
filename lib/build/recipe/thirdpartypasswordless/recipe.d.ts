import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { InputType, NormalisedInputType, PreAndPostAPIHookAction, RecipeInterface } from "./types";
import EmailVerificationRecipe from "../emailverification/recipe";
import ThirdPartyRecipe from "../thirdparty/recipe";
import PasswordlessRecipe from "../passwordless/recipe";
import { CreateRecipeFunction } from "../../types";
export default class Recipe extends AuthRecipeWithEmailVerification<PreAndPostAPIHookAction, NormalisedInputType> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    recipeImplementation: RecipeInterface;
    thirdPartyRecipe: ThirdPartyRecipe;
    passwordlessRecipe: PasswordlessRecipe;
    constructor(
        config: InputType,
        recipes: {
            emailVerification: EmailVerificationRecipe | undefined;
            thirdParty: ThirdPartyRecipe | undefined;
            passwordless: PasswordlessRecipe | undefined;
        }
    );
    static getInstanceOrThrow(): Recipe;
    static init(config?: InputType): CreateRecipeFunction<PreAndPostAPIHookAction>;
    static reset(): void;
}
