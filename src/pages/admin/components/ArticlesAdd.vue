<template>
  <div class="article">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :md="12" :sm="24" class="title">
          <el-form-item label="文章标题" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入文章标题"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24" class="cover">
          <el-form-item label="文章封面" class="article-img">
            <el-upload
              class="avatar-uploader"
              :action="imgServe"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.img" :src="form.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="12" :sm="24">
          <el-form-item label="文章介绍" prop="desc">
            <el-input
              v-model="form.desc"
              type="textarea"
              autosize
              placeholder="请输入文章介绍"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :md="12" :sm="24">
          <el-form-item label="文章类别" prop="classty">
            <el-select
              style="width: 100%"
              v-model="form.classty"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章类别"
            >
              <el-option
                v-for="item in classtyList"
                :key="item.classty"
                :label="item.classty"
                :value="item.classty"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="24">
          <el-form-item label="文章标签" prop="label">
            <!-- <el-input v-model="form.label" placeholder="多个标签使用逗号分隔"></el-input> -->
            <el-select
              style="width: 100%"
              v-model="form.label"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in labelList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="创建日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="图床">
            <el-select v-model="imgType" placeholder="请选择">
              <el-option
                v-for="item in imgService"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="浏览量">
            <el-input-number
              v-model="form.click"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <el-form-item label="点击量">
            <el-input-number
              v-model="form.like"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="首页显示">
            <el-switch
              v-model="form.is_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="标题显示">
            <el-switch
              v-model="form.head_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="分享显示">
            <el-switch
              v-model="form.share_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="版权显示">
            <el-switch
              v-model="form.copyright_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="留言显示">
            <el-switch
              v-model="form.message_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :md="4" :sm="8" :xs="12">
          <el-form-item label="提交收录">
            <el-switch
              v-model="form.seo"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <channels :title="form.title" :content="form.content" :tags="form.label"></channels> -->
      <div style="display: flex; justify-content: center; margin-bottom: 10px">
        <el-button style="width: 50%" @click="onSubmit('form')">发布</el-button>
      </div>
      <v-md-editor
        v-model="form.content"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
        style="height: 100vh"
        ref="md"
      ></v-md-editor>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ArticlesAdd",
  data() {
    return {
      type: "add",
      imgType: "toutiao",
      checkboxGroup1: [],
      labelList: { vue: "Vue" },
      classtyList: [{ classty: "前端" }],
      imgService: [
        {
          name: "头条",
          value: "toutiao",
        },
        {
          name: "百度",
          value: "baidu",
        },
        {
          name: "哔哩哔哩",
          value: "bilibili",
        },
        {
          name: "新浪",
          value: "sina",
        },
        {
          name: "搜狐",
          value: "souhu",
        },
        {
          name: "腾讯",
          value: "tencent",
        },
        {
          name: "网易",
          value: "wangyi",
        },
        {
          name: "悟空",
          value: "wukong",
        },
        {
          name: "小米",
          value: "xiaomi",
        },
        {
          name: "中关村",
          value: "zol",
        },
      ],
      form: {
        title: "",
        desc: "",
        content: "",
        img: "",
        label: "",
        classty: "",
        click: 1,
        like: 1,
        is_show: 1,
        head_show: 1,
        share_show: 1,
        copyright_show: 1,
        message_show: 1,
        seo: 1,
      },
      rules: {
        title: [{ required: false, message: "标题不可为空", trigger: "blur" }],
        desc: [{ required: false, message: "介绍不可为空", trigger: "blur" }],
        classty: [
          { required: false, message: "类型不可为空", trigger: "blur" },
        ],
        label: [{ required: false, message: "标签不可为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    imgServe() {
      return `${process.env.VUE_APP_API_URL}/admin/pictures/add?type=${this.imgType}`;
    },
  },
  methods: {
    // 绑定@imgAdd event
    handleUploadImage(event, insertImage, files) {
      const that = this;
      // 第一步.将图片上传到服务器.
      let param = new FormData(); // 创建form对象
      param.append("file", files[0]); // 通过append向form对象添加数据
      param.append("chunk", "0"); // 添加form表单中其他数据
      this.$post("/apis/admin/pictures/add?type=" + that.imgType, param).then(
        (response) => {
          insertImage({
            url: response.data.path,
            desc: files[0].name,
          });
        }
      );
    },
    onSubmit(formName) {
      // 为表单绑定验证功能
      let that = this;
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          that.submit();
        }
      });
    },
    submit() {
      //
      let that = this;
      let form = this.form;
      form.label = form.label.toString();
      that
        .$post("/apis/admin/article/" + that.type, form)
        .then(function (res) {
          console.log(res);
          that.$store.commit("article", {
            id: res.data.id,
            title: that.form.title,
            content: that.form.content,
            tags: that.form.label,
          });
          that.$message({
            message: res.data.message,
            type: "success",
          });
          that.$router.push("/home/articles/list");
        })
        .catch(function () {});
    },
    getArticle() {
      let that = this;
      let id = that.$route.params.id;
      that
        .$post("/apis/blog/content?id=" + id)
        .then(function (res) {
          that.form.title = res.data.title;
          that.form.desc = res.data.desc;
          that.form.content = res.data.content;
          that.form.classty = res.data.classty;
          that.form.img = res.data.img;
          that.form.label = res.data.label;
          that.form.click = res.data.click;
          that.form.like = res.data.like;
          that.form.is_show = res.data.is_show;
          that.form.head_show = res.data.head_show;
          that.form.share_show = res.data.share_show;
          that.form.copyright_show = res.data.copyright_show;
          that.form.message_show = res.data.message_show;
        })
        .catch(function () {});
    },
    handleAvatarSuccess(res) {
      console.log(res);
      this.form.img = res.data.path;
    },
    beforeAvatarUpload(file) {
      const arr = [
        "image/jpeg",
        "image/gif",
        "image/jpg",
        "image/png",
        "image/x-png",
        "image/pjpeg",
      ];
      const isJPG = arr.indexOf(file.type) >= 0;
      console.log(isJPG);
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error("上传头像格式不正确格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getLabels() {
      this.$post("/apis/label/list").then((res) => {
        this.labelList = res.data;
      });
    },
    getClassty() {
      this.$get("/apis/class/list").then((res) => {
        this.classtyList = res.data;
      });
    },
  },
  created() {
    let id = this.$route.params.id;
    this.form.id = id;
    if (id) {
      this.getArticle();
      this.type = "update";
      this.form.seo = 0;
    }
    this.getClassty();
    this.getLabels();
  },
};
</script>
<style lang="stylus" scoped>
.article >>>.v-md-editor--fullscreen {
  z-index: 99999;
}
.article{
    .avatar-uploader{
          position: absolute;
          .avatar{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          >>>.el-upload--picture-card{
                height: 110px;
                width: 110px;
                line-height: 110px;
            }
    }
}
@media (max-width:992px) {
  .article{
    .cover{
      order 0
    }
    .title{
      order 1
    }
    .avatar-uploader{
          position: relative;
          >>>.el-upload--picture-card{
                height: 110px;
                width: 110px;
                line-height: 110px;
            }
    }
}
}
</style>