import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.com",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
    },
    recipeList: [
        ThirdParty.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                {
                    config: {
                        thirdPartyId: "google",
                        clients: [
                            {
                                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
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
                {
                    config: {
                        thirdPartyId: "apple",
                        clients: [
                            {
                                clientId: "4398792-io.supertokens.example.service",
                                additionalConfig: {
                                    keyId: "7M48Y4RYDL",
                                    privateKey:
                                        "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                                    teamId: "YWQCXGJRJL",
                                },
                            },
                        ],
                    },
                },
            ],
        }),
        EmailPassword.init(),
        Session.init(),
        Dashboard.init(),
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain, // TODO: Change to your app's website domain
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// custom API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;

    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
