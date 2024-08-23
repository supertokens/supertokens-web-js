import SuperTokens from "supertokens-node";
import { initBE } from "../../auth/STBEConfig";
import type { APIRoute } from "astro";
import { handleAuthAPIRequest } from "../../auth/superTokensHelper";

const handleCall = handleAuthAPIRequest(Response);

export const ALL: APIRoute = async ({ params, request }) => {
    SuperTokens.init(initBE());

    try {
        return await handleCall(request);
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
        });
    }
};
