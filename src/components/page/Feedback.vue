<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 意见反馈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
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
                
                <el-input v-model="select_word" placeholder="搜索公告名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div> 
                <template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="issuedate"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="noticename"
      label="反馈者名称"
      width="120">
    </el-table-column>
     <el-table-column
      prop="mailbox"
      label="邮箱"
      width="140">
    </el-table-column>
     <el-table-column
      prop="phone"
      label="电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="300"
      :show-overflow-tooltip="true">
    </el-table-column>
    
    <el-table-column
      
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
            
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

         <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :label-position="labelPosition" ref="form" :model="form" label-width="90px" >
                 <el-form-item label="日期">
                    <el-input v-model="form.noticename"></el-input>
                </el-form-item>
                <el-form-item label="反馈者名称" >
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.issuedate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.mailbox"></el-input>
                </el-form-item>
                 
                 <el-form-item label="内容">

                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
  data() {
    return {
      
      select_word: '',
      select_cate: '',
      is_search: false,
       currentPage: 1,
       pageSize: 2,
      totalItems:1000,
      filterTableDataEnd:[],
      editVisible:false,
      labelPosition:'left',
      
       radio: '1',
       form: {
            nickname: '',
            date: '',
            phone: '',
            alipay:'',
            papers:'',
            password:'',
            name:'',
            uid:'',
            alipayname:'',
            site:'',
            examine:''
            },
        
        tableData: [{
          issuedate: '2018-05-03',
          noticename: '暂停服务公告',
          phone:'17858025911',
          mailbox:'369360059@qq.com',
          content: '上海11111111',
        },
        {
          issuedate: '2017-05-03',
          noticename: '暂停服务公告',
          phone:'17858025911',
          mailbox:'369360059@qq.com',  
          content: '上海111111',
        },
        {
          issuedate: '2016-05-03',
          noticename: '暂停服务公告',
          phone:'17858025911',
          mailbox:'369360059@qq.com',
          content: '上海111',
        }
        ],
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
        
        value7: ''
      
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
                    issuedate: item.issuedate,
                    noticename: item.noticename,
                    phone: item.phone,
                    mailbox: item.mailbox,
                    content: item.content,
                    
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
