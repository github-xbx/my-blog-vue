<template>
  <div v-loading="loading">
    <el-button @click="addRoute">添加</el-button>
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <!-- <span style="margin-left: 10px">{{ props.row.content }}</span> -->
          <v-md-preview :text="props.row.content"></v-md-preview>
        </template>
      </el-table-column>
      <el-table-column label="ID">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="标题">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="logo">
        <template #default="scope">
            <el-avatar :size="60" shape="square" :src="scope.row.logo" style="width">

            </el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="方式">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.type?'提醒型':'通知型' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否显示"
        prop="apply"
        width="100"
        :filters="[
          { text: '已添加', value: '1' },
          { text: '未添加', value: '0' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-switch
            v-if="scope.row.id"
            v-model="scope.row.deleted_at"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setDelete(scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index)"
            icon="el-icon-edit"
            type="primary"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="list"
      background
      layout="prev, pager, next"
      :page-size="last_page"
      :page-count="last_page"
      :current-page="current_page"
      @current-change="change"
      style="display: flex; justify-content: center; margin-bottom: 10px"
    ></el-pagination>
    <!-- 添加成长路线对话框 -->
    <el-dialog :title="title" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公告标题" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入公告标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容" :label-width="formLabelWidth">
           <v-md-editor
            v-model="form.content"
            style="height: 300px"
            ref="md"
          ></v-md-editor>
        </el-form-item>
        <el-form-item label="公告图标" :label-width="formLabelWidth">
            <el-input v-model="form.logo">
                <template #append>
                  <!-- {{process.env.VUE_APP_API_URL}} -->
                      <el-upload
                          class="avatar-uploader"
                          :action="imgServe"
                          list-type="picture-card"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                        >
                          <img v-if="form.logo" :src="form.logo" class="avatar" />
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="公告类型" :label-width="formLabelWidth">
            <el-radio v-model="form.type" :label="0">通知型</el-radio>
            <el-radio v-model="form.type" :label="1">提醒型</el-radio>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="pulicRoute">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "SysMessList",
  data() {
    return {
      list: [],
      page: 1,
      current_page: 1,
      loading: true,
      last_page: 100,
      type: "",
      title: "",
      dialogFormVisible: false,
      form: {
        title: "",
        content: "",
        type:1,
        logo:''
      },
      formLabelWidth: "120px",
    };
  },
  computed:{
    imgServe(){
        return `${process.env.VUE_APP_API_URL}/admin/pictures/add?type=toutiao`
    }
  },
  methods: {
    handleEdit(index) {
      this.form.id = this.list[index].id;
      this.form.title = this.list[index].title;
      this.form.content = this.list[index].content;
      this.form.logo = this.list[index].logo;
      this.form.type = this.list[index].type;
      this.type = "update";
      this.title = "修改公告";
      this.dialogFormVisible = true;
    },
    addRoute() {
      this.type = "add";
      this.$data.form = this.$options.data().form;
      this.title = "添加公告";
      this.dialogFormVisible = true;
    },
    // 公共方法，添加和修改公用
    pulicRoute() {
      let that = this;
      that
        .$post("/apis/admin/sysmess/" + that.type, that.form)
        .then(function (res) {
          that.$message({
            message: res.message,
            type: "success",
          });
          that.dialogFormVisible = false;
          that.getList();
        })
        .catch(() => {
          // that.dialogFormVisible=false
        });
    },
    filterTag(value, row) {
      console.log(value + ".." + row.apply);
      return row.apply === value;
    },
    setDelete(id) {
      console.log(id);
      let that = this;
      that
        .$post("/apis/admin/sysmess/remove?id=" + id)
        .then(function (res) {
          console.log(res);
          that.$message({
            message: res.message,
            type: "success",
          });
        })
        .catch(() => {});
    },
    change(page) {
      console.log(page);
      this.page = page;
      this.getList();
    },
    getList() {
      let that = this;
      that.loading = true;
      that
        .$post("/apis/admin/sysmess/list?page=" + that.page)
        .then(function (res) {
          console.log(res);
          that.loading = false;
          that.list = res.data.data;
          that.setListForm();
          that.last_page = res.data.last_page;
          that.current_page = res.data.current_page;
          that.$message({
            message: "获取成功",
            type: "success",
          });
        })
        .catch(() => {});
    },
    // 格式化list deleted_at数据
    setListForm() {
      this.list.forEach((element) => {
        if (typeof element.deleted_at == "string") {
          element.deleted_at = 0;
        } else {
          element.deleted_at = 1;
        }
      });
    },
     handleAvatarSuccess(res) {
      console.log(res);
      this.form.logo = res.data.path;
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
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="stylus" scoped>
.v-md-editor--fullscreen{
  height 100vh!important
}
.avatar-uploader{
    position relative
  >>>.el-upload,.el-upload .el-icon-plus{
      width 38px
      height 38px
  }
  .el-icon-plus,.avatar{
    position: absolute;
    top: 0;
    left: 0;
    line-height: 38px;
    width 100%
    height 100%
  }
}
</style>