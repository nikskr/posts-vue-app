<template>
    <div>
        <h1>Posts page</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Search..."
            v-focus
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
    import axios from "axios";
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
                ],
                dialogVisible: false,
                isPostsLoading: false,
                selectedSort: 'title',
                searchQuery: '',
                page: 1,
                limit: 10,
                totalPages: 9,
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
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => {
                    return post1[this.selectedSort].localeCompare(post2[this.selectedSort]);
                })
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => {
                    return post.title.toLowerCase().includes(this.searchQuery.toLowerCase());
                })
            }
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