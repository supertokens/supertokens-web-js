import {
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
    UserType,
} from "../authRecipeWithEmailVerification/types";
import { RecipePostAPIHookContext, RecipePreAPIHookContext, RecipeFunctionOptions } from "../recipeModule/types";
import { InputTypeOverride as EmailVerificationOverride } from "../emailverification/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction = "GET_AUTHORISATION_URL" | "THIRD_PARTY_SIGN_IN_UP";
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & {
    override?: {
        emailVerification?: EmailVerificationOverride;
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type StateObject = {
    state?: string;
    rid?: string;
    thirdPartyId?: string;
    redirectToPath?: string;
};
export declare type RecipeInterface = {
    getOAuthState: (input: { userContext: any; config: NormalisedInputType }) => {
        status: "OK";
        state: StateObject | undefined;
    };
    setOAuthState: (input: { state: StateObject; config: NormalisedInputType; userContext: any }) => {
        status: "OK";
    };
    getThirdPartyLoginRedirectURLWithQueryParams: (input: {
        thirdPartyProviderId: string;
        thirdPartyRedirectionURL: string;
        config: NormalisedInputType;
        state?: StateObject;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<
        | {
              status: "ERROR";
          }
        | {
              status: "OK";
              url: string;
          }
    >;
    getOAuthAuthorisationURL: (input: {
        thirdPartyProviderId: string;
        config: NormalisedInputType;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    signInAndUp: (input: {
        thirdPartyProviderId: string;
        thirdPartyProviderClientId?: string;
        thirdPartyRedirectionURL: string;
        config: NormalisedInputType;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<
        | {
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              error: string;
              fetchResponse: Response;
          }
    >;
};
