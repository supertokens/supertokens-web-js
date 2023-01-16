import { WindowHandlerReference } from "supertokens-website/utils/windowHandler";
import { SessionClaimValidator, PrimitiveArrayClaim } from "../session";

/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
export class AllowedDomainsClaimClass extends PrimitiveArrayClaim<string> {
    constructor() {
        super({
            id: "st-tenant-domains",
            refresh: async () => {
                // Can't automatically refresh
            },
            defaultMaxAgeInSeconds: Number.MAX_SAFE_INTEGER,
        });

        // FIXME - maybe it's better if we can add getHost to the interface we are using below, that's in `supertokens-website` npm library
        const currentDomain = WindowHandlerReference.getReferenceOrThrow()
            .windowHandler.location.getOrigin()
            .split("://")[1];

        this.validators = {
            ...this.validators,
            hasAccessToCurrentDomain: () => {
                const includesValidator = this.validators.includes(currentDomain, Number.MAX_SAFE_INTEGER, this.id);
                return {
                    id: this.id,
                    refresh: this.refresh,
                    shouldRefresh: () => {
                        return false; // Can't automatically refresh
                    },
                    validate: async (payload, userContext) => {
                        return includesValidator.validate(payload, userContext);
                    },
                };
            },
        };
    }

    validators!: PrimitiveArrayClaim<string>["validators"] & {
        hasAccessToCurrentDomain: () => SessionClaimValidator;
    };
}

export const AllowedDomainsClaim = new AllowedDomainsClaimClass();
