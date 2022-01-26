import { RecipeFunctionOptions } from ".";
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
    action: "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED";
    options?: RecipeFunctionOptions;
    userContext: any;
}): Promise<{
    url: string;
    requestInit: RequestInit;
}>;
