<!--  -->
<template>
  <div class=""></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import http from "@/utils/httpindex.js"
import store from "../../../admin/store";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
   
    // eslint-disable-next-line vue/no-unused-components
    http
  },
  setup() {
    const getUrlParam = () => {
      const url = window.location.href; //获取当前url
      //const dz_url = url.split('#')[0];                //获取#/之前的字符串
      console.log(url);
      const cs = url.split("?")[1]; //获取?之后的参数字符串

      const cs_arr = cs.split("&"); //参数字符串分割为数组

      const param = {};

      for (let i = 0; i < cs_arr.length; i++) {
        //遍历数组，拿到json对象
        param[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
      }

      return param.code;
    };

    const login = () => {
      let code = getUrlParam("code");
      console.log(code);
      http.post('api/userOauth2/getToken',{code:code})
        .then((res) => {

          console.log(res);
          if (res.code === 200) {
            //localStorage.setItem("token", res.object);
            let token = res.object
            store.commit("setToken",token)
            window.location.href = "/";
          }
        });
    };

    return {
      login,
      getUrlParam,
    };
  },
  beforeCreate() {
    //页面创建前执行
    this.login();
  },
};
</script>
<style scoped>
</style>