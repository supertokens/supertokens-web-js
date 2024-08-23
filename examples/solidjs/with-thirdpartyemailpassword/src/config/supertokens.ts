import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";

let initialized = false;

export const superTokensInit = () => {
    if (initialized) {
        return;
    }

    SuperTokens.init({
        appInfo: {
            apiDomain: "http://localhost:3001",
            apiBasePath: "",
            appName: "Hacking With SuperTokens",
        },
        recipeList: [Session.init(), EmailPassword.init(), ThirdParty.init()],
    });

    initialized = true;
};
