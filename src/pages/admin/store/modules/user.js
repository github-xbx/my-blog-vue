import http from '@/utils/httpmanager.js'
const user = {
    state: {
        user: '',
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        setToken(state, data) { //写入token
            state.token = data
        },
        userInfo(state, data) { //写入个人信息
            state.user = data
        },
        logOut(state) { //退出
            state.token = ''
            state.user = ''
        }
    },
    actions: {
        setToken({ commit }, data) {
            commit('setToken', data)
        },
        async userInfo({ commit }) {
            const res = await http.get('/apis/user/info')
            commit('userInfo', res.data)
        },
        logOut({ commit }) {
            commit('logOut')
        }
    }
}
export default user