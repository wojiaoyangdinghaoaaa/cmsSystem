<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-phone-outline"></i> 意见反馈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                  <el-button type="primary" icon="delete" class="handle-del mr10" :disabled="btnDisabled" @click="batchDele">批量删除</el-button>
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
                
                <el-input v-model="select_word" placeholder="输入反馈者ID" class="handle-input mr10"></el-input>
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
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column
                          prop="id"
                          label="列表ID"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          label="日期"
                          width="180">
                            <template slot-scope="scope">{{scope.row.createTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="userId"
                          label="反馈者ID"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="email"
                          label="邮箱"
                          width="200">
                        </el-table-column>
                        <el-table-column
                          prop="tel"
                          label="电话"
                          width="150">
                        </el-table-column>
                        <el-table-column
                          prop="content"
                          label="内容"
                          width="565"
                          :show-overflow-tooltip="true">
                        </el-table-column>
                        
                        <el-table-column
                          label="操作"
                          width="150">
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

         <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :label-position="labelPosition" ref="form" :model="form" label-width="90px" >
                 <el-form-item label="列表ID">
                    <el-input v-model="form.id"  readonly></el-input>
                 </el-form-item>
                 <el-form-item label="日期">
                    <el-input v-model="form.createTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="反馈者ID" >
                    <el-input v-model="form.userId" readonly></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.tel" readonly></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" readonly></el-input>
                </el-form-item>
                 
                 <el-form-item label="内容">
                    <el-input type="textarea" v-model="form.content" class="contentTextarea" readonly></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {getFeedbackList,deleteFeedback,getUserLoginState} from '../../api/getData';
import moment from 'moment' ;
export default {
  data() {
    return {
      btnDisabled:true,
      select_word: '',
      is_search: false,
      editVisible:false,
      labelPosition:'left',
      checkedLists:[],
      selectLists:[],
       radio: '1',
       form: {
            id: '',
            createTime: '',
            userId: '',
            tel:'',
            email:'',
            content:'',
            },
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
        checkTime:'',
        srartTime:'',
        endTime:'',
        limit:{},
        data:'',
        ids:[],
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
          userId:this.select_word ? this.select_word : null,
          startTime:this.srartTime ? this.srartTime/1000 : null,
          endTime:this.endTime ? this.endTime/1000 : null
        }
        this.getPages(this.limit);  
    },
    //页数
    handleCurrentChange(val) {
        this.page=val;
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          userId:this.select_word ? this.select_word : null,
          startTime:this.srartTime ? this.srartTime/1000 : null,
          endTime:this.endTime ? this.endTime/1000 : null
        }
        this.getPages(this.limit);
    },
           
 
    // 搜索
    search() {
        this.page=1;
        this.srartTime=this.checkTime[0];
        this.endTime=this.checkTime[1];
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          userId:this.select_word ? this.select_word : null,
          startTime:this.srartTime ? this.srartTime/1000 : null,
          endTime:this.endTime ? this.endTime/1000 : null
        }
        if (this.select_word || this.checkTime) {
            this.getPages(this.limit);
        }else{
            this.$message.error('先选择搜索要求，再进行搜索!');
        }

    
    },
    

    // 点击获取值
     handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    id: item.id,
                    createTime: moment(item.createTime*1000).format("YYYY-MM-DD HH:mm:ss"),
                    userId: item.userId,
                    tel: item.tel,
                    email: item.email,
                    content: item.content, 
                }
                this.editVisible = true;
              
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
             // 批量删除事件
            batchDele(){
                this.ids=[];
                var checkedLists=this.checkedLists;
                for(let i=0;i<checkedLists.length;i++){
                    this.ids.push(checkedLists[i].id);
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteFeedback(this.ids).then(res=>{
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
                            this.$message.error('删除未成功，请刷新后重新删除!');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // 获取分页请求
            getPages(limit){
                getFeedbackList (limit).then(res=>{
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
.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
</style>
