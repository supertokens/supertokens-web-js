<script lang="ts">
import { defineComponent } from "vue";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

const apiPort = import.meta.env.VUE_APP_API_PORT || 3001;
const apiDomain = import.meta.env.VUE_APP_API_URL || `http://localhost:${apiPort}`;

export default defineComponent({
    data() {
        return {
            session: false,
            userId: "",
        };
    },
    methods: {
        signOut: async function () {
            await ThirdPartyEmailPassword.signOut();
            window.location.reload();
        },
        checkForSession: async function () {
            if (!(await Session.doesSessionExist())) {
                return window.location.assign("/auth");
            }
            const userId = await Session.getUserId();
            this.session = true;
            this.userId = userId;
        },
        callAPI: async function () {
            const response = await fetch(`${apiDomain}/sessionInfo`);

            if (response.status === 401) {
                window.location.assign("/");
                return;
            }

            const json = await response.json();

            window.alert("Session Information:\n" + JSON.stringify(json, null, 2));
        },
    },
    mounted() {
        this.checkForSession();
    },
});
</script>

<template>
    <div v-if="session">
        <div class="fill">
            <div class="top-bar">
                <div class="sign-out" v-on:click="signOut">SIGN OUT</div>
            </div>
            <div class="fill home-content">
                <span class="home-emoji">🥳🎉</span>
                Login successful
                <div style="height: 20px" />
                Your user ID is <br />
                {{ `${userId}` }}
                <div style="height: 40px" />
                <div class="session-button" v-on:click="callAPI">CALL API</div>
                <div style="height: 30px" />
                ------------------------------------
                <div style="height: 40px" />
                <a
                    href="https://github.com/supertokens/supertokens-web-js/tree/master/examples/vuejs/with-thirdpartyemailpassword"
                    target="_blank"
                    rel="noreferrer"
                    >View the code on GitHub</a
                >
            </div>
            <div class="bottom-banner">Vue Demo app. Made with ❤️ using supertokens.com</div>
        </div>
    </div>
    <div v-else></div>
</template>

<style>
@import "@/assets/base.css";

.fill {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
}

.top-bar {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: flex-end;
    padding-left: 75px;
    padding-right: 75px;
    width: 100%;
}

.sign-out {
    display: flex;
    width: 116px;
    height: 42px;
    background-color: black;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
}

.home-content {
    /* width: 100%; */
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    color: rgb(51, 51, 51);
    padding-top: 10px;
    padding-bottom: 40px;
    margin: auto;
}

.home-emoji {
    font-size: 50px;
}

.session-button {
    padding: 8px 13px;
    background-color: #000;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    font-size: 17px;
}

.bottom-banner {
    display: flex;
    width: 100vw;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: rgb(0, 0, 0);
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    color: rgb(255, 255, 255);
    font-weight: bold;
}
</style>
