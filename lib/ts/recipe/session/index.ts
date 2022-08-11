/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
import { getNormalisedUserContext } from "../../utils";
import SessionRecipe from "./recipe";
import { UserInput } from "./types";
import { RecipeInterface, ClaimValidationError, SessionClaimValidator, SessionClaim } from "supertokens-website";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return SessionRecipe.init(config);
    }

    static getUserId(input?: { userContext?: any }): Promise<string> {
        return SessionRecipe.getInstanceOrThrow().getUserId({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async getAccessTokenPayloadSecurely(input?: { userContext?: any }): Promise<any> {
        return SessionRecipe.getInstanceOrThrow().getAccessTokenPayloadSecurely({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async attemptRefreshingSession(): Promise<boolean> {
        return SessionRecipe.getInstanceOrThrow().attemptRefreshingSession();
    }

    static doesSessionExist(input?: { userContext?: any }): Promise<boolean> {
        return SessionRecipe.getInstanceOrThrow().doesSessionExist({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static addAxiosInterceptors(axiosInstance: any, userContext?: any): void {
        return SessionRecipe.addAxiosInterceptors(axiosInstance, getNormalisedUserContext(userContext));
    }

    static signOut(input?: { userContext?: any }): Promise<void> {
        return SessionRecipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getClaimValue<T>(input: { claim: SessionClaim<T>; userContext?: any }): Promise<T | undefined> {
        return SessionRecipe.getInstanceOrThrow().getClaimValue({
            claim: input.claim,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static validateClaims(input?: {
        overrideGlobalClaimValidators?: (
            globalClaimValidators: SessionClaimValidator[],
            userContext: any
        ) => SessionClaimValidator[];
        userContext?: any;
    }): Promise<ClaimValidationError[]> | ClaimValidationError[] {
        return SessionRecipe.getInstanceOrThrow().validateClaims({
            overrideGlobalClaimValidators: input?.overrideGlobalClaimValidators,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    // The strange typing is to avoid adding a dependency to axios
    static getInvalidClaimsFromResponse(input: {
        response: { data: any } | Response;
        userContext?: any;
    }): Promise<ClaimValidationError[]> {
        return SessionRecipe.getInstanceOrThrow().getInvalidClaimsFromResponse({
            response: input.response,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const getUserId = RecipeWrapper.getUserId;
const getAccessTokenPayloadSecurely = RecipeWrapper.getAccessTokenPayloadSecurely;
const attemptRefreshingSession = RecipeWrapper.attemptRefreshingSession;
const doesSessionExist = RecipeWrapper.doesSessionExist;
const addAxiosInterceptors = RecipeWrapper.addAxiosInterceptors;
const signOut = RecipeWrapper.signOut;
const validateClaims = RecipeWrapper.validateClaims;
const getClaimValue = RecipeWrapper.getClaimValue;
const getInvalidClaimsFromResponse = RecipeWrapper.getInvalidClaimsFromResponse;

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
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    validateClaims,
    getClaimValue,
    getInvalidClaimsFromResponse,
    RecipeInterface,
    UserInput,
};
