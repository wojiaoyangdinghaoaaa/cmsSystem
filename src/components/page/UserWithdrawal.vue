<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-recharge"></i> 用户提现</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10"  :disabled="btnDisabled" @click="batchDele">删除</el-button>
                 <el-select v-model="select_cate" placeholder="状态管理" class="handle-select mr10">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="未审核" value="未审核"></el-option>
                    <el-option key="3" label="审核通过" value="审核通过"></el-option>
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
                <el-input v-model="select_word" placeholder="输入用户id查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div> 
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  border  @selection-change="selectChange"  @select="checked" @select-all="allChecked">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="userId" label="用户ID" width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="user.username" label="用户名" width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="user.realName" label="真实姓名"   width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="user.tel" label="手机号"   width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="user.alipayRealName"  label="支付宝姓名" width="100" :show-overflow-tooltip="true" >
                    </el-table-column>
                    <el-table-column prop="user.alipayAccount"  label="支付宝账户" width="150" :show-overflow-tooltip="true" >
                    </el-table-column>
                    <el-table-column label="提现时间"  width="150" :show-overflow-tooltip="true">
                        <template slot-scope="scope">{{scope.row.createTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
                    </el-table-column>
                    <el-table-column prop="money" label="提现金额（元）" width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column label="审核时间"  width="150" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span v-if="scope.row.checkTime">{{scope.row.checkTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span v-else>未审核</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user.balance"  label="账户余额（元）" width="100"  :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column   label="操作" width="150" align="center">
                        <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center"  show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button  type="danger" plain disabled  v-if="scope.row.status==0">未审核</el-button>
                            <el-button type="success" plain disabled v-else-if="scope.row.status==1">审核通过</el-button>
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

       
       <!-- 编辑弹出框 -->
        <el-dialog title="审核" :visible.sync="editVisible" width="30%">
            <el-form :label-position="labelPosition" ref="form" :model="form" label-width="90px" >
                 <el-form-item label="用户ID">
                    <el-input v-model="form.userId" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username" readonly></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form.realName" readonly></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.tel" readonly></el-input>
                </el-form-item>
                <el-form-item label="支付宝姓名">
                    <el-input v-model="form.alipayRealName" readonly></el-input>
                </el-form-item>
                <el-form-item label="支付宝账户">
                    <el-input v-model="form.alipayAccount" readonly></el-input>
                </el-form-item>
                <el-form-item label="提现时间" >
                    <el-input v-model="form.createTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="提现金额" >
                    <el-input v-model="form.money" readonly></el-input>
                </el-form-item>
                <el-form-item label="审核时间" >
                    <el-input v-model="form.checkTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="账户余额">
                    <el-input v-model="form.balance" readonly></el-input>
                </el-form-item>
                 <div class="audit">
                    <el-radio v-model="radio" :label="1">审核通过</el-radio>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        
    </div>
</template>

<script>
import {getUserPutMomey,checkUserPutMomey,deleteUserPutMomey,getUserLoginState} from '../../api/getData';
import moment from 'moment';
export default {
  data() {
    return {
      tableData: [],
      btnDisabled:true,
      selectLists:[],
      checkedLists:[],
      select_word: '',
      select_cate: '',
      editVisible:false,
      labelPosition:'left',
      radio: 1,
      form: {
            id:'',
            userId: '',
            username: '',
            realName: '',
            tel:'',
            alipayRealName:'',
            alipayAccount:'',
            createTime:'',
            money:'',
            checkTime:'',
            balance:'',
            },
        // 选择时间
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
        putMomeyStatus:'',
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
          status:this.putMomeyStatus,
          userId:this.select_word ? this.select_word : null,
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
          status:this.putMomeyStatus,
          userId:this.select_word ? this.select_word : null,
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
        if (this.select_cate=="未审核") {
            this.putMomeyStatus=0;
        }else if(this.select_cate=="审核通过"){
            this.putMomeyStatus=1;
        }else if(this.select_cate=="全部"){
            this.putMomeyStatus=null;
        }
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.putMomeyStatus,
          userId:this.select_word ? this.select_word : null,
          startTime:this.srartTime ? parseInt(this.srartTime/1000) : null,
          endTime:this.endTime ? parseInt(this.endTime/1000) : null
        }
        if (this.select_cate || this.select_word ||this.checkTime) {
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
                    userId: item.userId,
                    username: item.user.username,
                    realName: item.user.realName,
                    tel:item.user.tel,
                    alipayRealName:item.user.alipayRealName,
                    alipayAccount:item.user.alipayAccount,
                    createTime:moment(item.createTime*1000).format("YYYY-MM-DD HH:mm:ss"),
                    money:item.money,
                    checkTime:item.checkTime ? moment(item.checkTime*1000).format("YYYY-MM-DD HH:mm:ss") : "未审核",
                    balance:item.user.balance
                }
                this.editVisible = true;
              
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                var id =this.tableData[this.idx].id;
                console.log(id)
                if(this.radio==1){
                    var ids={
                        id:id
                    }
                    checkUserPutMomey(ids).then(res=>{
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
            // 批量删除事件
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
                            deleteUserPutMomey(id).then(res=>{
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
                getUserPutMomey (limit).then(res=>{
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
