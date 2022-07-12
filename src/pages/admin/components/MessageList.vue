<template>
  <div v-loading="loading">
    <el-table v-if="list" :data="list" style="width: 100%">
      <el-table-column label="ID">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.commentId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="回复内容">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.commentContent }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.commentName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="回复类别(文章id)">
        <template #default="scope">
          <span style="margin-left: 10px">{{
            scope.row.commentBid == 0 ? "网站回复" : scope.row.commentBid
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章名">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.btitle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请日期">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.commentTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="是否显示"
        prop="deleted_at"
        width="100"
        :filters="[
          { text: '已添加', value: 1 },
          { text: '未添加', value: 0 },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-switch
            v-if="scope.row.commentId"
            v-model="scope.row.commentFlag"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setDelete(scope.row.commentFlag, scope.row.commentId)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index)"
            icon="el-icon-edit"
            type="primary"
            circle
          ></el-button> -->
          <!-- scope.row.hasChildren -->
          <el-button
            v-if="true"
            type="warning"
            icon="el-icon-message"
            size="mini"
            @click="ReplyList(scope.$index)"
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
    <!-- 添加评论对话框 -->
    <el-dialog :title="title" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="回复内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.reply"
            autocomplete="off"
            placeholder="请输入回复内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addReply">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 查看评论对话框 -->
    <el-dialog title="评论查看" v-model="dialogReplyVisible">
      <el-table v-if="list" :data="reply" height="350" style="width: 100%">
        <el-table-column label="ID">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.commentId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="评论内容">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.commentContent }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户ID">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.commentUid }}</span>
          </template>
        </el-table-column>

        <el-table-column label="回复id">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.commentParentId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="评论日期">
          <template #default="scope">
            <span style="margin-left: 10px">{{ scope.row.commentTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="是否显示"
          prop="deleted_at"
          width="100"
          :filters="[
            { text: '已添加', value: 1 },
            { text: '未添加', value: 0 },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-switch
              v-if="scope.row.commentId"
              v-model="scope.row.commentFlag"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="setDelete(scope.row.commentFlag, scope.row.commentId)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MessageList",
  data() {
    return {
      list: [],
      page: 1,
      current_page: 1,
      loading: true,
      last_page: 100,
      title: "回复评论",
      dialogFormVisible: false,
      dialogReplyVisible: false,
      reply: [],
      form: {
        mess_id: "",
        reply: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleEdit(index) {
      this.form.mess_id = this.list[index].id;
      this.dialogFormVisible = true;
    },
    // 回复评论
    addReply() {
      let that = this;
      that
        .$post("/api/user/reply/add", that.form)
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
      console.log(value + ".." + row.commentFlag);
      return row.commentFlag === value;
    },
    // 是否显示 软删除 id
    setDelete(url, id) {
      console.log(id,url);
      let that = this;
      that
        .$post("/api/admin-client/updateCommentById",{"commentId":id,"commentFlag":url})
        .then(function (res) {
          console.log(res);
          that.$message({
            message: res.message,
            type: "success",
          });
        })
        .catch(() => {});
    },
    // 换页
    change(page) {
      console.log(page);
      this.page = page;
      this.getList();
    },
    //获取回复的评论
    ReplyList(index) {
      let that = this;
      that
        .$post("/api/admin-client/queryCommentChild",{"parentId":that.list[index].commentId} )
        .then(function (res) {
          console.log(res);
          that.reply = res.object;
          that.dialogReplyVisible = true;
          that.$message({
            message: "获取成功",
            type: "success",
          });
        })
        .catch(() => {});
    },
    // load(tree, treeNode, resolve) {
    //     console.log(tree)
    //      let that=this
    //     that.$get('reply/list?id='+tree.id)
    //     .then(function(res){
    //         console.log(res)
    //         resolve(res.data)
    //         that.$message({
    //                 message:'获取成功',
    //                 type: 'success'
    //         });
    //     })
    //     .catch(()=>{

    //     })
    // },
    // 获取列表
    getList() {
      let that = this;
      that.loading = true;
      that
        .$post("/api/admin-client/queryAllCommentPage", {
          pageNo: that.page,
          pageSize: 8,
        })
        .then(function (res) {
          //console.log(res);
          that.list = res.object.list;
          that.setListForm();
          that.loading = false;
          that.last_page = res.object.nextPage;
          that.current_page = res.data.pageNum;
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