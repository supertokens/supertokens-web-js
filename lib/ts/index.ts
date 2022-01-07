import SuperTokens from "./supertokens";
import { SuperTokensConfig } from "./types";

// TODO: Implement
export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig): void {
        SuperTokens.init(config);
    }
}

export const init = SuperTokensAPIWrapper.init;
