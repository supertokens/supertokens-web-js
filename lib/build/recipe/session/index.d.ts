import { InputType } from "./types";
import { RecipeInterface } from "supertokens-website";
export default class RecipeWrapper {
    static init(config?: InputType): import("../../types").CreateRecipeFunction<unknown>;
    static getUserId(input?: { userContext?: any }): Promise<string>;
    static getAccessTokenPayloadSecurely(input?: { userContext?: any }): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(input?: { userContext?: any }): Promise<boolean>;
    static addAxiosInterceptors(axiosInstance: any, userContext?: any): void;
    static signOut(input?: { userContext?: any }): Promise<void>;
}
declare const init: typeof RecipeWrapper.init;
declare const getUserId: typeof RecipeWrapper.getUserId;
declare const getAccessTokenPayloadSecurely: typeof RecipeWrapper.getAccessTokenPayloadSecurely;
declare const attemptRefreshingSession: typeof RecipeWrapper.attemptRefreshingSession;
declare const doesSessionExist: typeof RecipeWrapper.doesSessionExist;
declare const addAxiosInterceptors: typeof RecipeWrapper.addAxiosInterceptors;
declare const signOut: typeof RecipeWrapper.signOut;
export {
    init,
    getUserId,
    getAccessTokenPayloadSecurely,
    attemptRefreshingSession,
    doesSessionExist,
    addAxiosInterceptors,
    signOut,
    RecipeInterface,
    InputType,
};
