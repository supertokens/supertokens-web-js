import { type APIRoute } from "astro";
import { withSession } from "../../auth/superTokensHelper";

export const GET: APIRoute = async ({ params, request }) => {
    return withSession(request, async (err, session) => {
        if (err) {
            return new Response(JSON.stringify(err), { status: 500 });
        }

        return new Response(
            JSON.stringify({
                note: "Fetch any data from your application for authenticated user after using verifySession middleware",
                userId: session!.getUserId(),
                sessionHandle: session!.getHandle(),
                accessTokenPayload: session!.getAccessTokenPayload(),
            })
        );
    });
};
