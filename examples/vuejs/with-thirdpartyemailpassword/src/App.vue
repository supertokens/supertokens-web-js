<template>
    <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
    max-width: 1280px;
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
