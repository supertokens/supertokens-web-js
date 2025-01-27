import { AuthenticationResponseJSON, RegistrationResponseJSON } from "@simplewebauthn/browser";
import { GeneralErrorResponse, User } from "../../types";
import {
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
} from "../authRecipe/types";
import {
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    UserInput as RecipeModuleUserInput,
    RecipeFunctionOptions,
} from "../recipeModule/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction =
    | "REGISTER_OPTIONS"
    | "SIGN_IN_OPTIONS"
    | "SIGN_UP"
    | "SIGN_IN"
    | "EMAIL_EXISTS"
    | "GENERATE_RECOVER_ACCOUNT_TOKEN"
    | "RECOVER_ACCOUNT";
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type ResidentKey = "required" | "preferred" | "discouraged";
export declare type UserVerification = "required" | "preferred" | "discouraged";
export declare type UserInput = {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<PreAndPostAPIHookAction>;
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type CredentialPayload = {
    id: string;
    rawId: string;
    response: {
        clientDataJSON: string;
        attestationObject: string;
        transports?: ("ble" | "cable" | "hybrid" | "internal" | "nfc" | "smart-card" | "usb")[];
        userHandle: string;
    };
    authenticatorAttachment: "platform" | "cross-platform";
    clientExtensionResults: any;
    type: "public-key";
};
export declare type RegistrationOptions = {
    status: "OK";
    webauthnGeneratedOptionsId: string;
    createdAt: string;
    expiresAt: string;
    rp: {
        id: string;
        name: string;
    };
    user: {
        id: string;
        name: string;
        displayName: string;
    };
    challenge: string;
    timeout: number;
    excludeCredentials: {
        id: string;
        type: "public-key";
        transports: ("ble" | "hybrid" | "internal" | "nfc" | "usb")[];
    }[];
    attestation: "none" | "indirect" | "direct" | "enterprise";
    pubKeyCredParams: {
        alg: number;
        type: "public-key";
    }[];
    authenticatorSelection: {
        requireResidentKey: boolean;
        residentKey: ResidentKey;
        userVerification: UserVerification;
    };
    fetchResponse: Response;
};
export declare type AuthenticationOptions = {
    status: "OK";
    webauthnGeneratedOptionsId: string;
    challenge: string;
    timeout: number;
    userVerification: UserVerification;
    fetchResponse: Response;
};
export declare type RecipeInterface = {
    getRegisterOptions: (
        input: {
            options?: RecipeFunctionOptions;
            userContext: any;
        } & (
            | {
                  email: string;
              }
            | {
                  recoverAccountToken: string;
              }
        )
    ) => Promise<
        | RegistrationOptions
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_EMAIL_ERROR";
              err: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
    >;
    getSignInOptions: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<
        | AuthenticationOptions
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    signUp: (input: {
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "GENERATED_OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "EMAIL_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
    >;
    signIn: (input: {
        webauthnGeneratedOptionsId: string;
        credential: AuthenticationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    getEmailExists: (input: { email: string; options?: RecipeFunctionOptions; userContext: any }) => Promise<
        | {
              status: "OK";
              exists: boolean;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    generateRecoverAccountToken: (input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    recoverAccount: (input: {
        token: string;
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "GENERATED_OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
    >;
    registerCredential: (input: { registrationOptions: RegistrationOptions }) => Promise<
        | {
              status: "OK";
              registrationResponse: RegistrationResponseJSON;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
    >;
    authenticateCredential: (input: { authenticationOptions: AuthenticationOptions }) => Promise<
        | {
              status: "OK";
              authenticationResponse: AuthenticationResponseJSON;
          }
        | {
              status: "FAILED_TO_AUTHENTICATE_USER";
              error: any;
          }
    >;
    registerCredentialWithSignUp: (input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_EMAIL_ERROR";
              err: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "GENERATED_OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "EMAIL_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
    >;
    authenticateCredentialWithSignIn: (input: { options?: RecipeFunctionOptions; userContext: any }) => Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "FAILED_TO_AUTHENTICATE_USER";
              error: any;
          }
        | GeneralErrorResponse
    >;
    registerCredentialWithRecoverAccount: (input: {
        recoverAccountToken: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "GENERATED_OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
    >;
};
