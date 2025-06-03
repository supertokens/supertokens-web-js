import { SuperTokensConfig } from "./types";
export type { SuperTokensConfig, SuperTokensPublicConfig, SuperTokensPlugin, SuperTokensPublicPlugin } from "./types";
export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig): void;
}
export declare const init: typeof SuperTokensAPIWrapper.init;
