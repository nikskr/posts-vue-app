<template>
    <div class="app">
        <navbar></navbar>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
export default {
    components: {
        Navbar
    } 
}
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        margin: 0 auto;
        max-width: 1200px;
    }

    .container {
        padding: 20px;
    }
</style>