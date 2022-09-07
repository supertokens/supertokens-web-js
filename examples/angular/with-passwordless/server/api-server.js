const express = require("express");
const cors  = require("cors");

const supertokens  = require("supertokens-node");
const { middleware, errorHandler }  = require("supertokens-node/framework/express");
const Session  = require("supertokens-node/recipe/session");
const Passwordless  = require("supertokens-node/recipe/passwordless");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");


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
        websiteDomain: "http://localhost:4200",
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

app.use(function(req, res, next){
  console.log(req.url);
  console.log(req.headers);
  console.log(req.body || (req.method + " method"));
})

app.get("/get-user-info", verifySession(), async (req, res) => {
  console.log("Getting user info...");
  let userId = req.session.getUserId();
  try {
    let userInfo = await Passwordless.getUserById({userId});
    return res.status(200).send(userInfo);
  } catch(err){
    console.log(err)
    return res.status(500).send("Some error in getting the user info")
  }
})


var listener = app.listen(3000, async () => {
  console.log("Listening on port " + listener.address().port);
});