<template>
  <div class="login" style="">
    <div class="login-box">
      <el-form ref="loginForm" :model="form" :rules="rules" class="">
        <img style="width: 60%; margin: 10px 20%" src="~@/assets/logo.svg" />
        <a
          href="javascript:;"
          style="text-align: center; display: block; margin: 0px 0 30px 0"
          >后台管理系统</a
        >
        <el-form-item prop="name">
          <el-input type="text" placeholder="请输入账号" v-model="form.adminName" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.adminPassword"
          />
        </el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          style="width: 100%"
          v-on:click="onSubmit('loginForm')"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        type: "name",
        adminName: "",
        adminPassword: "",
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        adminName: [
          { required: true, message: "账号不可为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "账号长度在 3 到 10个字符",
            trigger: "blur",
          },
        ],
        adminPassword: [
          { required: true, message: "密码不可为空", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "密码长度在 3 到 20个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          that.login();
        }
      });
    },
    login() {
      let that = this;
      this.$post("/api/account/admin/login", that.form)
        .then(function (data) {
          console.log(data)
          that.$store.dispatch("setToken", data.object);
          that.$message({
            message: "登录成功",
            type: "success",
          });
          that.$store.dispatch("userInfo");
          that.$router.push("/home/index");
        })
        .catch(function () {
          // console.log(error.data);
        });
    },
  },
  created() {
    if (this.$store.state.user.token) {
      this.$router.push("/home/index");
    }
  },
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/style/home.styl';

.login {
  // background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  width: 100%;
  height: 100vh;
  background-image: url('https://p.pstatp.com/origin/1376f0000c17f069b879d'); // p.pstatp.com/origin/1376f0000c17f069b879d);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  // position:fixed
  // top: 0px;
  // left: 0px;
  // right: 0px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  width: 300px;
  border-radius: 5px;
  padding: 40px 20px;
  box-shadow: 0 28px 50px rgba(25, 24, 40, 0.35);
  // box-shadow: 0 0 25px #ccc;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.login-btn {
  background-image: linear-gradient(270deg, var(--main-8), var(--main-6));
}

@media (max-width: 700px) {
  .login-box {
    width: 90%;
    margin: auto 5%;
    box-sizing: border-box;
  }
}
</style>