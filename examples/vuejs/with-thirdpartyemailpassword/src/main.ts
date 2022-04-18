import { createApp } from "vue";
import { createPinia } from "pinia";
import SuperTokens from "supertokens-web-js";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";
import Session from "supertokens-web-js/recipe/session";

import App from "./App.vue";
import router from "./router";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Vue ThirdPartyEmailPassword Example",
        apiDomain: "http://localhost:8080",
        apiBasePath: "/auth",
    },
    recipeList: [ThirdPartyEmailPassword.init(), Session.init()],
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
