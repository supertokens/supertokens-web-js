import {
    PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction,
    NormalisedInputType as NormalisedEmailPasswordConfig,
} from "../emailpassword/types";
import { RecipePostAPIHookContext, RecipePreAPIHookContext } from "../recipeModule/types";
import {
    PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction,
    StateObject,
    NormalisedInputType as NormalisedThirdPartyConfig,
} from "../thirdparty/types";
import { RecipeFunctionOptions } from "../recipeModule/types";
import {
    UserType,
    InputType as AuthRecipeInputType,
    NormalisedInputType as AuthRecipeNormalisedInputType,
} from "../authRecipeWithEmailVerification/types";
import OverrideableBuilder from "supertokens-js-override";
import { InputTypeOverride as EmailVerificationOverride } from "../emailverification/types";
export declare type PreAndPostAPIHookAction = EmailPasswordPreAndPostAPIHookAction | ThirdPartyPreAndPostAPIHookAction;
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & {
    disableEmailPassword?: boolean;
    override?: {
        emailVerification?: EmailVerificationOverride;
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    disableEmailPassword: boolean;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token?: string;
        config: NormalisedEmailPasswordConfig;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedEmailPasswordConfig;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    doesEmailExist: (input: {
        email: string;
        config: NormalisedEmailPasswordConfig;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    getOAuthAuthorisationURL: (input: {
        thirdPartyProviderId: string;
        config: NormalisedThirdPartyConfig;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    signInAndUp: (
        input:
            | {
                  type: "thirdparty";
                  thirdPartyProviderId: string;
                  thirdPartyRedirectionURL: string;
                  thirdPartyProviderClientId?: string;
                  config: NormalisedThirdPartyConfig;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  type: "emailpassword";
                  isSignIn: boolean;
                  formFields: {
                      id: string;
                      value: string;
                  }[];
                  config: NormalisedEmailPasswordConfig;
                  options?: RecipeFunctionOptions;
                  userContext: any;
              }
    ) => Promise<
        | {
              type: "emailpassword" | "thirdparty";
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              type: "emailpassword";
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              type: "thirdparty";
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              type: "thirdparty";
              status: "FIELD_ERROR";
              error: string;
              fetchResponse: Response;
          }
    >;
    getOAuthState: (input: { userContext: any; config: NormalisedThirdPartyConfig }) => {
        status: "OK";
        state: StateObject | undefined;
    };
    setOAuthState: (input: { state: StateObject; config: NormalisedThirdPartyConfig; userContext: any }) => {
        status: "OK";
    };
    getThirdPartyLoginRedirectURLWithQueryParams: (input: {
        thirdPartyProviderId: string;
        thirdPartyRedirectionURL: string;
        config: NormalisedThirdPartyConfig;
        state?: StateObject;
        userContext: any;
    }) => Promise<{
        status: "OK";
        url: string;
    }>;
};
