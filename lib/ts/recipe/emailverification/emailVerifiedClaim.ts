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
            isValidated: (minRefetchDelayInSeconds: number = 10, getRedirectPath?: () => string | Promise<string>) => ({
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
                    const redirectPath =
                        getRedirectPath !== undefined && value !== true ? await getRedirectPath() : undefined;
                    return value === true
                        ? { isValid: true }
                        : {
                              isValid: false,
                              reason: { message: "wrong value", expectedValue: true, actualValue: value },
                              redirectPath,
                          };
                },
            }),
        };
    }

    validators!: BooleanClaim["validators"] & {
        isValidated: (
            minRefreshDelayInSeconds?: number,
            redirectPath?: () => string | Promise<string>
        ) => SessionClaimValidator;
    };
}
