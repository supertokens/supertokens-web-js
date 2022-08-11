<template>
    <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    font-weight: normal;
}

@media (min-width: 1024px) {
    body {
        display: flex;
        place-items: center;
    }

    #app {
        display: flex;
        grid-template-columns: 1fr 1fr;
    }
}
</style>
