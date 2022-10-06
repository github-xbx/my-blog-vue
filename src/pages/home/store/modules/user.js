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
            state.user = data
            Notification.success({
                message: `欢迎回来~${data.username}`,
                description: `上次登录时间:${data.lastLoginTime}`,
                icon: < img src = { `${data.header}` }
                width = '60'
                style = 'position: absolute;width: 40px;border-radius: 50%;border: 2px solid rgba(223,223,223,0.3);' />
            })
        },
        logOut(state) { //退出

            Notification.success({
                message: `退出成功~${state.user.username}`,
                description: `欢迎下次登陆！`,
                icon: < img src = { `${state.user.header}` }
                width = "60"
                style = "position: absolute;width: 40px;border-radius: 50%;border: 2px solid rgba(223,223,223,0.3);" />
            })
            state.token = ''
            state.user = ''
        }
    },
    actions: {
        setToken({ commit }, data) {

            commit('setToken', data)
        },
        userInfo({ commit },data) {

            commit('userInfo',data)

        },
        async logOut({ commit }) {
            await http.post('/api/user/logout').then((res)=>{
                    if(res.code === 200 && res.object === true){
                        console.log(res)
                        commit('logOut')

                    }else {
                        Notification.error({message: '错误提示',description:res.message})
                    }

                })

        },
    }
}
export default user