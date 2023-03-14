import { SessionClaimValidator, BooleanClaim } from "../session";
import { RecipeInterface } from "./types";
/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
export declare class EmailVerificationClaimClass extends BooleanClaim {
    constructor(getRecipeImpl: () => RecipeInterface);
    validators: BooleanClaim["validators"] & {
        isVerified: (refetchTimeOnFalseInSeconds?: number, maxAgeInSeconds?: number) => SessionClaimValidator;
    };
}
