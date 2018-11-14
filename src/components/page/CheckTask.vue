<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-edit"></i> 任务审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete"   :disabled="btnDisabled" @click="batchDele" class="handle-del mr10" >删除</el-button>
                 <el-select v-model="select_cate" placeholder="状态管理" class="handle-select mr10">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="已领取" value="已领取"></el-option>
                    <el-option key="3" label="待审核" value="待审核"></el-option>
                    <el-option key="4" label="审核通过" value="审核通过"></el-option>
                    <el-option key="5" label="审核未通过" value="审核未通过"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="输入用户id查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div> 
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  border  @selection-change="selectChange"  @select="checked"  @select-all="allChecked">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID" width="90" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="user.username" label="用户名称" width="150" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="taskId" label="任务ID" width="100" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="task.title" label="任务名称" width="150" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="task.price" label="任务金额（元）"   width="110" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="领取时间"  width="140" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">{{scope.row.takeTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
                    </el-table-column>
                    <el-table-column label="提交时间"  width="140" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span v-if="scope.row.submitTime">{{scope.row.submitTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span v-else>未提交</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核时间"  width="140" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span v-if="scope.row.checkTime">{{scope.row.checkTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span v-else>未审核</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="submitContent" label="回复内容" width="200" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="status"  label="审核状态" align="center" width="145" >
                    <template slot-scope="scope">
                        <el-button type="primary" plain disabled v-if="scope.row.status==0">已领取</el-button>
                        <el-button type="danger"  disabled v-else-if="scope.row.status==1">待审核</el-button>
                        <el-button type="success" plain disabled v-else-if="scope.row.status==2">审核通过</el-button>
                        <el-button type="info"  disabled v-else-if="scope.row.status==3">审核未通过</el-button>
                    </template>
                    </el-table-column>
                    <el-table-column   label="操作" width="150" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
                        </template>
                    </el-table-column>
                

            </el-table>
            
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination background 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20,50,100, 200, 400,1000]" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="data.total">
                </el-pagination>
            </div>

        </div>
        

         <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :label-position="labelPosition" ref="form" :model="form" label-width="90px" >
                 <el-form-item label="用户ID">
                    <el-input v-model="form.userId"  readonly></el-input>
                 </el-form-item>
                 <el-form-item label="用户名">
                    <el-input v-model="form.username"  readonly></el-input>
                 </el-form-item>
                 <el-form-item label="任务ID">
                    <el-input v-model="form.taskId"  readonly></el-input>
                 </el-form-item>
                 <el-form-item label="任务名">
                    <el-input v-model="form.title"  readonly></el-input>
                 </el-form-item>
                 <el-form-item label="任务金额">
                    <el-input v-model="form.price"  readonly></el-input>
                 </el-form-item>
                 <el-form-item label="领取时间">
                    <el-input v-model="form.takeTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="提交时间">
                    <el-input v-model="form.submitTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="审核时间">
                    <el-input v-model="form.checkTime" readonly></el-input>
                </el-form-item>
                 <el-form-item label="回复内容">
                     <el-input v-model="form.submitContent" readonly></el-input>
                </el-form-item>
                <div class="audit">
                    <el-radio-group v-model="radio">
                        <el-radio  :label="1">审核通过</el-radio>
                        <el-radio  :label="2">审核不通过</el-radio>
                    </el-radio-group>
                </div>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

       
       
        
    </div>
</template>

<script>
import {getUserTaskList,checkTask,deleteUserTask,getUserLoginState} from '../../api/getData';
import moment from 'moment' ;
export default {
  data() {
    return {
      tableData: [],
      btnDisabled:true,
      select_cate: '',
      select_word:'',
      editVisible:false,
      labelPosition:'left',
      form: {
          id:'',
          userId:"",
          username: "",
          taskId: "",
          title:"",
          price: "",
          takeTime: "",
          submitTime:'',
          checkTime:'',
          submitContent:'',
            },
        radio: 1,
        checkedLists:'',
        selectLists:'',
        taskStatus:'',
        limit:'',
        data:'',
        page:1,
        pageSizes:20,
    };
  },



  methods: {
 //每页条数
    handleSizeChange(val) {
        this.pageSizes=val;
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.taskStatus,
          userId:this.select_word ? this.select_word : null,
        }
        this.getPages(this.limit);  
    },
    //页数
    handleCurrentChange(val) {
        this.page=val;
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.taskStatus ? this.taskStatus : null,
          userId:this.select_word ? this.select_word : null,
        }
        this.getPages(this.limit);
    },
    // 搜索
    search() {
        this.page=1;
        if (this.select_cate=="全部") {
            this.taskStatus=null;
        }else if(this.select_cate=="已领取"){
            this.taskStatus=0;
        }else if(this.select_cate=="待审核"){
            this.taskStatus=1;
        }else if(this.select_cate=="审核通过"){
            this.taskStatus=2;
        }else if(this.select_cate=="审核未通过"){
            this.taskStatus=3;
        }

        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.taskStatus,
          userId:this.select_word ? this.select_word : null,
        }
        if (this.select_cate || this.select_word) {
            this.getPages(this.limit);
        }else{
            this.$message('先选择搜索要求，再进行搜索!');
        }

    },
    // 点击获取值
     handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    id:item.id,
                    userId:item.userId,
                    username: item.user.username,
                    taskId: item.taskId,
                    title:item.task.title,
                    price: item.task.price,
                    takeTime: moment(item.takeTime*1000).format("YYYY-MM-DD HH:mm:ss"),
                    submitTime:item.submitTime ? moment(item.submitTime*1000).format("YYYY-MM-DD HH:mm:ss") : '未提交',
                    checkTime:item.checkTime ? moment(item.checkTime*1000).format("YYYY-MM-DD HH:mm:ss") : '未审核',
                    submitContent:item.submitContent,
                }
                this.editVisible = true;  
            },
            // 保存编辑
    saveEdit() {
        this.$set(this.tableData, this.idx, this.form);
             var id =this.tableData[this.idx].id;
            if(this.radio==1){
                var ids={
                    id:id,
                    isPass:true
                }
                checkTask(ids).then(res=>{
                    if (res.data.success==true) {
                        this.$message({
                            message: '审核成功!',
                            type: 'success'
                        });
                        this.editVisible = false;
                        this.limit={
                            pageSize:this.pageSizes,
                            pageIndex:this.page
                        }
                        this.getPages(this.limit);
                    }else{
                        this.$message('审核未成功，请刷新后重新提交审核!');
                    }
                });
            }else if (this.radio==2) {
                var info={
                    id:id,
                    isPass:false
                }
                checkTask(info).then(res=>{
                    if (res.data.success==true) {
                        this.$message({
                            message: '审核成功!',
                            type: 'success'
                        });
                        this.editVisible = false;
                        this.limit={
                            pageSize:this.pageSizes,
                            pageIndex:this.page
                        }
                        this.getPages(this.limit);
                    }else{
                        this.$message('审核未成功，请刷新后重新提交审核!');
                    }
                });
            }
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
                            deleteUserTask(id).then(res=>{
                                if (res.data.success==true) {
                                    this.$message({
                                        message: '删除成功!',
                                        type: 'success'
                                    });
                                    this.limit={
                                        pageSize:this.pageSizes,
                                        pageIndex:this.page
                                    }
                                    this.getPages(this.limit);
                                }else{
                                    this.$message('删除未成功，请刷新后重新删除!');
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
          getUserTaskList (limit).then(res=>{
              this.tableData=res.data.data.list;
              this.data=res.data.data;
          })
      },      
  },
  mounted () {
      this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page
      }
      this.getPages(this.limit);
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

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.audit{
    text-align: center
}
</style>
