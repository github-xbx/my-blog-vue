<template>
    <div v-loading="loading">
        <el-button @click="add">添加</el-button>
        <el-table v-if="list"
            :data="list"
            style="width: 100%">
            <el-table-column
            label="ID"
           >
            <template #default="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="轮播背景"
            >
            <template #default="scope">
                <el-image
                style="width: 50px; height: 50px"
                :src="scope.row.img_url"
                ></el-image>
            </template>
            </el-table-column>

             <el-table-column
            label="轮播标题"
            >
            <template #default="scope">
                 <el-link :href="scope.row.link" type="success" v-html="scope.row.title"></el-link>
            </template>
            </el-table-column>

             <el-table-column
            label="轮播介绍"
            >
            <template #default="scope">
                <span style="margin-left: 10px" >{{ scope.row.info }}</span>
            </template>
            </el-table-column>
             <el-table-column
            label="日期"
            >
            <template #default="scope">
                <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
            </template>
            </el-table-column>
             <el-table-column
            label="是否显示"
            prop="apply"
            width="100"
            :filters="[{ text: '已添加', value: '1' }, { text: '未添加', value: '0' }]"
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
                    @change="setDelete(scope.row.id)">
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
        <el-pagination v-if="list"
            background
            layout="prev, pager, next"
            :page-size="last_page"
            :page-count="last_page"
            :current-page="current_page"
            @current-change="change"
            style="display: flex;justify-content: center;margin-bottom:10px"
            >
        </el-pagination>
        <el-dialog :title="title" v-model="dialogFormVisible">
            <el-form :model="form">
              
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <el-input 
                     type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="form.info" 
                    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片地址" :label-width="formLabelWidth">
                    <el-input v-model="form.img_url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" :label-width="formLabelWidth">
                    <el-input v-model="form.link" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button @click="updateLink">确 定</el-button>
            </div>
            </template>
            
            </el-dialog>
    </div>
</template>
<script>
export default {
    name:'HomeList',
    data(){
        return {
            list:[],
            page:1,
            current_page:1,
            last_page:100,
            loading:true,
            dialogFormVisible:false,
            title:"修改",
            form:{
                title:'',
                link:'',
                img_url:'',
                info:'',
            },
            formLabelWidth: '120px',
        }
    },
    methods: {
        add(){
            this.type='add'
           this.form=this.$options.data().form
           this.title="添加"
           this.dialogFormVisible=true
        },
        handleEdit(index){
            this.type='update'
            this.form.id=this.list[index].id
            this.form.title=this.list[index].title
            this.form.link=this.list[index].link
            this.form.img_url=this.list[index].img_url
            this.form.info=this.list[index].info
            this.dialogFormVisible=true
            this.title="修改"
        },   
        updateLink(){
            let that=this
            that.$post('/apis/admin/show/'+that.type,that.form)
            .then(function(res){
                that.$message({
                        message:res.message,
                        type: 'success'
                });
                that.dialogFormVisible=false
                 that.getShowList()
            })
            .catch(()=>{
                // that.dialogFormVisible=false
            })
        },  
        filterTag(value, row) {
            console.log(value+'..'+row.apply)
            return row.apply === value;
        },
        setDelete(id){
            console.log(id)
            let that=this
            that.$post('/apis/admin/show/remove?id='+id)
            .then(function(res){
                console.log(res)
                that.$message({
                        message:res.message,
                        type: 'success'
                });
            })
            .catch(()=>{

            })
            
        },
        change(page){
            console.log(page)
            this.page=page
            this.getArticleList()
        },
        getShowList(){
            let that=this
            that.loading=true
            that.$post('/apis/admin/show/list?page='+that.page)
            .then(function(res){
                console.log(res)
                that.list=res.data.data
                that.setListForm()
                that.loading=false
                that.last_page=res.data.last_page
                that.current_page=res.data.current_page
                that.$message({
                        message:'获取成功',
                        type: 'success'
                });
            })
            .catch(()=>{

            })
        },
        // 格式化list deleted_at数据 
        setListForm(){
            this.list.forEach(element => {
                if(typeof(element.deleted_at)=='string'){
                    element.deleted_at=0
                }else{
                    element.deleted_at=1
                }
            });
        }

    },
    mounted(){
        this.getShowList()
    }
}
</script>
<style lang="stylus" scoped>

</style>