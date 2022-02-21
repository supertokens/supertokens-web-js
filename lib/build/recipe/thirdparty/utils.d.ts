import { NormalisedAppInfo } from "../../types";
import { InputType, NormalisedInputType } from "./types";
export declare function normaliseUserInput(config: InputType): NormalisedInputType;
export declare function getThirdPartyProviderRedirectURL({
    providerId,
    appInfo,
}: {
    providerId: string;
    appInfo: NormalisedAppInfo;
}): string;
export declare function generateThirdPartyProviderState(): string;
