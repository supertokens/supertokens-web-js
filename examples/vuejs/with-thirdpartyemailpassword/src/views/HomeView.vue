<script lang="ts">
import { defineComponent } from "vue";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

const apiPort = import.meta.env.VUE_APP_API_PORT || 3001;
const apiDomain = import.meta.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;

export default defineComponent({
    data() {
        return {
            // if session is false, we show a blank screen
            // else we render the UI
            session: false,
            userId: "",
        };
    },
    methods: {
        signOut: async function () {
            await ThirdPartyEmailPassword.signOut();
            window.location.assign("/auth");
        },

        checkForSession: async function () {
            if (!(await Session.doesSessionExist())) {
                // since a session does not exist, we send the user to the login page.
                return window.location.assign("/auth");
            }
            const userId = await Session.getUserId();
            // this will render the UI
            this.session = true;
            this.userId = userId;
        },

        callAPI: async function () {
            const response = await fetch(`${apiDomain}/sessioninfo`);

            if (response.status === 401) {
                // this means that the session has expired and the
                // user needs to relogin.
                window.location.assign("/auth");
                return;
            }

            const json = await response.json();

            window.alert("Session Information:\n" + JSON.stringify(json, null, 2));
        },
    },

    mounted() {
        // this function checks if a session exists, and if not,
        // it will redirect to the login screen.
        this.checkForSession();
    },
});
</script>

<template src="../html/homeView.html"></template>

<style>
@import "@/assets/base.css";
@import "../css/homeview.css";
</style>
