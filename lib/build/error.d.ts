/**
 * This error usually indicates that the API exposed by the backend SDKs responded
 * with `{status: "GENERAL_ERROR"}`. This should be used to show errors to the user
 * in your frontend application.
 */
export default class STGeneralError extends Error {
    isSuperTokensGeneralError: boolean;
    constructor(message: string);
    static isThisError(err: any): err is STGeneralError;
}
