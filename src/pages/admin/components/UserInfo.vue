<template>
  <div v-loading="loading" class="route">
    <el-row>
      <el-col
        :md="{ span: 12, offset: 6 }"
        :sm="24"
        style="background-color: #fff; padding: 30px 0"
      >
        <el-form
          :model="userInfo"
          status-icon
          style="max-width: 500px; margin-right: 20px"
          ref="userInfo"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input type="email" v-model="userInfo.email">
              <template #append>@qq.com</template>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input type="tel" v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar_url">
            <el-input type="url" v-model="userInfo.avatar_url"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="password" class="password">
            <el-input type="password" v-model="userInfo.password"></el-input>
            <el-button
              icon="el-icon-edit"
              class="password-edit"
              @click="update"
              style="background: none; border: none"
            ></el-button>
          </el-form-item>
          <el-collapse-transition>
            <div v-if="isUpdate">
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="userInfo.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="userInfo.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
          </el-collapse-transition>
          <el-row>
            <el-col :md="{ span: 12, offset: 6 }" :sm="24">
              <el-button style="width: 100%" @click="submitForm('userInfo')"
                >修改</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userInfo.checkPass !== "") {
          this.$refs.userInfo.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isUpdate: false,
      loading: true,
      userInfo: {
        pass: "",
        checkPass: "",
      },
      cloneInfo: {},
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入email", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11个字符", trigger: "blur" },
        ],
        avatar_url: [
          { required: true, message: "请输入头像地址", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "长度在 3 到 100 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20个字符", trigger: "blur" },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    update() {
      this.isUpdate = !this.isUpdate;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          that.diffUserinfo();
          that
            .$post("/apis/admin/update", that.formData)
            .then(function (res) {
              console.log(res.data);
              that.$message({
                message: res.message,
                type: "success",
              });
            })
            .catch(function () {});
        } else {
          return false;
        }
      });
    },
    // 比较数据
    diffUserinfo() {
      console.log("diff");
      this.formData = { ...this.userInfo };
      for (let k in this.cloneInfo) {
        if (this.cloneInfo[k] == this.formData[k]) {
          delete this.formData[k];
        }
      }
      if (this.formData["checkPass"]) {
        delete this.formData["checkPass"];
      }
    },
    getUserInfo() {
      let that = this;
      that.loading = true;
      that
        .$post("/apis/user/info")
        .then(function (res) {
          console.log(res.data);
          that.userInfo = res.data;
          that.loading = false;
          that.userInfo["pass"] = "";
          that.cloneInfo = { ...res.data };
        })
        .catch(function () {});
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
<style lang="stylus" scoped>
.password {
  position: relative;

  .password-edit {
    position: absolute;
    right: 30px;
    top: 0;
  }
}
</style>