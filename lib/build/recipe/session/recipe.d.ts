import RecipeModule from "../recipeModule";
import { ClaimValidationError, SessionClaimValidator } from "supertokens-website";
import { InputType, UserInput } from "./types";
import { CreateRecipeFunction } from "../../types";
export default class Recipe extends RecipeModule<unknown, any> {
    static instance?: Recipe;
    static RECIPE_ID: string;
    constructor(config: InputType);
    static init(config?: UserInput): CreateRecipeFunction<unknown>;
    getUserId: (input: { userContext: any }) => Promise<string>;
    getAccessTokenPayloadSecurely: (input: { userContext: any }) => Promise<any>;
    doesSessionExist: (input: { userContext: any }) => Promise<boolean>;
    signOut: (input: { userContext: any }) => Promise<void>;
    attemptRefreshingSession: () => Promise<boolean>;
    validateClaims: (input: {
        overrideGlobalClaimValidators?:
            | ((globalClaimValidators: SessionClaimValidator[], userContext: any) => SessionClaimValidator[])
            | undefined;
        userContext: any;
    }) => Promise<ClaimValidationError[]> | ClaimValidationError[];
    getInvalidClaimsFromResponse(input: {
        response:
            | {
                  data: any;
              }
            | Response;
        userContext: any;
    }): Promise<ClaimValidationError[]>;
    static addAxiosInterceptors(axiosInstance: any, userContext: any): void;
    static getInstanceOrThrow(): Recipe;
    static reset(): void;
}
export { Recipe };
