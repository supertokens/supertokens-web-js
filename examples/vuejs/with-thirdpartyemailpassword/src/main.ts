import { createApp } from "vue";
import { createPinia } from "pinia";
import SuperTokens from "supertokens-web-js";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Session from "supertokens-web-js/recipe/session";

import App from "./App.vue";
import router from "./router";

const apiPort = import.meta.env.VUE_APP_API_PORT || 3001;
export const apiDomain = import.meta.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Vue ThirdPartyEmailPassword Example",
        apiDomain,
    },
    recipeList: [EmailPassword.init(), ThirdParty.init(), Session.init()],
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
