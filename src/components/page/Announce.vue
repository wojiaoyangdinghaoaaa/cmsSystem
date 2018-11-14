<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  v-if="from!='edit'"><i class="el-icon-lx-roundadd"></i>发布通告</el-breadcrumb-item>
                <el-breadcrumb-item    v-else-if="from=='edit'"><i class="el-icon-lx-roundadd"></i>编辑通告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="container_cen">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm">
           <el-form-item label="通告标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="通告内容" prop="content" >
                <el-input class="taskContent" type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item label="通告类型">
              <el-radio-group v-model="ruleForm.type" size="medium">
                <el-radio border label="通知"></el-radio>
                <el-radio border label="活动"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="通告状态">
              <el-radio-group v-model="ruleForm.resource" size="medium">
                <el-radio border label="上架"></el-radio>
                <el-radio border label="下架"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"  size="large" @click="submitForm()">立即创建</el-button>
                <el-button size="large" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
        </div>
    </div>
</template>


<script>
import {setInform,getInformDetail,editInform,getUserLoginState} from '../../api/getData';
  export default {
    data() {
      return {
        ruleForm: {
          title:'',
          content: '',
          type:'',
          resource:''
        },
        limit:{},
        from:'',
        id:''
      };
    },
   
    methods: {
      // 发布
      submitForm(formName) {
        if (this.ruleForm.title!='' && this.ruleForm.content!='' && this.ruleForm.type!='' && this.ruleForm.resource!='') {
          // 新增
          if(this.from!="edit"){
              var type='';
              var taskStatus='';
              if (this.ruleForm.type=='通知') {
                  type=1;
              }else if(this.ruleForm.type=='活动'){
                  type=2;
              }
              if (this.ruleForm.resource=='上架') {
                  taskStatus=1;
              }else if(this.ruleForm.resource=='下架'){
                  taskStatus=0;
              }
              this.limit={
                title:this.ruleForm.title,
                content:this.ruleForm.content,
                type:type,
                status:taskStatus
              }
              setInform(this.limit).then(res=>{
                  if (res.data.success==true) {
                      this.$message({
                          message: '创建成功!',
                          type: 'success'
                      });
                      this.$router.push({path:'/systemnotice'});
                    }else{
                      this.$message(res.data.message);
                    }
              })
          }else{
            // 编辑
            var type='';
              var taskStatus='';
              if (this.ruleForm.type=='通知') {
                  type=1;
              }else if(this.ruleForm.type=='活动'){
                  type=2;
              }
              if (this.ruleForm.resource=='上架') {
                  taskStatus=1;
              }else if(this.ruleForm.resource=='下架'){
                  taskStatus=0;
              }
              this.limit={
                id:this.id,
                title:this.ruleForm.title,
                content:this.ruleForm.content,
                type:type,
                status:taskStatus
              }
              editInform(this.limit).then(res=>{
                  if (res.data.success==true) {
                      this.$message({
                          message: '创建成功!',
                          type: 'success'
                      });
                      this.$router.push({path:'/systemnotice'});
                    }else{
                      this.$message(res.data.message);
                    }
              })
          }
              

        }else{
          this.$message('信息未填写完整,不能提交!');
        }
      },
      // 重置数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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

      this.from=this.$route.query.from;
      this.id=this.$route.query.id;
      if(this.from=="edit"){
          let id='';
          id={
            id:this.id
          }
          getInformDetail(id).then(res=>{
              if(res.data.success==true){
                var data=res.data.data;
                this.ruleForm.title=data.title;
                this.ruleForm.content=data.content;
                if(data.type==1){
                    this.ruleForm.type='通知'
                }else if(data.type==2){
                    this.ruleForm.type='活动'
                }
                if(data.status==1){
                    this.ruleForm.resource='上架'
                }else if(data.status==0){
                    this.ruleForm.resource='下架'
                }
              }else{
                  this.$message(res.data.message);
              }
          })
      }
    }
     
      


  }
</script>


<style>
.container_cen{width: 800px}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload--text{
    width: 180px !important;
  }
  .el-upload-dragger{
    width: 180px !important;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-textarea__inner{
    height: 500px;
    min-height: 500px;
    resize:none;
  }
</style>
