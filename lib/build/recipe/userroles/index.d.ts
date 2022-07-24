import { UserRoleClaim } from "./userRoleClaim";
import { PermissionClaim } from "./permissionClaim";
export default class RecipeWrapper {
    static UserRoleClaim: import("supertokens-website").PrimitiveArrayClaim<unknown>;
    static PermissionClaim: import("supertokens-website").PrimitiveArrayClaim<unknown>;
}
export { UserRoleClaim, PermissionClaim };
