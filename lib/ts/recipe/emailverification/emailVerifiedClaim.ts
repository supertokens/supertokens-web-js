import { SessionClaimValidator, BooleanClaim } from "../session";
import { RecipeInterface } from "./types";

export class EmailVerifiedClaimClass extends BooleanClaim {
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
            isVerified: (minRefetchDelayInSeconds = 10, updateContextOnInvalidClaim) => ({
                id: this.id,
                refresh: this.refresh,
                shouldRefresh: (payload, userContext) => {
                    const value = this.getValueFromPayload(payload, userContext);
                    return (
                        value === undefined ||
                        (value === false &&
                            this.getLastFetchedTime(payload, userContext)! <
                                Date.now() - minRefetchDelayInSeconds * 1000)
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
            minRefreshDelayInSeconds?: number,
            updateContextOnInvalidClaim?: (userContext: any) => void | Promise<void>
        ) => SessionClaimValidator;
    };
}
