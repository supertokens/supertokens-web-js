import {
    PreParsedRequest,
    CollectingResponse,
    middleware,
    errorHandler,
} from "supertokens-node/framework/custom/index.js";
import Session, { type SessionContainer, type VerifySessionOptions } from "supertokens-node/recipe/session/index.js";
import SessionRecipe from "supertokens-node/lib/build/recipe/session/recipe.js";
import { availableTokenTransferMethods } from "supertokens-node/lib/build/recipe/session/constants.js";
import { getToken } from "supertokens-node/lib/build/recipe/session/cookieAndHeaders.js";
import { parseJWTWithoutSignatureVerification } from "supertokens-node/lib/build/recipe/session/jwt.js";
import { serialize } from "cookie";
import JsonWebToken from "jsonwebtoken";
import type { JwtHeader, JwtPayload, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import appInfo from "./appInfo.json";

type HTTPMethod = "post" | "get" | "delete" | "put" | "options" | "trace";

const client = jwksClient({
    jwksUri: `${appInfo.apiDomain}${appInfo.apiBasePath}/jwt/jwks.json`,
});

function getAccessToken(request: Request): string | undefined {
    return getCookieFromRequest(request)["sAccessToken"];
}

function getPublicKey(header: JwtHeader, callback: SigningKeyCallback) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            callback(err);
        } else {
            const signingKey = key?.getPublicKey();
            callback(null, signingKey);
        }
    });
}

async function verifyToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
        JsonWebToken.verify(token, getPublicKey, {}, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as JwtPayload);
            }
        });
    });
}

export function handleAuthAPIRequest(AstroResponse: typeof Response) {
    const stMiddleware = middleware<Request>((req) => {
        return createPreParsedRequest(req);
    });

    return async function handleCall(req: Request) {
        const baseResponse = new CollectingResponse();

        const { handled, error } = await stMiddleware(req, baseResponse);

        if (error) {
            throw error;
        }
        if (!handled) {
            return new AstroResponse("Not found", { status: 404 });
        }

        for (const respCookie of baseResponse.cookies) {
            baseResponse.headers.append(
                "Set-Cookie",
                serialize(respCookie.key, respCookie.value, {
                    domain: respCookie.domain,
                    expires: new Date(respCookie.expires),
                    httpOnly: respCookie.httpOnly,
                    path: respCookie.path,
                    sameSite: respCookie.sameSite,
                    secure: respCookie.secure,
                })
            );
        }

        return new AstroResponse(baseResponse.body, {
            headers: baseResponse.headers,
            status: baseResponse.statusCode,
        });
    };
}

function getCookieFromRequest(request: Request) {
    const cookies: Record<string, string> = {};
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader) {
        const cookieStrings = cookieHeader.split(";");
        for (const cookieString of cookieStrings) {
            const [name, value] = cookieString.trim().split("=");
            cookies[name] = decodeURIComponent(value);
        }
    }
    return cookies;
}

function getQueryFromRequest(request: Request) {
    const query: Record<string, string> = {};
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    searchParams.forEach((value, key) => {
        query[key] = value;
    });
    return query;
}

function createPreParsedRequest(request: Request): PreParsedRequest {
    return new PreParsedRequest({
        cookies: getCookieFromRequest(request),
        url: request.url as string,
        method: request.method as HTTPMethod,
        query: getQueryFromRequest(request),
        headers: request.headers,
        getFormBody: async () => {
            return await request.formData();
        },
        getJSONBody: async () => {
            return await request.json();
        },
    });
}

async function getSessionDetails(
    preParsedRequest: PreParsedRequest,
    options?: VerifySessionOptions,
    userContext?: Record<string, unknown>
): Promise<{
    session: SessionContainer | undefined;
    hasToken: boolean;
    hasInvalidClaims: boolean;
    baseResponse: CollectingResponse;
    AstroResponse?: Response;
}> {
    const baseResponse = new CollectingResponse();
    const recipe = (SessionRecipe as any).default.instance;
    const tokenTransferMethod = recipe.config.getTokenTransferMethod({
        req: preParsedRequest,
        forCreateNewSession: false,
        userContext,
    });
    const transferMethods = tokenTransferMethod === "any" ? availableTokenTransferMethods : [tokenTransferMethod];
    const hasToken = transferMethods.some((transferMethod) => {
        const token = getToken(preParsedRequest, "access", transferMethod);
        if (!token) {
            return false;
        }
        try {
            parseJWTWithoutSignatureVerification(token);
            return true;
        } catch {
            return false;
        }
    });

    try {
        const session = await Session.getSession(preParsedRequest, baseResponse, options, userContext);
        return {
            session,
            hasInvalidClaims: false,
            hasToken,
            baseResponse,
        };
    } catch (err) {
        if (Session.Error.isErrorFromSuperTokens(err)) {
            return {
                hasToken,
                hasInvalidClaims: err.type === Session.Error.INVALID_CLAIMS,
                session: undefined,
                baseResponse,
                AstroResponse: new Response("Authentication required", {
                    status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401,
                }),
            };
        } else {
            throw err;
        }
    }
}

/**
 * A helper function to retrieve session details on the server side.
 *
 * NOTE: This function does not use the getSession function from the supertokens-node SDK
 * because getSession can update the access token. These updated tokens would not be
 * propagated to the client side, as request interceptors do not run on the server side.
 */
export async function getSessionForSSR(astroRequest: Request): Promise<{
    accessTokenPayload: JwtPayload | undefined;
    hasToken: boolean;
    error: Error | undefined;
}> {
    const accessToken = getAccessToken(astroRequest);
    const hasToken = !!accessToken;
    try {
        if (accessToken) {
            const decoded = await verifyToken(accessToken);
            return { accessTokenPayload: decoded, hasToken, error: undefined };
        }
        return { accessTokenPayload: undefined, hasToken, error: undefined };
    } catch (error) {
        if (error instanceof JsonWebToken.TokenExpiredError) {
            return { accessTokenPayload: undefined, hasToken, error: undefined };
        }
        return { accessTokenPayload: undefined, hasToken, error: error as Error };
    }
}

export async function withSession(
    astroRequest: Request,
    handler: (error: Error | undefined, session: SessionContainer | undefined) => Promise<Response>,
    options?: VerifySessionOptions,
    userContext?: Record<string, any>
): Promise<Response> {
    try {
        let baseRequest = createPreParsedRequest(astroRequest);
        const { session, AstroResponse, baseResponse } = await getSessionDetails(baseRequest, options, userContext);

        if (AstroResponse !== undefined) {
            return AstroResponse;
        }

        let userResponse: Response;

        try {
            userResponse = await handler(undefined, session);
        } catch (err) {
            await errorHandler()(err, baseRequest, baseResponse, (errorHandlerError: Error) => {
                if (errorHandlerError) {
                    throw errorHandlerError;
                }
            });

            // The headers in the userResponse are set twice from baseResponse, but the resulting response contains unique headers.
            userResponse = new Response(baseResponse.body, {
                status: baseResponse.statusCode,
                headers: baseResponse.headers,
            });
        }

        let didAddCookies = false;
        let didAddHeaders = false;

        for (const respCookie of baseResponse.cookies) {
            didAddCookies = true;
            userResponse.headers.append(
                "Set-Cookie",
                serialize(respCookie.key, respCookie.value, {
                    domain: respCookie.domain,
                    expires: new Date(respCookie.expires),
                    httpOnly: respCookie.httpOnly,
                    path: respCookie.path,
                    sameSite: respCookie.sameSite,
                    secure: respCookie.secure,
                })
            );
        }

        baseResponse.headers.forEach((value: string, key: string) => {
            didAddHeaders = true;
            userResponse.headers.set(key, value);
        });
        if (didAddCookies || didAddHeaders) {
            if (!userResponse.headers.has("Cache-Control")) {
                // This is needed for production deployments with Vercel
                userResponse.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            }
        }

        return userResponse;
    } catch (error) {
        return await handler(error as Error, undefined);
    }
}
