<template>
  <div v-loading="loading">
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.blogId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分类">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.seriesName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.blogTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template #default="scope">
          <el-tag
            type="success"
            closable
            @close="deleteLabel(item.id)"
            v-for="item of scope.row.label"
            :key="item.labelId"
            >{{ item.labelName }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="浏览量">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.click }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="喜欢量">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.like }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="创建日期">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.blogInsertTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否下架">
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
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >修改</el-button
          >
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
  name: "ARticleList",
  data() {
    return {
      list: [],
      value: true,
      loading: true,
      page: 1,
      current_page: 1,
      last_page: 1,
    };
  },
  methods: {
    setDelete(id) {
      console.log(this.loading);
      let that = this;
      that
        .$post("/apis/admin/article/remove?id=" + id)
        .then(function (res) {
          console.log(res);
          that.$message({
            message: res.message,
            type: "success",
          });
        })
        .catch(() => {});
    },
    deleteLabel(item) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(item), 1);
      console.log(item);
    },
    change(page) {
      console.log(page);
      this.page = page;
      this.getArticleList();
    },
    handleEdit(id) {
      this.$router.push({ path: "/home/articles/update/" + id });
    },
    getArticleList() {
      let that = this;
      that.loading = true;
      that
        .$post("/api/admin-client/getBlogPage/" + that.page)
        .then(function (res) {
          console.log(res);
          that.list = res.object.list;
          that.loading = false;
          that.last_page = res.object.nextPage;
          that.current_page = res.object.pageNum;
          that.$message({
            message: "获取成功",
            type: "success",
          });
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.getArticleList();
  },
};
</script>
<style lang="stylus" scoped></style>