export default class NormalisedURLPath {
    private value;
    private includeSearch;
    constructor(
        url: string,
        {
            includeSearch,
        }?: {
            includeSearch: boolean;
        }
    );
    startsWith: (other: NormalisedURLPath) => boolean;
    appendPath: (other: NormalisedURLPath) => NormalisedURLPath;
    getAsStringDangerous: () => string;
}
