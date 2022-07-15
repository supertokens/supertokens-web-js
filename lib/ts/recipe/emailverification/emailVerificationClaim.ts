import { SessionClaimValidator, BooleanClaim } from "../session";
import { RecipeInterface } from "./types";

/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
export class EmailVerificationClaimClass extends BooleanClaim {
    constructor(getRecipeImpl: () => RecipeInterface) {
        super({
            id: "st-ev",
            refresh: async (userContext) => {
                await getRecipeImpl().isEmailVerified({
                    userContext,
                });
            },
        });

        this.validators = {
            ...this.validators,
            isVerified: (refetchTimeOnFalseInSeconds = 10, updateContextOnInvalidClaim) => ({
                id: this.id,
                refresh: this.refresh,
                shouldRefresh: (payload, userContext) => {
                    const value = this.getValueFromPayload(payload, userContext);
                    return (
                        value === undefined ||
                        (value === false &&
                            this.getLastFetchedTime(payload, userContext)! <
                                Date.now() - refetchTimeOnFalseInSeconds * 1000)
                    );
                },
                validate: async (payload, userContext) => {
                    const value = this.getValueFromPayload(payload, userContext);
                    if (value !== true && updateContextOnInvalidClaim !== undefined) {
                        await updateContextOnInvalidClaim(userContext);
                    }
                    return value === true
                        ? { isValid: true }
                        : {
                              isValid: false,
                              reason: { message: "wrong value", expectedValue: true, actualValue: value },
                          };
                },
            }),
        };
    }

    validators!: BooleanClaim["validators"] & {
        isVerified: (
            refetchTimeOnFalseInSeconds?: number,
            updateContextOnInvalidClaim?: (userContext: any) => void | Promise<void>
        ) => SessionClaimValidator;
    };
}
