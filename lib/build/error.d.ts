/**
 * This error usually indicates that the API exposed by the backend SDKs responded
 * with `{status: "GENERAL_ERROR"}`. This should be used to show errors to the user
 * in your frontend application.
 */
import { STGeneralError } from "supertokens-website/utils/error";
export default STGeneralError;
