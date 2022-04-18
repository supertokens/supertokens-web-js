<script setup lang="ts">
import Session from "supertokens-web-js/recipe/session";

async function checkForSession() {
    if (await Session.doesSessionExist()) {
        console.log("EXISTS");
    } else {
        window.location.assign("/auth");
    }
}

console.log(this);

checkForSession();
</script>

<template>
    <main>
        <span>SOME TEXT HOME</span>
    </main>
</template>
