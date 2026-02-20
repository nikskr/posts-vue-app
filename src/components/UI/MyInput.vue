<template>
        <input 
            :value="modelValue"
            @input="updateInput"
            class="input" 
            v-bind="$attrs"
        />
</template>
<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value);
        }
    }
        
}
</script>
<style scoped>
    .input {
        width: 100%;
        border: 1px solid #A47864;
        padding: 10px 15px;
        margin-top: 15px;
        margin-left: 10px;
    }
</style>