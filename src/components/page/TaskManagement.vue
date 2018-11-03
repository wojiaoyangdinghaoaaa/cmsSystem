<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 任务管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" >批量删除</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr11" >批量审核</el-button> -->
                 <el-select v-model="select_cate" placeholder="状态管理" class="handle-select mr10">
                    <el-option key="1" label="任务进行中" value="任务进行中"></el-option>
                    <el-option key="2" label="任务已结束" value="任务已结束"></el-option>
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
                <el-table-column prop="serialNumber" label="任务编号" width="120">
                </el-table-column>
                <el-table-column label="发布时间"  width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="taskName" label="任务名称" width="120">
                </el-table-column>
                <el-table-column prop="sum" label="任务金额（元）"   width="120">
                </el-table-column>
                <el-table-column prop="downloadJiuyou" label="九游下载"   width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="downloadDangle" label="当乐下载" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="downloadGuopan"  label="果盘下载" width="100" :show-overflow-tooltip="true">
                </el-table-column>
                 <el-table-column prop="alipay"  label="任务状态" width="160" >
                </el-table-column>
                <el-table-column prop="accountBalance"  label="任务详情" width="160" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="require"  label="任务要求" width="160" :show-overflow-tooltip="true">
                </el-table-column>
                 <el-table-column   label="操作" width="180" align="center">
                     <template slot-scope="scope">
                      <el-button type="text" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
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

       
       
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "36",
          serialNumber: "000234",
          taskName: "刺激战场",
          sum:"5",
          downloadJiuyou: "https://lanhuapp.com/web/#/item/board?pid=bdba9c5f-ea36-40c2-9dea-d2fcd385534a",
          downloadDangle: "https://lanhuapp.com/web/#/item/board?pid=bdba9c5f-ea36-40c2-9dea-d2fcd385534a",
          downloadGuopan:'https://lanhuapp.com/web/#/item/board?pid=bdba9c5f-ea36-40c2-9dea-d2fcd385534a',
          alipay:'进行中',
          accountBalance:'121213211111111111111111111111111111111111111111111111',
          require:'123123123123123123'
        },
      
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
            date: "",
          serialNumber: "",
          taskName: "",
          sum:"",
          downloadJiuyou: "",
          downloadDangle: "",
          downloadGuopan:'',
          alipay:'',
          accountBalance:'',
          require:''
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
                     require:item.require
                }
                this.editVisible = true;
              this.$router.push({ path: '/releaseatask' })
            },
    // 保存编辑
            // saveEdit() {
            //     this.$set(this.tableData, this.idx, this.form);
            //     this.editVisible = false;
            //     this.$message.success(`设置成功`);
                
            //     if(this.radio=='1'){
            //         this.form.examine=2;
            //     }else if (this.radio=='2') {
            //         this.form.examine=3
            //     }
            // },
            
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
