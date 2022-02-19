import Provider from ".";
import { BuiltInProviderConfig } from "./types";
export default class Github extends Provider {
    private static instance?;
    constructor(config?: BuiltInProviderConfig);
    static init(config?: BuiltInProviderConfig): Provider;
    static reset(): void;
}
