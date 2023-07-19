import { WindowHandlerReference } from "supertokens-website/utils/windowHandler";
import { SessionClaimValidator, PrimitiveArrayClaim } from "../session";

/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
export class AllowedDomainsClaimClass extends PrimitiveArrayClaim<string> {
    constructor() {
        super({
            id: "st-t-dmns",
            refresh: async () => {
                // Can't automatically refresh
            },
            defaultMaxAgeInSeconds: Number.MAX_SAFE_INTEGER,
        });

        this.validators = {
            ...this.validators,
            hasAccessToCurrentDomain: () => ({
                id: this.id,
                refresh: this.refresh,
                shouldRefresh: () => {
                    return false; // Can't automatically refresh
                },
                validate: async (payload, userContext) => {
                    const currentDomain =
                        WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName();
                    const includesValidator = this.validators.includes(currentDomain, Number.MAX_SAFE_INTEGER, this.id);
                    return includesValidator.validate(payload, userContext);
                },
            }),
        };
    }

    validators!: PrimitiveArrayClaim<string>["validators"] & {
        hasAccessToCurrentDomain: () => SessionClaimValidator;
    };
}

export const AllowedDomainsClaim = new AllowedDomainsClaimClass();
