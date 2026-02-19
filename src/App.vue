<template>
    <div class="app">
        <post-form @create="createPost" />
        <post-list :posts="posts" />
    </div>
</template>

<script>
    import PostForm from "@/components/PostForm.vue";
    import PostList from "@/components/PostList.vue";
    export default {
        components: {
            PostForm,
            PostList
        },
        data() {
            return {
                posts: [
                    {id: 1, title: 'Javascript post 1', body: '1 Javascript universal programming language'},
                    {id: 2, title: 'Javascript post 2', body: '2 Javascript universal programming language'},
                    {id: 3, title: 'Javascript post 3', body: '3 Javascript universal programming language'},
                ]
            }
        },
        methods: {
            createPost(post) {
                this.posts.push(post);
            }
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
        padding: 20px;
    }
</style>