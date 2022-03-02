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
export declare type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
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
    emailPasswordSignUp: (input: {
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
              user: UserType;
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
    emailPasswordSignIn: (input: {
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
              user: UserType;
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
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
    >;
    getResetPasswordTokenFromURL: (input: { config: NormalisedEmailPasswordConfig; userContext: any }) => string;
    getAuthorisationURLFromBackend: (input: {
        providerId: string;
        config: NormalisedThirdPartyConfig;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    thirdPartySignInAndUp: (input: {
        config: NormalisedThirdPartyConfig;
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
    >;
    getStateAndOtherInfoFromStorage: <CustomStateProperties>(input: {
        userContext: any;
        config: NormalisedThirdPartyConfig;
    }) => (StateObject & CustomStateProperties) | undefined;
    setStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        config: NormalisedThirdPartyConfig;
        userContext: any;
    }) => void;
    getAuthorizationURLWithQueryParamsAndSetState: (input: {
        providerId: string;
        authorisationURL: string;
        config: NormalisedThirdPartyConfig;
        userContext: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;
    generateStateToSendToOAuthProvider: (input: { userContext: any; config: NormalisedThirdPartyConfig }) => string;
    verifyAndGetStateOrThrowError: <CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        config: NormalisedThirdPartyConfig;
        userContext: any;
    }) => Promise<StateObject & CustomStateProperties>;
    getAuthCodeFromURL: (input: { config: NormalisedThirdPartyConfig; userContext: any }) => string;
    getAuthErrorFromURL: (input: { config: NormalisedThirdPartyConfig; userContext: any }) => string | undefined;
    getAuthStateFromURL: (input: { config: NormalisedThirdPartyConfig; userContext: any }) => string;
};
