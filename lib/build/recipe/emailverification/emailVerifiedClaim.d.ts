import { SessionClaimValidator, BooleanClaim } from "../session";
import { RecipeInterface } from "./types";
export declare class EmailVerifiedClaimClass extends BooleanClaim {
    constructor(getRecipeImpl: () => RecipeInterface);
    validators: BooleanClaim["validators"] & {
        isVerified: (
            minRefreshDelayInSeconds?: number,
            updateContextOnInvalidClaim?: (userContext: any) => void | Promise<void>
        ) => SessionClaimValidator;
    };
}
