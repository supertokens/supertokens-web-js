import { SessionClaimValidator, SessionClaim } from "../session";
import { MFAClaimValue, MFARequirementList, RecipeInterface } from "./types";
import { checkFactorRequirement } from "./utils";

/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
export class MultiFactorAuthClaimClass implements SessionClaim<MFAClaimValue> {
    public readonly id = "st-mfa";
    public readonly validators: {
        hasCompletedDefaultFactors: () => SessionClaimValidator;
        hasCompletedFactors: (requirements: MFARequirementList) => SessionClaimValidator;
    };

    constructor(private readonly getRecipeImpl: () => RecipeInterface) {
        this.validators = {
            hasCompletedDefaultFactors: () => ({
                id: this.id,
                refresh: this.refresh,
                shouldRefresh: () => {
                    return false;
                },
                validate: async (payload, userContext) => {
                    const val = this.getValueFromPayload(payload, userContext);
                    if (val === undefined) {
                        return {
                            isValid: false,
                            reason: {
                                message: "MFA info not available in payload",
                            },
                        };
                    }
                    if (val.n.length === 0) {
                        return {
                            isValid: true,
                        };
                    }

                    return {
                        isValid: false,
                        reason: {
                            message: "not all required factors have been completed",
                            nextFactorOptions: val?.n,
                        },
                    };
                },
            }),

            hasCompletedFactors: (requirements: MFARequirementList) => ({
                id: this.id,
                shouldRefresh: () => {
                    return false;
                },
                refresh: this.refresh,
                validate: (payload, userContext) => {
                    const val = this.getValueFromPayload(payload, userContext);
                    if (!val) {
                        return {
                            isValid: false,
                            reason: {
                                message: "MFA info not available in payload",
                            },
                        };
                    }
                    const completedFactors = val.c;

                    for (const req of requirements) {
                        if (typeof req === "object" && "oneOf" in req) {
                            const res = req.oneOf
                                .map((r) => checkFactorRequirement(r, completedFactors))
                                .filter((v) => v.isValid === false);
                            if (res.length === req.oneOf.length) {
                                return {
                                    isValid: false,
                                    reason: {
                                        message: "All factor checkers failed in the list",
                                        oneOf: req.oneOf,
                                        failures: res,
                                    },
                                };
                            }
                        } else if (typeof req === "object" && "allOf" in req) {
                            const res = req.allOf
                                .map((r) => checkFactorRequirement(r, completedFactors))
                                .filter((v) => v.isValid === false);
                            if (res.length !== 0) {
                                return {
                                    isValid: false,
                                    reason: {
                                        message: "Some factor checkers failed in the list",
                                        allOf: req.allOf,
                                        failures: res,
                                    },
                                };
                            }
                        } else {
                            const res = checkFactorRequirement(req, completedFactors);
                            if (res.isValid !== true) {
                                return {
                                    isValid: false,
                                    reason: {
                                        message: "Factor validation failed: " + res.message,
                                        factorId: res.id,
                                    },
                                };
                            }
                        }
                    }

                    return {
                        isValid: true,
                    };
                },
            }),
        };
    }

    async refresh(userContext: any): Promise<void> {
        await this.getRecipeImpl().getMFAInfo(userContext);
    }

    getValueFromPayload(payload: any, _userContext?: any): { c: Record<string, number>; n: string[] } | undefined {
        return {
            c: payload[this.id].c,
            n: payload[this.id].n,
        };
    }

    getLastFetchedTime(payload: any, _userContext?: any): number | undefined {
        return payload[this.id].t;
    }
}
