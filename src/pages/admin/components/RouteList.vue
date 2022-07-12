<template>
  <div v-loading="loading">
    <el-button @click="addRoute">添加</el-button>
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类别">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.category }}</span>
        </template>
      </el-table-column>

      <el-table-column label="内容">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column label="日期">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.data }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请日期">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
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
          >
          </el-switch>
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
    >
    </el-pagination>
    <!-- 添加成长路线对话框 -->
    <el-dialog :title="title" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-input
            v-model="form.category"
            autocomplete="off"
            placeholder="请输入成长类别"
          ></el-input>
        </el-form-item>
        <el-form-item label="LOGO" :label-width="formLabelWidth">
          <el-input
            v-model="form.logo"
            autocomplete="off"
            placeholder="LOGO链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="form.content"
            autocomplete="off"
            placeholder="请输入成长内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.data"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择成长日期"
          >
          </el-date-picker>
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
  name: "RouteList",
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
        id: "",
        category: "",
        content: "",
        data: "",
        logo: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleEdit(index) {
      this.form.id = this.list[index].id;
      this.form.category = this.list[index].category;
      this.form.content = this.list[index].content;
      this.form.data = this.list[index].data;
      this.form.logo = this.list[index].logo;
      this.type = "update";
      this.title = "修改成长路线";
      this.dialogFormVisible = true;
    },
    addRoute() {
      this.type = "add";
      this.$data.form = this.$options.data().form;
      this.title = "添加成长路线";
      this.dialogFormVisible = true;
    },
    pulicRoute() {
      let that = this;
      that
        .$post("/apis/admin/route/" + that.type, that.form)
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
        .$post("/apis/admin/route/remove?id=" + id)
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
        .$get("/apis/admin/route/list?page=" + that.page)
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
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="stylus" scoped></style>