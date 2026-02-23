<template>
    <div class="post">
        <div>
            <div><strong>{{ post.id }}.</strong></div>
            <div><strong>Title: </strong>{{post.title}}</div>
            <div><strong>Description: </strong>{{post.body}}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)" class="btn">Open</my-button>
            <my-button @click="$emit('remove', post)" class="btn">Delete</my-button>
        </div>
    </div>
</template>
<script>
export default {
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
        display: flex;
    }

    .btn {
        margin-left: 10px;
    }
</style>