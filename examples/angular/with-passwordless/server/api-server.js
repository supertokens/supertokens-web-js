const express = require("express");
const cors  = require("cors");

const supertokens  = require("supertokens-node");
const { middleware, errorHandler }  = require("supertokens-node/framework/express");
const Session  = require("supertokens-node/recipe/session");
const Passwordless  = require("supertokens-node/recipe/passwordless");

supertokens.init({
    framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        connectionURI: "https://try.supertokens.com",
        // apiKey: "",
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "My App",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/api",
        websiteBasePath: "/auth"
    },
    recipeList: [
        Passwordless.init({
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            contactMethod: "EMAIL"
        }),
        Session.init() // initializes session features
    ]
});

var app = express();

//CORS policies for supertokens
app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true
  })
);
app.use(middleware());

app.use(errorHandler());

var listener = app.listen(3000, async () => {
  console.log("Listening on port " + listener.address().port);
});