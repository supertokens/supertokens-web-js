import assert from "assert";
import { EmailVerificationClaim } from "../../recipe/emailverification";
import { EmailVerificationClaim as EmailVerificationClaimNode } from "supertokens-node/recipe/emailverification";
import { PermissionClaim, UserRoleClaim } from "../../recipe/userroles";
import { AllowedDomainsClaim } from "../../recipe/multitenancy";
import {
    PermissionClaim as PermissionClaimNode,
    UserRoleClaim as UserRoleClaimNode,
} from "supertokens-node/recipe/userroles";
import { AllowedDomainsClaim as AllowedDomainsClaimNode } from "supertokens-node/recipe/multitenancy";

describe("claims", () => {
    describe("EmailVerificationClaim", () => {
        it("should have a matching id with the node version", () => {
            assert.strictEqual(EmailVerificationClaim.id, EmailVerificationClaimNode.key);
        });
    });

    describe("PermissionClaim", () => {
        it("should have a matching id with the node version", () => {
            assert.strictEqual(PermissionClaim.id, PermissionClaimNode.key);
        });
    });

    describe("UserRoleClaim", () => {
        it("should have a matching id with the node version", () => {
            assert.strictEqual(UserRoleClaim.id, UserRoleClaimNode.key);
        });
    });

    describe("AllowedDomainsClaim", () => {
        it("should have a matching id with the node version", () => {
            assert.strictEqual(AllowedDomainsClaim.id, AllowedDomainsClaimNode.key);
        });
    });
});
