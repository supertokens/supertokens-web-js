import { UserRoleClaim } from "./userRoleClaim";
import { PermissionClaim } from "./permissionClaim";
export default class RecipeWrapper {
    static UserRoleClaim: import("supertokens-website").PrimitiveArrayClaim<string>;
    static PermissionClaim: import("supertokens-website").PrimitiveArrayClaim<string>;
}
export { UserRoleClaim, PermissionClaim };
