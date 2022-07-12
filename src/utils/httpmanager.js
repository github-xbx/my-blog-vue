import axios from 'axios'
import store from '../pages/admin/store'
import router from '@/pages/admin/router'
import { ElNotification } from 'element-plus';
var instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
});
// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    config.headers['Authorization'] = store.state.user.token
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    // Message('操作成功')
    if (response.headers.authorization) {
        store.dispatch("setToken", response.headers.authorization);
    }

    if (response.data.code == 200) {
        // console.log('拦截器')
        // console.log(response.data)
        return Promise.resolve(response.data)
    } else {
        ElNotification.warning({
            title: '错误提示',
            message: response.data.message,
        });
    }
    // 打印错误信息
    return Promise.reject(response.data)
}, function(error) {
    switch (error.response.status) {
        case 400:
            ElNotification.warning({
                title: '用户登录提示',
                message: error.response.data.message,
                onClose() {
                    store.dispatch("Logout");
                    router.push('/login')
                },
            });
            break;
        case 401:
            ElNotification.warning({
                title: '请求参数有误',
                message: error.response.data.message,
            });
            break;
        case 403:
            ElNotification.warning({
                title: '用户权限提示',
                message: error.response.data.message,
                onClose() {
                    router.push('/login')
                },
            });
            break;
        case 404:
            ElNotification.warning({
                title: '访问路径不正确',
                message: error.response.data.message,
            });
            break;
        case 422:
            ElNotification.warning({
                title: '温馨提示',
                message: error.response.data.message,
                onClose() {
                    store.dispatch("logOut")
                    router.push('/login')
                },
            });
            break;
        case 500:
            ElNotification.error({
                title: '网络提示',
                message: '服务器连接失败，请稍后再试',
            });
            break;
        default:
            ElNotification.error({
                title: '错误提示 ' + error.response.status,
                message: error.response.data.message,
            });

    }

});
export default instance;