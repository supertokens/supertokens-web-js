import { SessionClaimValidator, PrimitiveArrayClaim } from "../session";
/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
export declare class AllowedDomainsClaimClass extends PrimitiveArrayClaim<string> {
    constructor();
    validators: PrimitiveArrayClaim<string>["validators"] & {
        hasAccessToCurrentDomain: () => SessionClaimValidator;
    };
}
export declare const AllowedDomainsClaim: AllowedDomainsClaimClass;
