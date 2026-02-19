<template>
    <button class='btn'>
        <slot></slot>
    </button>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .btn {
        padding: 10px;
        background: none;
        color: #A47864;
        background: none;
        border: 1px solid #A47864;
        cursor: pointer;
    }

    .btn:hover {
        color: white;
        background: #A47864;
    }
</style>