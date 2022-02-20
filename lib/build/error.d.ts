export default class STGeneralError extends Error {
    isSuperTokensGeneralError: boolean;
    constructor(message: string);
    static isThisError(err: any): err is STGeneralError;
}
