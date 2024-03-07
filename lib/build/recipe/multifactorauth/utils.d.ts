import { InputType, MFAClaimValue, MFARequirement, NormalisedInputType } from "./types";
export declare function normaliseUserInput(config: InputType): NormalisedInputType;
export declare function checkFactorRequirement(
    req: MFARequirement,
    completedFactors: MFAClaimValue["c"]
): {
    id: string;
    isValid: boolean;
    message: string;
};
