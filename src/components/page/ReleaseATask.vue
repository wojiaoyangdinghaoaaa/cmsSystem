<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i>发布任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="container_cen">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
             <el-form-item label="任务图" prop="gameImg">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

           </el-form-item>
            <el-form-item label="任务名称" prop="taskName">
                <el-input v-model="ruleForm.taskName"></el-input>
            </el-form-item>
            <el-form-item label="任务编号" prop="serialNumber">
                <el-input v-model="ruleForm.serialNumber"  ></el-input>
            </el-form-item>
                <el-form-item label="任务金额" prop="sum">
                <el-input v-model="ruleForm.sum"  ></el-input>
            </el-form-item>
            <el-form-item label="任务时间（小时）"  prop='missionTime'>
                <el-input v-model="ruleForm.missionTime"  ></el-input>
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
               <el-form-item label="是否关闭任务 ">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
               <el-form-item label="任务状态">
            <el-radio-group v-model="ruleForm.resource" size="medium">
              <el-radio border label="任务进行中"></el-radio>
              <el-radio border label="任务已结束"></el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="任务详情" prop="taskdetail">
                <el-input type="textarea" v-model="ruleForm.taskdetail"></el-input>
            </el-form-item>
            

            <el-form-item>
                 <router-link to="" >
                <el-button type="primary"  size="large" @click="submitForm('ruleForm')">立即创建</el-button>
              </router-link>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                 
            </el-form-item>
            </el-form>
        </div>
        </div>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        editorOption: {},
        gameImg:'',
        imageUrl: '',
        ruleForm: {
          taskName: '',
          serialNumber: '',
          sum: '',
          missionTime: '',
          delivery:false,
          downloadJiuyou: '',
          taskdetail: '',
          downloadDangle:'',
           resource: '',
          downloadGuopan:''
        },
        rules: {
          taskName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          serialNumber: [
            { required: true, message: '请输入编号', trigger: 'blur' },
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          sum: [
              { required: true, message: '请输入金额', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          missionTime: [
           { required: true, message: '请输入时间', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
          ],
          downloadJiuyou: [
             { required: true, message: '请输入时间', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
             downloadDangle: [
             { required: true, message: '请输入时间', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
           downloadGuopan: [
             { required: true, message: '请输入时间', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          taskdetail: [
            { required: true, message: '请填写任务详情', trigger: 'blur' }
          ]
        }
      };
    },
   
    methods: {
      
      // 发布
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('发布成功!');
            console.log(this.ruleForm)
      
          //  this.$router.push({ path: '/taskmanagement' })
          this.$router.push('/taskmanagement')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    
     
     // 图片   
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
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
</style>
