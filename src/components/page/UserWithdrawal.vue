<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-recharge"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" >批量删除</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr11" >批量审核</el-button> -->
                 <el-select v-model="select_cate" placeholder="状态管理" class="handle-select mr10">
                    <el-option key="1" label="已提现" value="1"></el-option>
                    <el-option key="2" label="未提现" value="2"></el-option>
                     <el-option key="3" label="未审核" value="3"></el-option>
                </el-select>
                <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div> 
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="uid" label="ID" width="120">
                </el-table-column>
                <el-table-column label="注册日期"  width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="nickname" label="用户名" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="手机号"   width="120">
                </el-table-column>
                <el-table-column prop="name" label="姓名"   width="120">
                </el-table-column>
                <el-table-column prop="money" label="提现金额（元）" width="120">
                </el-table-column>
                <el-table-column prop="alipayname"  label="支付宝姓名" width="100" >
                </el-table-column>
                 <el-table-column prop="alipay"  label="支付宝账户" width="160" >
                </el-table-column>
                <el-table-column prop="accountBalance"  label="账户余额（元）" width="160" >
                </el-table-column>
                 <el-table-column   label="操作" width="180" align="center">
                     <template slot-scope="scope">
                      <el-button type="text" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="状态" align="center"  show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button  type="warning" plain disabled  v-if="scope.row.examine==1">未审核</el-button>
                         <el-button type="success" plain disabled v-else-if="scope.row.examine==2">已提现</el-button>
                        <el-button type="danger"  disabled v-else-if="scope.row.examine==3">未提现</el-button>
                    </template>
                </el-table-column>

            </el-table>
            
            <div class="pagination">
                 <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
                </el-pagination>
            </div>
        </div>

       
       <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :label-position="labelPosition" ref="form" :model="form" label-width="90px" >
                 <el-form-item label="ID">
                    <el-input v-model="form.uid"></el-input>
                </el-form-item>
                <el-form-item label="提现日期" >
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                 <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="提现金额">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="支付宝姓名">
                    <el-input v-model="form.alipayname"></el-input>
                </el-form-item>
                <el-form-item label="支付宝">
                    <el-input v-model="form.alipay"></el-input>
                </el-form-item>
                <el-form-item label="账户余额">
                    <el-input v-model="form.accountBalance"></el-input>
                </el-form-item>
                 <div class="audit">
                    <el-radio v-model="radio" label="1">未提现</el-radio>
                    <el-radio v-model="radio" label="2">已提现</el-radio>
                   
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
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          nickname: "小二",
          phone: "17858025911",
          name:"曹子瑞",
          money: "20",
          alipay: "17858025911",
          uid:'001',
          alipayname:'杨杰',
          accountBalance:'100',
          examine:1
        },
        {
          date: "2016-05-03",
          nickname: "小三",
          phone: "17858025911",
          name:"曹子瑞",
          money: "20",
          alipay: "17858025911",
          uid:'002',
          alipayname:'杨杰',
           accountBalance:'100',
          examine:1
        },
        {
          date: "2016-05-03",
          nickname: "小四",
          phone: "17858025911",
          name:"曹子瑞",
          money: "20",
          alipay: "17858025911",
          uid:'003',
          alipayname:'杨杰',
           accountBalance:'100',
          examine:1
        },
        {
          date: "2016-05-03",
          nickname: "小五",
          phone: "17858025911",
          name:"曹子瑞",
          money: "20",
          alipay: "17858025911",
          uid:'004',
          alipayname:'杨杰',
           accountBalance:'100',
          examine:1
        },
        {
          date: "2016-05-03",
          nickname: "小六",
          phone: "17858025911",
          name:"曹子瑞",
          money: "20",
          alipay: "17858025911",
          uid:'005',
          alipayname:'杨杰',
           accountBalance:'100',
          examine:1
        }
      ],
      select_word: '',
      select_cate: '',
      is_search: false,
      currentPage: 1,
       pageSize: 2,
      totalItems:1000,
      editVisible:false,
      labelPosition:'left',
      
       radio: '1',
      form: {
            nickname: '',
            date: '',
            phone: '',
            alipay:'',
            papers:'',
            money:'',
            name:'',
            uid:'',
            alipayname:'',
             accountBalance:'',
            examine:''
            },
        // 选择时间
       pickerOptions2: {
          shortcuts: [{
        //     text: '最近一周',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近一个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近三个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        //       picker.$emit('pick', [start, end]);
        //     }
          }]
        },
        value7:''
    };
  },
   

  methods: {
 //分页
    handleCurrentChange(val) {
                this.cur_page = val;
                
                 console.log(val)
            },
           
 
    // 搜索
    search() {
         this.is_search = true;
    },
    // 点击获取值
     handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    phone: item.phone,
                    nickname: item.nickname,
                    money: item.money,
                    alipay: item.alipay,
                    papers: item.papers,
                    uid: item.uid,
                    alipayname: item.alipayname,
                     accountBalance:item.accountBalance,
                }
                this.editVisible = true;
              
            },
    // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`设置成功`);
                
                if(this.radio=='1'){
                    this.form.examine=2;
                }else if (this.radio=='2') {
                    this.form.examine=3
                }
            },
            
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
