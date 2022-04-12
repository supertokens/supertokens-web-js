import {
    NormalisedInputType as AuthRecipeNormalisedInputType,
    InputType as AuthRecipeInputType,
    UserType,
    PreAndPostAPIHookAction as AuthRecipePreAndPostAPIHookAction,
} from "../authRecipeWithEmailVerification/types";
import {
    RecipePostAPIHookContext,
    RecipePreAPIHookContext,
    RecipeFunctionOptions,
    UserInput as RecipeModuleUserInput,
} from "../recipeModule/types";
import { InputTypeOverride as EmailVerificationOverride } from "../emailverification/types";
import OverrideableBuilder from "supertokens-js-override";
export declare type PreAndPostAPIHookAction =
    | AuthRecipePreAndPostAPIHookAction
    | "GET_AUTHORISATION_URL"
    | "THIRD_PARTY_SIGN_IN_UP";
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
export declare type StateObject = {
    expiresAt: number;
    providerId: string;
    authorisationURL: string;
    stateForAuthProvider: string;
    providerClientId?: string;
};
export declare type RecipeInterface = {
    getStateAndOtherInfoFromStorage: <CustomStateProperties>(input: {
        userContext: any;
    }) => (StateObject & CustomStateProperties) | undefined;
    setStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext: any;
    }) => Promise<void>;
    getAuthorisationURLWithQueryParamsAndSetState: (input: {
        providerId: string;
        authorisationURL: string;
        userContext: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;
    getAuthorisationURLFromBackend: (input: {
        providerId: string;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    signInAndUp: (input: { userContext: any; options?: RecipeFunctionOptions }) => Promise<
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
    generateStateToSendToOAuthProvider: (input: { userContext: any }) => string;
    verifyAndGetStateOrThrowError: <CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext: any;
    }) => Promise<StateObject & CustomStateProperties>;
    getAuthCodeFromURL: (input: { userContext: any }) => string;
    getAuthErrorFromURL: (input: { userContext: any }) => string | undefined;
    getAuthStateFromURL: (input: { userContext: any }) => string;
};
