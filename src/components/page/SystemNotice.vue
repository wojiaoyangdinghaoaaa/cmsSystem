<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-message"></i> 系统公告</el-breadcrumb-item>
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
      label="发布日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="noticename"
      label="公告名称"
      width="120">
    </el-table-column>
    
    <el-table-column
      prop="webtake"
      label="公告内容"
      width="300"
      :show-overflow-tooltip="true">
    </el-table-column>
    
    <el-table-column
      
      label="操作"
      width="100">
      <template slot-scope="scope">
        <router-link to="/">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>
            
            <div class="pagination">
                <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalItems">
                </el-pagination> -->
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
     
        tableData: [{
          issuedate: '2018-05-03',
          noticename: '暂停服务公告',
        
          webtake: '上海',
        },
        {
          issuedate: '2017-05-03',
          noticename: '暂停服务公告',

          webtake: '上海',
        },
        {
          issuedate: '2016-05-03',
          noticename: '暂停服务公告',

          webtake: '上海',
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
      
        //  this.is_search = true;
    if(this.select_word==''){
        this.$message.warning("查询条件不能为空！");
        return;
    };
    this. filterTableDataEnd=[];
    this.tableData.forEach((value,index)=>{
      if(value.issuedate){
        if(value.issuedate.indexOf(this.select_word)>=0){
           this. filterTableDataEnd.push(value)
        }
      };
       this.currentChangePage(this.filterTableDataEnd)
    })
    },
    currentChangePage(list) {

  console.log(list)
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
                    password: item.password,
                    alipay: item.alipay,
                    papers: item.papers,
                    uid: item.uid,
                    site:item.site,
                    alipayname: item.alipayname,
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
