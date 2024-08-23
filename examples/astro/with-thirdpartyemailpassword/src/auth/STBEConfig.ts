import ThirdPartyNode from "supertokens-node/recipe/thirdparty";
import EmailPasswordNode from "supertokens-node/recipe/emailpassword";

import SessionNode from "supertokens-node/recipe/session";
import appInfo from "./appInfo.json";
import { type TypeInput } from "supertokens-node/types";

export const initBE = (): TypeInput => {
    return {
        framework: "custom",
        supertokens: {
            // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
            connectionURI: "https://try.supertokens.com",
            // apiKey: <API_KEY(if configured)>,
        },
        appInfo,
        recipeList: [
            EmailPasswordNode.init(),
            ThirdPartyNode.init({
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                signInAndUpFeature: {
                    providers: [
                        {
                            config: {
                                thirdPartyId: "google",
                                clients: [
                                    {
                                        clientId:
                                            "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                                        clientSecret: "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",
                                    },
                                ],
                            },
                        },
                        {
                            config: {
                                thirdPartyId: "github",
                                clients: [
                                    {
                                        clientId: "467101b197249757c71f",
                                        clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                                    },
                                ],
                            },
                        },
                    ],
                },
            }),
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    };
};
