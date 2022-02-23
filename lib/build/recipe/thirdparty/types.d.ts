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
    stateForAuthProvider?: string;
    thirdPartyId: string;
    expiresAt: number;
};
export declare type RecipeInterface = {
    getStateAndOtherInfoFromStorage: <CustomStateProperties>(input: {
        userContext: any;
        config: NormalisedInputType;
    }) => (StateObject & CustomStateProperties) | undefined;
    setStateAndOtherInfoToStorage: <CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        config: NormalisedInputType;
        userContext: any;
    }) => void;
    getLoginRedirectURLWithQueryParamsAndSetState: (input: {
        providerId: string;
        redirectionURL: string;
        config: NormalisedInputType;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<string>;
    getOAuthAuthorisationURLFromBackend: (input: {
        providerId: string;
        config: NormalisedInputType;
        userContext: any;
        options?: RecipeFunctionOptions;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    signInAndUp: (input: {
        providerId: string;
        redirectionURL: string;
        providerClientId?: string;
        authCode?: string;
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
    >;
    generateStateToSendToOAuthProvider: (input: { userContext: any; config: NormalisedInputType }) => string;
    verifyStateFromOAuthProvider: (input: {
        stateFromProvider: string | undefined;
        stateFromStorage: string | undefined;
        config: NormalisedInputType;
        userContext: any;
    }) => boolean;
};
