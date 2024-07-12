import { DateProviderReference } from "supertokens-website/utils/dateProvider";
import { SessionClaimValidator, BooleanClaim } from "../session";
import { EMAILVERIFICATION_CLAIM_ID } from "./constants";
import { RecipeInterface } from "./types";

function getThresholdAwareDefaultValue(defaultVal: number) {
    return Math.max(defaultVal, DateProviderReference.getReferenceOrThrow().dateProvider.getThresholdInSeconds());
}

/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
export class EmailVerificationClaimClass extends BooleanClaim {
    constructor(getRecipeImpl: () => RecipeInterface) {
        super({
            id: EMAILVERIFICATION_CLAIM_ID,
            refresh: async (userContext) => {
                await getRecipeImpl().isEmailVerified({
                    userContext,
                });
            },
        });

        this.validators = {
            ...this.validators,
            isVerified: (refetchTimeOnFalseInSeconds, maxAgeInSeconds) => ({
                id: this.id,
                refresh: this.refresh,
                shouldRefresh: (payload, userContext) => {
                    const DateProvider = DateProviderReference.getReferenceOrThrow().dateProvider;

                    refetchTimeOnFalseInSeconds = refetchTimeOnFalseInSeconds ?? getThresholdAwareDefaultValue(10);

                    if (maxAgeInSeconds !== undefined && maxAgeInSeconds < DateProvider.getThresholdInSeconds()) {
                        throw new Error(
                            `maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ${DateProvider.getThresholdInSeconds()}`
                        );
                    }

                    if (refetchTimeOnFalseInSeconds < DateProvider.getThresholdInSeconds()) {
                        throw new Error(
                            `refetchTimeOnFalseInSeconds must be greater than or equal to the DateProvider threshold value -> ${DateProvider.getThresholdInSeconds()}`
                        );
                    }

                    const value = this.getValueFromPayload(payload, userContext);

                    if (value === undefined) {
                        return true;
                    }

                    const currentTime = Date.now();
                    const lastRefetchTime = this.getLastFetchedTime(payload, userContext)!;

                    if (maxAgeInSeconds !== undefined) {
                        if (lastRefetchTime < currentTime - maxAgeInSeconds * 1000) {
                            return true;
                        }
                    }

                    if (value === false) {
                        if (lastRefetchTime < currentTime - refetchTimeOnFalseInSeconds * 1000) {
                            return true;
                        }
                    }

                    return false;
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
