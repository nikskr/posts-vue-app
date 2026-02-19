<template>
    <div class="post">
        <div>
            <div><strong>Title: </strong>{{post.title}}</div>
            <div><strong>Description: </strong>{{post.body}}</div>
        </div>
        <div class="post__btns">
            <my-button>Delete</my-button>
        </div>
    </div>
</template>
<script>
import MyButton from "@/components/UI/MyButton.vue";
export default {
    components: {
        MyButton
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    }
    
}
</script>
<style scoped>
    .post {
        padding: 15px;
        border: 2px solid #A47864;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .post__btns {
    }
</style>