<script lang="ts">
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";

export default {
    mounted: async function () {
        try {
            const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();

            if (response.status !== "OK") {
                window.location.assign("/auth?error=signin");
            }

            window.location.assign("/");
        } catch (_) {
            window.location.assign("/auth?error=signin");
        }
    },
};
</script>

<template>
    <div class="fill">
        <div class="spinner">
            <svg version="1.1" viewBox="25 25 50 50">
                <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="20"
                    stroke="rgb(255, 155, 51)"
                    strokeLinecap="round"
                    strokeDashoffset="0"
                    strokeDasharray="200, 200"
                >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="4s"
                        repeatCount="indefinite"
                    />
                    <animate attributeName="stroke-dashoffset" values="0;-30;-124" dur="2s" repeatCount="indefinite" />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0,200;110,200;110,200"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    </div>
</template>

<style>
@import "@/assets/base.css";

#app {
    width: 100vw;
    height: 100vh;
}

.spinner {
    width: 80px;
    height: auto;
    padding-top: 20px;
    padding-bottom: 40px;
    margin: 0 auto;
}
</style>
