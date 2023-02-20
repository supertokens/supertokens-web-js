import { UserInput } from "./types";
import { RecipeInterface, ClaimValidationError, SessionClaimValidator, SessionClaim } from "supertokens-website";
import { PrimitiveClaimConfig } from "supertokens-website/lib/build/claims/primitiveClaim";
import { PrimitiveArrayClaimConfig } from "supertokens-website/lib/build/claims/primitiveArrayClaim";
export default class RecipeWrapper {
    static init(config?: UserInput): import("../../types").CreateRecipeFunction<unknown>;
    static getUserId(input?: { userContext?: any }): Promise<string>;
    static getAccessToken(input?: { userContext?: any }): Promise<string | undefined>;
    static getAccessTokenPayloadSecurely(input?: { userContext?: any }): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(input?: { userContext?: any }): Promise<boolean>;
    /**
     * @deprecated
     */
    static addAxiosInterceptors(axiosInstance: any, userContext?: any): void;
    static signOut(input?: { userContext?: any }): Promise<void>;
    static getClaimValue<T>(input: { claim: SessionClaim<T>; userContext?: any }): Promise<T | undefined>;
    static validateClaims(input?: {
        overrideGlobalClaimValidators?: (
            globalClaimValidators: SessionClaimValidator[],
            userContext: any
        ) => SessionClaimValidator[];
        userContext?: any;
    }): Promise<ClaimValidationError[]> | ClaimValidationError[];
    static getInvalidClaimsFromResponse(input: {
        response:
            | {
                  data: any;
              }
            | Response;
        userContext?: any;
    }): Promise<ClaimValidationError[]>;
}
declare const init: typeof RecipeWrapper.init;
declare const getUserId: typeof RecipeWrapper.getUserId;
declare const getAccessTokenPayloadSecurely: typeof RecipeWrapper.getAccessTokenPayloadSecurely;
declare const getAccessToken: typeof RecipeWrapper.getAccessToken;
declare const attemptRefreshingSession: typeof RecipeWrapper.attemptRefreshingSession;
declare const doesSessionExist: typeof RecipeWrapper.doesSessionExist;
/**
 * @deprecated
 */
declare const addAxiosInterceptors: typeof RecipeWrapper.addAxiosInterceptors;
declare const signOut: typeof RecipeWrapper.signOut;
declare const validateClaims: typeof RecipeWrapper.validateClaims;
declare const getClaimValue: typeof RecipeWrapper.getClaimValue;
declare const getInvalidClaimsFromResponse: typeof RecipeWrapper.getInvalidClaimsFromResponse;
export {
    ClaimValidationError,
    ClaimValidationResult,
    SessionClaimValidator,
    SessionClaim,
    PrimitiveClaim,
    PrimitiveArrayClaim,
    BooleanClaim,
} from "supertokens-website";
export {
    init,
    getUserId,
    getAccessTokenPayloadSecurely,
    getAccessToken,
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    validateClaims,
    getClaimValue,
    getInvalidClaimsFromResponse,
    RecipeInterface,
    PrimitiveArrayClaimConfig,
    PrimitiveClaimConfig,
    UserInput,
};
