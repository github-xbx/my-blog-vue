import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () =>
    import ('../views/Home.vue')
const Index = () =>
    import ('../components/Index.vue')
const Login = () =>
    import ('../views/Login.vue')
const ArticlesAdd = () =>
    import ('../components/ArticlesAdd.vue')
const ArticlesList = () =>
    import ('../components/ArticlesList.vue')
const UsersList = () =>
    import ('../components/UsersList.vue')
const LinkList = () =>
    import ('../components/LinkList.vue')
const RouteList = () =>
    import ('../components/RouteList.vue')
const MessageList = () =>
    import ('../components/MessageList.vue')
const UserInfo = () =>
    import ('../components/UserInfo.vue')
const MusicList = () =>
    import ('../components/MusicList.vue')
const HomeList = () =>
    import ('../components/HomeList.vue')
const SysMessList = () =>
    import ('../components/SysMessList.vue')
const routes = [{
        path: '/',
        redirect: {
            name: 'Login'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
                path: 'index',
                component: Index
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'articles/add',
                component: ArticlesAdd
            },
            {
                path: 'articles/update/:id',
                component: ArticlesAdd
            },
            {
                path: 'articles/list',
                component: ArticlesList
            },
            {
                path: 'user/list',
                component: UsersList
            },
            {
                path: 'link/list',
                component: LinkList
            },
            {
                path: 'route/list',
                component: RouteList
            },
            {
                path: 'message/list',
                component: MessageList
            },
            {
                path: 'user/info',
                component: UserInfo
            },
            {
                path: 'music/list',
                component: MusicList
            },
            {
                path: 'show/list',
                component: HomeList
            },
            {
                path: 'sysmess/list',
                component: SysMessList
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior() {
        // return desired position
        return { top: 0 }
    },
    routes
})

export default router