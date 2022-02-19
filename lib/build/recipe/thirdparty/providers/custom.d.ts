import Provider from ".";
import { CustomProviderConfig } from "./types";
export default class Custom extends Provider {
    constructor(config: CustomProviderConfig);
    static init(config: CustomProviderConfig): Provider;
}
