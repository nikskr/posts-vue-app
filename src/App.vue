<template>
    <div class="app">
        <h1>Posts page</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Search..."
        />
        <div class="app__btns">
            <my-button @click="showDialog">Create post</my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list 
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
    import PostForm from "@/components/PostForm.vue";
    import PostList from "@/components/PostList.vue";
    import axios from "axios";
    export default {
        components: {
            PostForm,
            PostList
        },
        data() {
            return {
                posts: [
                    // {id: 1, title: 'Javascript post 1', body: '1 Javascript universal programming language'},
                    // {id: 2, title: 'Javascript post 2', body: '2 Javascript universal programming language'},
                    // {id: 3, title: 'Javascript post 3', body: '3 Javascript universal programming language'},
                ],
                dialogVisible: false,
                isPostsLoading: false,
                selectedSort: 'title',
                searchQuery: '',
                sortOptions: [
                    {value: 'title', name: 'by title'},
                    {value: 'body', name: 'by description'},
                ],
            }
        },
        methods: {
            createPost(post) {
                this.posts.push(post);
                this.dialogVisible = false;
                this.isPostsLoading = false;
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id);
            },
            showDialog() {
                this.dialogVisible = true;
            },
            async fetchPosts() {
                try {
                    this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                    this.posts = response.data;
                } catch (error) {
                    alert(error);
                } finally {
                    this.isPostsLoading = false;
                }
            }
        },
        mounted() {
            this.fetchPosts();
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => {
                    return post1[this.selectedSort].localeCompare(post2[this.selectedSort]);
                })
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => {
                    return post.title.includes(this.searchQuery);
                })
            }
        },
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

    .app__btns {
        display: flex;
        justify-content: space-between;
        margin: 15px 0px;
    }
</style>