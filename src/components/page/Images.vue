<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 轮播图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete"   :disabled="btnDisabled" @click="batchDele" class="handle-del mr10" >删除</el-button>
            </div> 
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  border  @selection-change="selectChange"  @select="checked"  @select-all="allChecked">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="id" label="轮播图ID" width="150" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="rate" label="轮播图排名" width="150" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="url" label="图片跳转链接" width="500" align="center"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="imgAddress" label="图片地址"   width="550" align="center"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column   label="操作" width="165" align="center">
                        <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
                        </template>
                    </el-table-column>
                

            </el-table>

        </div>

       
       
        
    </div>
</template>

<script>
import {getIndexImg,deleteIndexImg,getUserLoginState} from '../../api/getData';
export default {
  data() {
    return {
      tableData: [],
      btnDisabled:true,
      checkedLists:'',
      selectLists:'',
    };
  },



  methods: {
    // 点击获取值
     handleEdit(index, row) {
                this.$router.push({ path: '/addImage',query:{from:'edit',data:row}});
            },
            // 单选事件
            checked(e){
                this.checkedLists=e;          
            },
            // 全选事件
            allChecked(e){
                this.checkedLists=e;
            },
            // change事件
            selectChange(e){
                this.selectLists=e;
                if (this.selectLists!='') {
                    this.btnDisabled=false;
                }else{
                    this.btnDisabled=true;
                }
            },
            // 删除事件
            batchDele(){
                var id='';
                if(this.checkedLists.length>1){
                    this.$message('对不起,一次只能删除一条数据!');
                }else{
                    id={
                        id:this.checkedLists[0].id
                    }
                        this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            deleteIndexImg(id).then(res=>{
                                if (res.data.success==true) {
                                    this.$message({
                                        message: '删除成功!',
                                        type: 'success'
                                    });
                                    this.getPages();
                                }else{
                                    this.$message.error('删除未成功，请刷新后重新删除!');
                                }
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
                }

               

            },
     // 获取分页请求
      getPages(limit){
          getIndexImg (limit).then(res=>{
              this.tableData=res.data.data;
          })
      },      
  },
  mounted () {
      this.getPages();
  },
  created () {
            var limit={
                id:Number(this.$cookie.get('userId'))
            }
            getUserLoginState(limit).then(res=>{
                if (res.data.success==false) {
                    this.$router.push({path:'/login'});
                    this.$message.error('登录过期，请重新登录！');
                }

            })
        }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.table {
  width: 100%;
  font-size: 14px;
}
</style>
