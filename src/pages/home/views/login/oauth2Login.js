import http from '@/utils/httpindex.js'

function blogOauthLogin(code) {

    console.log(code)
    http.post('/api/userOauth2/getToken',{code:code}).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
            localStorage.setItem("token", res.data)
            window.location.href = '/'
        }
    })

}


export {
    blogOauthLogin,
}