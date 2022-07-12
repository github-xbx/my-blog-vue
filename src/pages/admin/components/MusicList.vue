<template>
  <div v-loading="loading">
    <el-button @click="addRoute">添加</el-button>
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="音乐id">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.music_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="音乐标题">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="音乐作者">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="音乐类型">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
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
        <el-form-item label="音乐id" :label-width="formLabelWidth">
          <el-input
            v-model="form.music_id"
            autocomplete="off"
            placeholder="请输入音乐id"
          ></el-input>
        </el-form-item>
        <el-form-item label="音乐名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入音乐名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="音乐作者" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入音乐作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="音乐类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in musicType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
  name: "MusicList",
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
        music_id: "",
        title: "",
        name: "",
        type: "",
      },
      formLabelWidth: "120px",
      musicType: [
        {
          label: "qq音乐",
          value: "qq",
        },
        {
          label: "酷狗音乐",
          value: "kugou",
        },
        {
          label: "网易云",
          value: "netease",
        },
        {
          label: "酷我音乐",
          value: "kuwo",
        },
      ],
    };
  },
  methods: {
    handleEdit(index) {
      this.form.id = this.list[index].id;
      this.form.music_id = this.list[index].music_id;
      this.form.title = this.list[index].title;
      this.form.name = this.list[index].name;
      this.form.type = this.list[index].type;
      this.type = "update";
      this.title = "修改音乐";
      this.dialogFormVisible = true;
    },
    addRoute() {
      this.type = "add";
      this.$data.form = this.$options.data().form;
      this.title = "添加音乐";
      this.dialogFormVisible = true;
    },
    // 公共方法，添加和修改公用
    pulicRoute() {
      let that = this;
      that
        .$post("/apis/admin/music/" + that.type, that.form)
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
        .$post("/apis/admin/music/remove?id=" + id)
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
        .$get("/apis/admin/music/list?page=" + that.page)
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