import Provider from ".";
import { CustomProviderConfig } from "./types";

/*
 * Class.
 */
export default class Custom extends Provider {
    constructor(config: CustomProviderConfig) {
        super(config);
    }

    static init(config: CustomProviderConfig): Provider {
        if (config === undefined || config.id === undefined || config.name === undefined) {
            throw new Error("Custom provider config should contain id and name attributes");
        }
        return new Custom(config);
    }
}
