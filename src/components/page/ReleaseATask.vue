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
                <template slot="prepend">Http://</template>
            </el-input>
              </el-form-item>
             <el-form-item label="当乐下载"  prop='downloadDangle'>
            <el-input placeholder="请输入内容" v-model="ruleForm.downloadDangle">
                <template slot="prepend">Http://</template>
            </el-input>
              </el-form-item>
             <el-form-item label="果盘下载"  prop='downloadGuopan'>
            <el-input placeholder="请输入内容" v-model="ruleForm.downloadGuopan">
                <template slot="prepend">Http://</template>
            </el-input>
              </el-form-item>
            <el-form-item label="任务详情" prop="taskdetail">
                <el-input type="textarea" v-model="ruleForm.taskdetail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
        ruleForm: {
          taskName: '',
          serialNumber: '',
          sum: '',
          missionTime: '',
          downloadJiuyou: '',
          taskdetail: '',
          downloadDangle:'',
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('发布成功!');
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style>
.container_cen{width: 800px}
</style>
