<template>
    <div class="app-container">
        <nav-bar></nav-bar>
        <router-view />
    </div>
</template>

<script>
import NavBar from "./common/NavBar";
export default {
    name: "Index",
    components: { NavBar },
    data() {
        return {};
    }
};
</script>

<style scoped>
    .app-container {
        height: 100%;
        background-color: #eee;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        overflow: hidden;
    }
</style>
