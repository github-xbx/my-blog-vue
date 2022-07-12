<template>
  <div v-loading="loading">
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="email">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="手机号">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户注册来源">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.socialType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="冻结用户">
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
            <span>{{
              typeof scope.row.deleted_at == "string" ? true : false
            }}</span>
          </el-switch>
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
  </div>
</template>
<script>
export default {
  name: "UsersList",
  data() {
    return {
      list: [],
      loading: true,
      page: 1,
      current_page: 1,
      last_page: 100,
    };
  },
  methods: {
    setDelete(id) {
      console.log(id);
      let that = this;
      that
        .$post("/apis/admin/user/remove?id=" + id)
        .then(function (res) {
          console.log(res);
          that.$message({
            message: res.message,
            type: "success",
          });
        })
        .catch(function () {});
    },
    change(page) {
      console.log(page);
      this.page = page;
      this.getArticleList();
    },
    getArticleList() {
      let that = this;
      that.loading = true;
      that
        .$post("/api/admin-account/userPage",{"pageSize":10,"pageNum":that.page} )
        .then(function (res) {
          console.log(res);
          that.list = res.object.list;
          that.setListForm();
          that.loading = false;
          that.last_page = res.object.nextPage;
          that.current_page = res.object.pageNum;
          that.$message({
            message: "获取成功",
            type: "success",
          });
        })
        .catch(function () {});
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
    this.getArticleList();
  },
};
</script>
<style lang="stylus" scoped></style>