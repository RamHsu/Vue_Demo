<template>
    <ul class="nav-bar">
        <li class="nav-list">
            <router-link :to="{name: 'Pinboard'}" :title="$t('nav.pinboard')">
                <i class="fa fa-desktop"></i>
            </router-link>
        </li>
        <li class="nav-list">
            <router-link :to="{name: 'Config'}" :title="$t('nav.config')">
                <i class="fa fa-cog fa-fw"></i>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "NavBar"
};
</script>

<style scoped>
    .nav-bar {
        width: 50px;
        background-color: #fff;
    }
    .nav-bar .nav-list {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }
    .nav-bar .nav-list:not(:last-child) {
        border-bottom: 1px solid #eee;
    }
</style>
