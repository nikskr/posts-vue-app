<template>
    <div class="navbar">
        <div @click="$router.push('/')" style="cursor: pointer;"><strong>Vue 3</strong></div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')" class="nav__btn">Posts</my-button>
            <my-button @click="$router.push('/store')" class="nav__btn">Store</my-button>
            <my-button @click="$router.push('/composition')" class="nav__btn">Composition</my-button>
            <my-button @click="$router.push('/about')" class="nav__btn">About</my-button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    .navbar {
        height: 50px;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 20px;
    }

    .nav__btn {
        margin-left: 10px;
    }
</style>