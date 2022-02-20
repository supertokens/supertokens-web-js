export default class STGeneralError extends Error {
    isSuperTokensGeneralError: boolean;
    constructor(message: string);
    static isGeneralError(err: any): boolean;
}
