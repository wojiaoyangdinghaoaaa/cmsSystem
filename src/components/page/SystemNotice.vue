<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-message"></i> 系统公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                  <el-button type="primary" icon="delete"   :disabled="btnDisabled" @click="batchDele" class="handle-del mr10" >删除</el-button>
                  <el-select v-model="select_type" placeholder="通告类型" class="handle-select mr10">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="通知" value="通知"></el-option>
                    <el-option key="3" label="活动" value="活动"></el-option>
                  </el-select>
                  <el-select v-model="select_status" placeholder="状态管理" class="handle-select mr10">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="上架" value="上架"></el-option>
                    <el-option key="3" label="下架" value="下架"></el-option>
                  </el-select>
                  <el-date-picker
                    v-model="checkTime"
                    type="daterange"
                    align="center"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                  <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div> 
                <template>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100%"
                        @selection-change="selectChange"  
                        @select="checked"  
                        @select-all="allChecked">
                        <el-table-column 
                          type="selection" 
                          width="55">
                        </el-table-column>
                        <el-table-column 
                          prop="id" 
                          label="ID" 
                          align="center"
                          :show-overflow-tooltip="true"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          label="发布日期"
                          align="center"
                          :show-overflow-tooltip="true"
                          width="150">
                            <template slot-scope="scope">{{scope.row.createTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="title"
                          label="通知名称"
                          :show-overflow-tooltip="true"
                          align="center"
                          width="220">
                        </el-table-column>

                        <el-table-column
                          prop="type"
                          label="通告类型"
                          :show-overflow-tooltip="true"
                          align="center"
                          width="145">
                            <template slot-scope="scope">
                                <el-button type="primary" plain disabled v-if="scope.row.type==1">通知</el-button>
                                <el-button type="info"  disabled v-else-if="scope.row.type==2">活动</el-button>
                            </template>
                        </el-table-column>

                        <el-table-column
                          prop="status"
                          label="通告状态"
                          :show-overflow-tooltip="true"
                          align="center"
                          width="120">
                            <template slot-scope="scope">
                                <el-button type="success" plain disabled v-if="scope.row.status==1">上架</el-button>
                                <el-button type="danger"  disabled v-else-if="scope.row.status==0">下架</el-button>
                            </template>
                        </el-table-column>
                        
                        <el-table-column
                          prop="content"
                          label="公告内容"
                          align="center"
                          width="660"
                          :show-overflow-tooltip="true">
                        </el-table-column>
                        
                        <el-table-column
                          label="操作"
                          width="120"
                          :show-overflow-tooltip="true"
                          align="center">
                          <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
                          </template>
                        </el-table-column>
                    </el-table>
                  </template>
            
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
    </div>
</template>

<script>
import {getInform,deleteInform,getUserLoginState} from '../../api/getData';
export default {
  data() {
    return {
      data:'',
      limit:'',
      btnDisabled:true,
      select_status: '',
      select_type:'',
      editVisible:false,
      labelPosition:'left',
      tableData: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        informStatus:'',
        informType:'',
        checkTime:'',
        srartTime:'',
        endTime:'',
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
          status:this.informStatus ? this.informStatus : null,
          type:this.informType ? this.informType : null,
          startTime:this.srartTime ? parseInt(this.srartTime/1000) : null,
          endTime:this.endTime ? parseInt(this.endTime/1000) : null
        }
        this.getPages(this.limit);  
    },
    //页数
    handleCurrentChange(val) {
        this.page=val;
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.informStatus ? this.informStatus : null,
          type:this.informType ? this.informType : null,
          startTime:this.srartTime ? parseInt(this.srartTime/1000) : null,
          endTime:this.endTime ? parseInt(this.endTime/1000) : null
        }
        this.getPages(this.limit);
    },
    // 搜索
    search() {
        this.page=1;
        this.srartTime=this.checkTime[0];
        this.endTime=this.checkTime[1];
        if (this.select_status=="全部") {
            this.informStatus=null;
        }else if(this.select_status=="下架"){
            this.informStatus=0;
        }else if(this.select_status=="上架"){
            this.informStatus=1;
        }

        if (this.select_type=="全部") {
            this.informType=null;
        }else if(this.select_type=="通知"){
            this.informType=1;
        }else if(this.select_type=="活动"){
            this.informType=2;
        }

        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.informStatus ? this.informStatus : null,
          type:this.informType ? this.informType : null,
          startTime:this.srartTime ? parseInt(this.srartTime/1000) : null,
          endTime:this.endTime ? parseInt(this.endTime/1000) : null
        }

        if (this.select_status || this.checkTime || this.select_type) {
            this.getPages(this.limit);
        }else{
            this.$message('先选择搜索要求，再进行搜索!');
        }
    },
    // 点击获取值
     handleEdit(index, row) { 
        if(row.id){
            this.$router.push({ path: '/announce',query:{from:'edit',id:row.id}}); 
        }else{
            this.$message('请刷新后再试一次!');
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
                            deleteInform(id).then(res=>{
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
            // 获取数据
            getPages(limit){
                getInform (limit).then(res=>{
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
