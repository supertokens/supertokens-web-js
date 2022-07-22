<script lang="ts">
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { defineComponent } from "vue";

export default defineComponent({
    mounted: async function () {
        try {
            // we try and consume the authorisation code sent by the social login provider.
            // this knows which third party provider has sent the user back because
            // we store that in localstorage when the user clicks on the provider's button
            // on the sign in / up screen
            const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp({});
            if (response.status !== "OK") {
                // this means that the third party provider does not have an email associated
                // with this user. In this case, we disallow the sign in and show a message
                // on the login UI
                return window.location.assign("/auth?error=signin");
            }

            // login / signup is successful, and we redirect the user to the home page.
            // Note that session cookies are added automatically and nothing needs to be
            // done here about them.
            window.location.assign("/");
        } catch (_) {
            // we show a something went wrong error in the auth page.
            window.location.assign("/auth?error=signin");
        }
    },
});
</script>

<template src="../html/authCallbackView.html"></template>

<style>
@import "@/assets/base.css";
@import "../css/authviewcallback.css";
</style>
