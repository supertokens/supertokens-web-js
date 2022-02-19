import { NormalisedAppInfo } from "../../../types";
import { ProviderConfig } from "./types";
export default abstract class Provider {
    id: string;
    name: string;
    clientId?: string;
    constructor(config: ProviderConfig);
    getRedirectURL(appInfo: NormalisedAppInfo): string;
    generateState: () => string;
}
