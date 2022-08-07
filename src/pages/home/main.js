import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '../../utils/httpindex'
import '@/assets/iconfont/iconfont.js'
import InfiniteScroll from '@/components/infinite-scroll/index.js'
import '@/components/editor/show.js'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

router.beforeEach((to, from, next) => {
   // console.log(from)
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(InfiniteScroll)
app.config.globalProperties.$get = http.get
app.config.globalProperties.$post = http.post
http.defaults.baseURL = process.env.VUE_APP_URL;
app.mount('#app')