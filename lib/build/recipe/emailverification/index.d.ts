import { RecipeInterface, PreAPIHookContext, PostAPIHookContext, UserInput } from "./types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import { EmailVerificationClaimClass } from "./emailVerificationClaim";
export default class RecipeWrapper {
    static EmailVerificationClaim: EmailVerificationClaimClass;
    static init(
        config?: UserInput
    ): import("../../types").CreateRecipeFunction<import("./types").PreAndPostAPIHookAction>;
    /**
     * Verify an email
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"}` if token is invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static verifyEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;
    /**
     * Send an email to the user for verification.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_ALREADY_VERIFIED_ERROR"}` if the email has already been verified
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static sendVerificationEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    /**
     * Check if an email has been verified
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", isVerified: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static isEmailVerified(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    static getEmailVerificationTokenFromURL(input?: { userContext?: any }): string;
    /**
     * Reads and returns the tenant id from the current URL
     *
     * @param userContext Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @returns The "tenantId" query parameter from the current location
     */
    static getTenantIdFromURL(input?: { userContext?: any }): string | undefined;
}
declare const init: typeof RecipeWrapper.init;
declare const verifyEmail: typeof RecipeWrapper.verifyEmail;
declare const sendVerificationEmail: typeof RecipeWrapper.sendVerificationEmail;
declare const isEmailVerified: typeof RecipeWrapper.isEmailVerified;
declare const getEmailVerificationTokenFromURL: typeof RecipeWrapper.getEmailVerificationTokenFromURL;
declare const getTenantIdFromURL: typeof RecipeWrapper.getTenantIdFromURL;
declare const EmailVerificationClaim: EmailVerificationClaimClass;
export {
    init,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    getEmailVerificationTokenFromURL,
    getTenantIdFromURL,
    EmailVerificationClaim,
    UserInput,
    RecipeInterface,
    RecipeFunctionOptions,
    PreAPIHookContext,
    PostAPIHookContext,
    EmailVerificationClaimClass,
};
