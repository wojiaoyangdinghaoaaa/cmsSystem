<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-people"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 头部导航栏 -->
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" :disabled="btnDisabled" @click="batchDele">批量删除</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr11" :disabled="btnDisabled" @click="batchCheck">批量审核</el-button>
                <el-select v-model="select_cate" placeholder="状态管理" class="handle-select mr10">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="审核通过" value="审核通过"></el-option>
                    <el-option key="3" label="审核未通过" value="审核未通过"></el-option>
                    <el-option key="4" label="未审核" value="未审核"></el-option>
                </el-select>
                <el-date-picker
                 v-model="checkTime"
                 type="daterange"
                 align="center"
                 unlink-panels
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期"
                 :picker-options="pickerOptions"
                 value-format="timestamp">
                </el-date-picker>
                <el-input v-model="select_word" placeholder="输入手机号查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search" >搜索</el-button>
            </div> 

             

            <!-- 表格数据 -->
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  border @selection-change="selectChange"  @select="checked" @select-all="allChecked">

                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="ID" width="100" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="注册日期"  width="140" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{scope.row.createTime*1000 | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="120" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="tel" label="手机号"   width="120" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="password" label="密码" width="120" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="realName" label="姓名"   width="120" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="idNumber" label="身份证号" width="160" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="alipayRealName"  label="支付宝姓名" width="100" align="center" :show-overflow-tooltip="true" >
                </el-table-column>
                
                 <el-table-column prop="alipayAccount"  label="支付宝账户" width="160" align="center" :show-overflow-tooltip="true" >
                </el-table-column>
                <el-table-column prop="site"  label="收货地址" width="100" align="center" :show-overflow-tooltip="true" >
                </el-table-column>
                 <el-table-column   label="操作" width="180" align="center" :show-overflow-tooltip="true">
                     <template slot-scope="scope">
                      <el-button type="text" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="状态" align="center"   :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-button  type="warning" plain disabled  v-if="scope.row.status==0">未审核</el-button>
                         <el-button type="success" plain disabled v-else-if="scope.row.status==1">审核通过</el-button>
                        <el-button type="danger"  disabled v-else-if="scope.row.status==-1">审核未通过</el-button>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :label-position="labelPosition" ref="form" :model="form" label-width="90px" >
                 <el-form-item label="ID">
                    <el-input v-model="form.id" readonly></el-input>
                </el-form-item>
                <el-form-item label="注册日期" >
                    <el-input v-model="form.createTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username" readonly></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.tel" readonly></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                 <el-form-item label="姓名">
                    <el-input v-model="form.realName" readonly></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                    <el-input v-model="form.idNumber" readonly></el-input>
                </el-form-item>
                <el-form-item label="支付宝姓名">
                    <el-input v-model="form.alipayRealName"></el-input>
                </el-form-item>
                <el-form-item label="支付宝">
                    <el-input v-model="form.alipayAccount"></el-input>
                </el-form-item>
                <el-form-item label="收货地址">
                    <el-input v-model="form.site"></el-input>
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
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 批量审核提示框 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-radio-group v-model="check">
                <el-radio  :label="1">审核通过</el-radio>
                <el-radio  :label="2">审核不通过</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cenclAllCheck">取 消</el-button>
                <el-button type="primary" @click="allCheck">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {getUserList,deleteUser,checkeUser,changeUserInfo,getUserLoginState} from '../../api/getData';
import moment from 'moment' 

export default {
  data() {
    return {
      tableData: [],
      btnDisabled:true,
      selectLists:[],
      select_word: '',
      select_cate: '',
      checkTime:'',
      srartTime:'',
      endTime:'',
      check:1,
      editVisible:false,
      dialogVisible: false,
      labelPosition:'left',
      radio: 1,
      form: {
        username: '',
        createTime: '' ,
        tel: '',
        alipayAccount:'',
        idNumber:'',
        password:'',
        realName:'',
        id:'',
        alipayRealName:'',
        site:'',
        status:''
            },
       userStatus:'',
       changePass:'',
       changeAlipay:'',
       changeAlipayName:'',
       limit:{},
       data:[],
       checkedLists:[],
       ids:[],
       page:1,
       pageSizes:20,
       pickerOptions: {
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
        
      
    };
  },
   

  methods: {
    //每页条数
    handleSizeChange(val) {
        this.pageSizes=val;
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.userStatus ? this.userStatus : null,
          tel:this.select_word ? this.select_word : null,
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
          status:this.userStatus ? this.userStatus : null,
          tel:this.select_word ? this.select_word : null,
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
        if (this.select_cate=="审核未通过") {
            this.userStatus=-1;
        }else if(this.select_cate=="未审核"){
            this.userStatus=0;
        }else if(this.select_cate=="审核通过"){
            this.userStatus=1;
        }else if(this.select_cate=="全部"){
            this.userStatus=null;
        }
        this.limit={
          pageSize:this.pageSizes,
          pageIndex:this.page,
          status:this.userStatus ? this.userStatus : null,
          tel:this.select_word ? this.select_word : null,
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
                    realName: item.realName,
                    createTime: moment(item.createTime*1000).format("YYYY-MM-DD HH:mm:ss"),
                    tel: item.tel,
                    username: item.username,
                    password: item.password,
                    alipayAccount: item.alipayAccount,
                    idNumber: item.idNumber,
                    id: item.id,
                    site:item.site,
                    alipayRealName: item.alipayRealName,
                }
                this.changePass=item.password;
                this.changeAlipayName=item.alipayRealName;
                this.changeAlipay=item.alipayAccount;
                this.editVisible = true;
              
            },
    // 保存编辑
    saveEdit() {
        this.$set(this.tableData, this.idx, this.form);
             var id =this.tableData[this.idx].id;
            if(this.form.password!=this.changePass){
                var password=this.form.password;
            }
            if(this.form.alipayRealName!=this.changeAlipayName){
                var changeAlipayName=this.form.alipayRealName;
            }
            if(this.form.alipayAccount!=this.changeAlipay){
                var changeAlipay=this.form.alipayAccount;
            }
            if(this.radio==1){
                var ids={
                    id:id,
                    status:1,
                    password:password,
                    alipayRealName:changeAlipayName,
                    alipayAccount:changeAlipay
                }
                changeUserInfo(ids).then(res=>{
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
                    status:-1,
                    password:password,
                    alipayRealName:changeAlipayName,
                    alipayAccount:changeAlipay
                }
                changeUserInfo(info).then(res=>{
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
            // 批量审核事件
            batchCheck(){
                this.dialogVisible=true;
                this.ids=[];
                var checkedLists=this.checkedLists;
                for(let i=0;i<checkedLists.length;i++){
                    this.ids.push(checkedLists[i].id);
                }
            },
            allCheck(){
                if(this.check==1){
                    var ids=1;
                    checkeUser(ids,this.ids).then(res=>{
                        if (res.data.success==true) {
                            this.$message({
                                message: '审核成功!',
                                type: 'success'
                            });
                            this.dialogVisible=false;
                            this.limit={
                                pageSize:this.pageSizes,
                                pageIndex:this.page
                            }
                            this.getPages(this.limit);
                        }else{
                            this.$message('审核未成功，请刷新后重新提交审核!');
                        }
                    });
                }else if(this.check==2){
                    var id=-1;
                    checkeUser(id,this.ids).then(res=>{
                        if (res.data.success==true) {
                            this.$message({
                                message: '审核成功!',
                                type: 'success'
                            });
                            this.dialogVisible=false;
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
            cenclAllCheck(){
                this.dialogVisible=false;
                this.$message('取消审核!');
            },
            handleClose() {
                this.dialogVisible=false;
                this.$message('取消审核!');
            },
            // 批量删除事件
            batchDele(){
                this.ids=[];
                var checkedLists=this.checkedLists;
                for(let i=0;i<checkedLists.length;i++){
                    this.ids.push(checkedLists[i].id);
                }
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(this.ids).then(res=>{
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
            },
            // 获取分页请求
            getPages(limit){
                getUserList (limit).then(res=>{
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
