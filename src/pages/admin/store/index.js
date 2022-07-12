import { createStore } from 'vuex'
import user from './modules/user'
import articles from './modules/articles'
import createPersistedState from "vuex-persistedstate";
const dataState = createPersistedState({
    paths: ['user']
})

const store = createStore({
    modules: {
        user,
        articles
    },
    plugins: [dataState],
})
export default store