import { SessionClaimValidator, BooleanClaim } from "../session";
import { RecipeInterface } from "./types";
export declare class EmailVerifiedClaimClass extends BooleanClaim {
    constructor(getRecipeImpl: () => RecipeInterface);
    validators: BooleanClaim["validators"] & {
        isValidated: (
            minRefreshDelayInSeconds?: number,
            redirectPath?: () => string | Promise<string>
        ) => SessionClaimValidator;
    };
}
