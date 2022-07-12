import http from '@/utils/httpindex.js'
import Notification from '@/components/notification/index.js';

const user = {
    state: {
        user: '',
        token: '',
    },
    mutations: {
        setToken(state, data) { //写入token
            state.token = data
        },
        userInfo(state, data) { //写入个人信息
            state.user = data.info
            Notification.success({
                message: `欢迎回来~${data.info.name}`,
                description: `上次登录时间:${data.time}`,
                icon: < img src = { `${data.info.avatar_url}` }
                width = "60"
                style = "position: absolute;width: 40px;border-radius: 50%;border: 2px solid rgba(223,223,223,0.3);" / >
            })
        },
        logOut(state) { //退出
            //console.log(state.user)
            Notification.success({
                message: `退出成功~${state.user.name}`,
                description: `欢迎下次登陆！`,
                icon: < img src = { `${state.user.avatar_url}` }
                width = "60"
                style = "position: absolute;width: 40px;border-radius: 50%;border: 2px solid rgba(223,223,223,0.3);" / >
            })
            state.token = ''
            state.user = ''
        }
    },
    actions: {
        setToken({ commit }, data) {
             //localStorage.setItem("so_token", data);
            commit('setToken', data)
        },
        async userInfo({ commit }, data) {
            let res = http.get('/api/user/userInfo')
            commit('userInfo', {
                info: res.data,
                time: data
            })
        },
        async logOut({ commit }) {
            await http.get('/apis/user/logout')
            commit('logOut')
        },
    }
}
export default user