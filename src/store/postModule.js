export const postModule = {
    state: () => ({
        posts: [
            {id: 1, title: 'Javascript post 1', body: '1 Javascript universal programming language'},
            {id: 2, title: 'Javascript post 2', body: '2 Javascript universal programming language'},
            {id: 3, title: 'Javascript post 3', body: '3 Javascript universal programming language'},
        ],
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
    }),
    getters: {
        sortedPosts() {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort].localeCompare(post2[state.selectedSort]);
            })
        },
        sortedAndSearchedPosts() {
            return getters.sortedPosts.filter(post => {
                return post.title.toLowerCase().includes(state.searchQuery.toLowerCase());
            })
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, bool) {
            state.selectedSort = bool;
        },
        setSearchQuery(state, str) {
            state.searchQuery = str
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        }
    },
    actions: {
       async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                 params: {
                _page: state.page,
                _limit: state.limit,
                }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data); 
            } catch (error) {
                console.log(error);
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts() {
            try {
                commit('setPage', state.page + 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                 params: {
                _page: state.page,
                _limit: state.limit,
                }
                });
                commit('totalPages', Math.ceil(response.headers['x-total-count'] / state.limit)); 
                commit('setPosts', [...stats.posts, ...response.data]);
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
}