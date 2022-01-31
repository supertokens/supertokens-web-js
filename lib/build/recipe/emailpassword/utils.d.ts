import { RecipeFunctionOptions } from "../emailverification";
import { InputType, NormalisedInputType } from "./types";
export declare function normaliseUserInput(config: InputType): NormalisedInputType;
export declare function executePreAPIHooks({
    config,
    context,
    action,
    options,
    userContext,
}: {
    config: NormalisedInputType;
    context: {
        requestInit: RequestInit;
        url: string;
    };
    action:
        | "EMAIL_PASSWORD_SIGN_UP"
        | "EMAIL_PASSWORD_SIGN_IN"
        | "SEND_RESET_PASSWORD_EMAIL"
        | "SUBMIT_NEW_PASSWORD"
        | "EMAIL_EXISTS";
    options?: RecipeFunctionOptions;
    userContext: any;
}): Promise<{
    url: string;
    requestInit: RequestInit;
}>;
