import {createRouter, createWebHistory} from 'vue-router'
import Index from '../views/index/main.vue'
import store from '@/pages/home/store'
import Notification from '@/components/notification/index.js';
const name = "MY-BLOG"

const routes = [
    {
        routespath: '/',
        name: 'Home',
        component: Index,
        meta: {
            title: '首页-' + name,
            keepAlive: true, // 需要被缓存
        }
    },
    {
        path: '/user/info',
        name: 'Blog',
        component: () =>
            import('../views/blog/main.vue'),
        meta: {
            title: '用户信息-' + name,
            keepAlive: true, // 需要被缓存
            requiresAuth: true // 需要登录权限
        }
    },
    {
        path: '/blog/article/:id',
        name: 'BlogContent',
        component: () =>
            import('../views/blog/blog-content.vue'),
        meta: {
            title: 'loading……',
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/link',
        name: 'Link',
        component: () =>
            import('../views/friends/main.vue'),
        meta: {
            keepAlive: true, // 需要被缓存
            title: '友链圈-' + name,
        }
    },
    {
        path: '/message',
        name: 'Message',
        component: () =>
            import('../views/message/main.vue'),
        meta: {
            // keepAlive: true, // 需要被缓存
            title: '留言圈-' + name,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('../views/login/login.vue'),
        meta: {
            title: '登录-' + name,
        }
    },
    {

        path: '/oauthLogin',
        name: 'oauth2-login',
        component: () =>
            import('../views/login/oauthLogin.vue'),
        meta: {
            title: '登录-' + name
        }
    },
    {
        path: '/project',
        name: 'Project',
        component: () =>
            import('../views/circle/project.vue'),
        meta: {
            title: '项目圈-' + name,
        }
    },
    {
        path: '/player',
        name: 'Music',
        component: () =>
            import('../views/circle/music.vue'),
        meta: {
            title: '音乐圈-' + name,
        }
    },
    {
        // 会匹配所有路径
        path: '/:pathMatch(.*)*',
        name: 'Windmill',
        component: () =>
            import('../views/windmill.vue'),
        meta: {
            title: '哎呀页面不见了-' + name
        }
    },

]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        // return desired position
        return {top: 0}
    },
    routes
})

router.beforeEach(((to, from, next) => {
    if (to.matched.some(res => res.meta.requiresAuth)) {// 判断是否需要登录权限

       const  token = store.state.user.token ;
        if (token != null && token != ''){
            next();
        }else {
            //路由到登录界面
            next({path:"/"})
            Notification.warning({
                message: '用户权限提示',
                description: '没有登录，请先登录！！！',
            });
            store.commit("showLogin")
        }

    }else {
        next();
    }
}))


export default router