import {
    UserType,
    InputType as AuthRecipeInputType,
    NormalisedInputType as AuthRecipeNormalisedInputType,
} from "../authRecipeWithEmailVerification/types";
import {
    PasswordlessFlowType,
    PasswordlessUser,
    PreAndPostAPIHookAction as PasswordlessPreAndPostAPIHookAction,
} from "../passwordless/types";
import { RecipeFunctionOptions, RecipePostAPIHookContext, RecipePreAPIHookContext } from "../recipeModule/types";
import { StateObject, PreAndPostAPIHookAction as ThirdPartyPreAndPostAPIHookAction } from "../thirdparty/types";
import { InputTypeOverride as EmailVerificationOverride } from "../emailverification/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction = ThirdPartyPreAndPostAPIHookAction | PasswordlessPreAndPostAPIHookAction;
export declare type PreAPIHookContext = RecipePreAPIHookContext<PreAndPostAPIHookAction>;
export declare type PostAPIHookContext = RecipePostAPIHookContext<PreAndPostAPIHookAction>;
export declare type UserInput = {
    override?: {
        emailVerification?: EmailVerificationOverride;
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type InputType = AuthRecipeInputType<PreAndPostAPIHookAction> & UserInput;
export declare type NormalisedInputType = AuthRecipeNormalisedInputType<PreAndPostAPIHookAction> & {
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type RecipeInterface = {
    getAuthorisationURLFromBackend: (input: {
        providerId: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    thirdPartySignInAndUp: (input: { userContext: any; options?: RecipeFunctionOptions }) => Promise<
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
    getThirdPartyStateAndOtherInfoFromStorage: <CustomStateProperties>(input: {
        userContext: any;
    }) => (StateObject & CustomStateProperties) | undefined;
    setThirdPartyStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext: any;
    }) => Promise<void>;
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState: (input: {
        providerId: string;
        authorisationURL: string;
        userContext: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;
    generateThirdPartyStateToSendToOAuthProvider: (input: { userContext: any }) => string;
    verifyAndGetThirdPartyStateOrThrowError: <CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext: any;
    }) => Promise<StateObject & CustomStateProperties>;
    getThirdPartyAuthCodeFromURL: (input: { userContext: any }) => string;
    getThirdPartyAuthErrorFromURL: (input: { userContext: any }) => string | undefined;
    getThirdPartyAuthStateFromURL: (input: { userContext: any }) => string;
    createPasswordlessCode: (
        input:
            | {
                  email: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
    ) => Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;
    resendPasswordlessCode: (input: {
        userContext: any;
        deviceId: string;
        preAuthSessionId: string;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    consumePasswordlessCode: (
        input:
            | {
                  userInputCode: string;
                  deviceId: string;
                  preAuthSessionId: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  preAuthSessionId: string;
                  linkCode: string;
                  userContext: any;
                  options?: RecipeFunctionOptions;
              }
    ) => Promise<
        | {
              status: "OK";
              createdUser: boolean;
              user: PasswordlessUser;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "RESTART_FLOW_ERROR";
              fetchResponse: Response;
          }
    >;
    getPasswordlessLinkCodeFromURL: (input: { userContext: any }) => string;
    getPasswordlessPreAuthSessionIdFromURL: (input: { userContext: any }) => string;
    doesPasswordlessUserEmailExist: (input: {
        email: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    doesPasswordlessUserPhoneNumberExist: (input: {
        phoneNumber: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    getPasswordlessLoginAttemptInfo: <CustomLoginAttemptInfoProperties>(input: { userContext: any }) => Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    >;
    setPasswordlessLoginAttemptInfo: <CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext: any;
    }) => Promise<void>;
    clearPasswordlessLoginAttemptInfo: (input: { userContext: any }) => Promise<void>;
};
