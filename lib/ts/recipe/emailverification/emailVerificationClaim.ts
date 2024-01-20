import { DateProviderReference } from "supertokens-website/utils/dateProvider";
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
            isVerified: (refetchTimeOnFalseInSeconds = 10, maxAgeInSeconds = 300) => ({
                id: this.id,
                refresh: this.refresh,
                shouldRefresh: (payload, userContext) => {
                    const DateProvider = DateProviderReference.getReferenceOrThrow().dateProvider;

                    if (maxAgeInSeconds < DateProvider.getThresholdInSeconds()) {
                        throw new Error(
                            `maxAgeInSeconds must be greater than the DateProvider threshold value -> ${DateProvider.getThresholdInSeconds()}`
                        );
                    }

                    if (refetchTimeOnFalseInSeconds < DateProvider.getThresholdInSeconds()) {
                        throw new Error(
                            `refetchTimeOnFalseInSeconds must be greater than the DateProvider threshold value -> ${DateProvider.getThresholdInSeconds()}`
                        );
                    }

                    const value = this.getValueFromPayload(payload, userContext);
                    return (
                        value === undefined ||
                        this.getLastFetchedTime(payload, userContext)! < DateProvider.now() - maxAgeInSeconds * 1000 ||
                        (value === false &&
                            this.getLastFetchedTime(payload, userContext)! <
                                DateProvider.now() - refetchTimeOnFalseInSeconds * 1000)
                    );
                },
                validate: async (payload, userContext) => {
                    const value = this.getValueFromPayload(payload, userContext);
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
        isVerified: (refetchTimeOnFalseInSeconds?: number, maxAgeInSeconds?: number) => SessionClaimValidator;
    };
}
