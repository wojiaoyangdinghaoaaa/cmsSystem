<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  v-if="from!='edit'"><i class="el-icon-document"></i>发布任务</el-breadcrumb-item>
                <el-breadcrumb-item    v-else-if="from=='edit'"><i class="el-icon-document"></i>编辑任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="container_cen">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
             <el-form-item label="任务图" prop="gameImg">
              <el-upload
                class="avatar-uploader"
                :action="imgUrl"
                :show-file-list="true"
                :drag="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

           </el-form-item>
           <el-form-item label="任务ID" prop="taskId"   v-if="from!='edit'">
                <el-input v-model="ruleForm.taskId"></el-input>
            </el-form-item>
            <el-form-item label="任务ID" v-else-if="from=='edit'">
                <el-input v-model="ruleForm.taskId" readonly></el-input>
            </el-form-item>
            <el-form-item label="任务名称" prop="taskName">
                <el-input v-model="ruleForm.taskName"></el-input>
            </el-form-item>
            <el-form-item label="任务编号" prop="serialNumber">
                <el-input v-model="ruleForm.serialNumber"  ></el-input>
            </el-form-item>
            <el-form-item label="任务金额" prop="sum"  v-if="from!='edit'">
                <el-input v-model="ruleForm.sum"  ></el-input>
            </el-form-item>
            <el-form-item label="任务金额"  v-else-if="from=='edit'">
                <el-input v-model="ruleForm.sum"  ></el-input>
            </el-form-item>
            <el-form-item label="任务总量" prop="allNum">
                <el-input v-model="ruleForm.allNum"  ></el-input>
            </el-form-item>
            <el-form-item label="已领取数量" prop="alreadNum">
                <el-input v-model="ruleForm.alreadNum"  ></el-input>
            </el-form-item>
            <el-form-item label="任务时间（小时）"  prop='missionTime'  v-if="from!='edit'">
                <el-input v-model="ruleForm.missionTime"></el-input>
            </el-form-item>
            <el-form-item label="任务时间（小时）" v-else-if="from=='edit'">
                <el-input v-model="ruleForm.missionTime" readonly></el-input>
            </el-form-item>
            
            <el-form-item label="九游下载"  prop='downloadJiuyou'>
            <el-input placeholder="请输入内容" v-model="ruleForm.downloadJiuyou">
                <template slot="prepend"></template>
            </el-input>
              </el-form-item>
             <el-form-item label="当乐下载"  prop='downloadDangle'>
            <el-input placeholder="请输入内容" v-model="ruleForm.downloadDangle">
                <template slot="prepend"></template>
            </el-input>
              </el-form-item>
             <el-form-item label="果盘下载"  prop='downloadGuopan'>
            <el-input placeholder="请输入内容" v-model="ruleForm.downloadGuopan">
                <template slot="prepend"></template>
            </el-input>
              </el-form-item>
            <el-form-item label="任务状态">
              <el-radio-group v-model="ruleForm.resource" size="medium">
                <el-radio border label="上架"></el-radio>
                <el-radio border label="下架"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="任务详情" prop="taskdetail" >
              <el-input class="taskContent" type="textarea" v-model="ruleForm.content"></el-input>
                <!-- <quill-editor 
                v-model="ruleForm.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
              </quill-editor> -->
            </el-form-item>
            <el-form-item label="任务要求" prop="require" >
              <el-input  class="taskRequire" type="textarea" v-model="ruleForm.require"></el-input>
                
            </el-form-item>

            <el-form-item>
                <el-button type="primary"  size="large" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button size="large" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
        </div>
    </div>
</template>


<script>
import {setTask,getOneTask,editOneTask,getUserLoginState} from '../../api/getData';
import { baseUrl} from '../../api/env';
 import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        
        editorOption: {},//富文本编辑器
        gameImg:'',
        imageUrl: '',
        imgUrl:baseUrl+'/common/qiniuUpload',
        taskImg:'',
        ruleForm: {
          taskId:'',
          taskName: '',
          serialNumber: '',
          sum: '',
          allNum:'',
          alreadNum:'',
          missionTime: '',
          downloadJiuyou: '',
          taskdetail: '',
          downloadDangle:'',
          resource: '',
          downloadGuopan:'',
          content:'',
          require:''
        },
        limit:{},
        from:'',
        rules: {
          taskId: [
            { required: true, message: '请填写任务ID', trigger: 'blur' }
          ],
          taskName: [
            { required: true, message: '请填写任务名称', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          serialNumber: [
            { required: true, message: '请填写编号', trigger: 'blur' }
          ],
          sum: [
              { required: true, message: '请输入金额', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100个字符', trigger: 'blur' }
          ],
          allNum: [
              { required: true, message: '请输入任务总量', trigger: 'blur' }
          ],
          alreadNum: [
              { required: true, message: '请输入已领取数量', trigger: 'blur' }
          ],
          missionTime: [
           { required: true, message: '请输入任务时间', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          downloadJiuyou: [
             { required: true, message: '请输入就有下载地址', trigger: 'blur' }
          ],
          downloadDangle: [
             { required: true, message: '请输入当乐下载地址', trigger: 'blur' }
          ],
           downloadGuopan: [
             { required: true, message: '请输入果盘下载地址', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写任务要求', trigger: 'blur' }
          ],
          require: [
            { required: true, message: '请填写任务详情', trigger: 'blur' }
          ],
        }
      };
    },
   
    methods: {
        onEditorBlur(){//失去焦点事件

        },
        onEditorFocus(){//获得焦点事件

        },
        onEditorChange(){//内容改变事件
                
        },
      // 发布
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 新增
            if (this.from!="edit") {
              var taskStatus='';
              if (this.ruleForm.resource=='上架') {
                  taskStatus=1;
              }else if(this.ruleForm.resource=='下架'){
                  taskStatus=0;
              }
              
              this.limit={
                id:this.ruleForm.taskId,
                code:this.ruleForm.serialNumber,
                title:this.ruleForm.taskName,
                content:this.ruleForm.content,
                goal:this.ruleForm.require,
                price:this.ruleForm.sum,
                total:this.ruleForm.allNum,
                num:this.ruleForm.alreadNum,
                picture:this.taskImg,
                jiuyouDownload:this.ruleForm.downloadJiuyou,
                dangleDownload:this.ruleForm.downloadDangle,
                guopanDownload:this.ruleForm.downloadGuopan,
                hourLength:this.ruleForm.missionTime,
                status:taskStatus,
              };
              setTask(this.limit).then(res=>{
                  if (res.data.success==true) {
                    this.$message({
                        message: '创建成功!',
                        type: 'success'
                    });
                    this.resetForm(formName);
                    this.$router.push({path:'/taskmanagement'});
                  }else{
                    this.$message(res.data.message);
                  }
              });
            }else{
              // 编辑
               var taskStatus='';
                if (this.ruleForm.resource=='上架') {
                    taskStatus=1;
                }else if(this.ruleForm.resource=='下架'){
                    taskStatus=0;
                }
                
                this.limit={
                  id:this.ruleForm.taskId,
                  code:this.ruleForm.serialNumber,
                  title:this.ruleForm.taskName,
                  content:this.ruleForm.content,
                  goal:this.ruleForm.require,
                  price:this.ruleForm.sum,
                  total:this.ruleForm.allNum,
                  num:this.ruleForm.alreadNum,
                  picture:this.taskImg ? this.taskImg : this.imageUrl,
                  jiuyouDownload:this.ruleForm.downloadJiuyou,
                  dangleDownload:this.ruleForm.downloadDangle,
                  guopanDownload:this.ruleForm.downloadGuopan,
                  hourLength:this.ruleForm.missionTime,
                  status:taskStatus,
                };
                editOneTask(this.limit).then(res=>{
                  if (res.data.success==true) {
                    this.$message({
                        message: '修改成功!',
                        type: 'success'
                    });
                    this.$router.push({path:'/taskmanagement'});
                  }else{
                    this.$message(res.data.message);
                  }
              });
            }
          } else {
            this.$message('信息未填写完整,不能提交!');
            return false;
          }
        });
      },
      // 重置数据
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
     // t图片上传成功之后的回调;  
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.taskImg=res.url;
      },
      //上传之前判断图片的类型;
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
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
      if(this.from=="edit"){
          let id='';
          id={
            id:this.$route.query.id
          }
          getOneTask(id).then(res=>{
              if(res.data.success==true){
                var data=res.data.data;
                this.imageUrl=data.picture;
                this.ruleForm.taskId=data.id;
                this.ruleForm.serialNumber=data.code;
                this.ruleForm.taskName=data.title;
                this.ruleForm.content=data.content;
                this.ruleForm.require=data.goal;
                this.ruleForm.sum=data.price;
                this.ruleForm.allNum=data.total;
                this.ruleForm.alreadNum=data.num;
                this.ruleForm.downloadJiuyou=data.jiuyouDownload;
                this.ruleForm.downloadDangle=data.dangleDownload;
                this.ruleForm.downloadGuopan=data.guopanDownload;
                this.ruleForm.missionTime=data.hourLength;
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
    height: 210px;
    min-height: 210px;
    resize:none;
  }
</style>
