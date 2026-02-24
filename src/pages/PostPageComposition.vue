<template>
    <div>
        likes = {{ likes }}
        <my-button @click="addLikes">Like</my-button>
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
            <post-form />
        </my-dialog>
        <post-list 
            :posts="sortedAndSearchedPosts"
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
import { usePosts } from "@/hooks/usePosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
import useSortedPosts from "@/hooks/useSortedPosts";
    import axios from "axios";
import { ref } from "vue";
    export default {
        components: {
            PostForm,
            PostList
        },
        data() {
            return {
                dialogVisible: false,
                sortOptions: [
                    {value: 'title', name: 'by title'},
                    {value: 'body', name: 'by description'},
                ],
            }
        },
        setup(props) {
            const {posts, isPostsLoading, totalPages} = usePosts(10);
            
            const {sortedPosts, selectedSort} = useSortedPosts(posts);
            const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

            return {
                posts,
                totalPages,
                isPostsLoading,
                selectedSort,
                sortedPosts,
                searchQuery,
                sortedAndSearchedPosts,
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