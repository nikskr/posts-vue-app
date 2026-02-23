<template>
    <div>
        <h1>Posts page</h1>
        <!-- <my-input
            v-model="searchQuery"
            placeholder="Search..."
            v-focus
        /> -->
        <div class="app__btns">
            <my-button @click="showDialog">Create post</my-button>
            <!-- <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            /> -->
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
        <div v-intersection="{fn: loadMorePosts, page, totalPages}" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber" 
                class="page"
                :class="{
                    'current-page': page === pageNumber,
                }"
                @click="changePage"
                >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
    import PostForm from "@/components/PostForm.vue";
    import PostList from "@/components/PostList.vue";
    import MyButton from "@/components/UI/MyButton.vue";
    import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
    import axios from "axios";
    export default {
        components: {
            PostForm,
            PostList
        },
        data() {
            return {
                dialogVisible: false,
            }
        },
        methods: {
            ...mapActions({

            }),
            ...mapMutations({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
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
                    // this.isPostsLoading = true;
                    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    //  params: {
                    // _page: this.page,
                    // _limit: this.limit,
                    // }
                    //});
                    // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit); 
                    // this.posts = response.data;
                } catch (error) {
                    alert(error);
                } finally {
                    this.isPostsLoading = false;
                }
            },
            async loadMorePosts() {
                try {
                    // this.page = page + 1;
                    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    //  params: {
                    // _page: this.page,
                    // _limit: this.limit,
                    // }
                    // });
                    // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit); 
                    // this.posts = [...this.posts, ...response.data];
                } catch (error) {
                    alert(error);
                }
            },
            // changePage(pageNumber) {
            //     this.page = pageNumber;
            // }
        },
        mounted() {
            this.fetchPosts();

            // const options = {
            // rootMargin: "0px",
            // scrollMargin: "0px",
            // threshold: 1.0,
            // };

            // const callback = (entries) => {
            //     if (entries[0].isIntersecting && this.page < this.totalPages) {
            //         this.loadMorePosts();
            //     }
            // };

            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer);
        },
        computed: {
           ...mapState({
                posts: state => state.post.posts,
                isPostsLoading: state => state.post.isPostsLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                sortOptions: state => state.post.sortOptions,
                }),
                ...mapGetters({
                    sortedPosts: 'post/sortedPosts',
                    sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
                })
        },
        watch: {
            page() {
                this.fetchPosts();
            }
        }
    }
</script>

<style>
    .app__btns {
        display: flex;
        justify-content: space-between;
        margin: 15px 0px;
    }
    
    .page__wrapper {
        display: flex;
        margin-top: 15px;
        justify-content: center;
        gap: 5px
    }

    .page {
        border: 1px solid #A47864;
        color: white;
        background-color: #A47864;
        padding: 5px;
        cursor: pointer;
    }

    .current-page {
        border: 2px solid #A47864;
        color: #A47864;
        background-color: #FFF;
    }

    .observer {
        height: 30px;
        background-color: #A47864;
    }
</style>