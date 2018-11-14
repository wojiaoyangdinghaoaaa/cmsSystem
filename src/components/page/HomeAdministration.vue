<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-sort"></i> 首页管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <!-- <span class="demonstration">上传轮播图片</span>
            <div class="picture">
            <el-upload
            action="https://kingsilk.net/yun/rs/api/app/5988791a6b869f4e18d5c8d5/org/598878fc6b869f4e0f19fb47/yunFile"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            </div>  -->

            <div class="demo-input-size">
                <el-form label-width="60px" class="demo-ruleForm">
                    <el-form-item label="总人气:">
                        <el-input type="text" class="input-field" v-model="allMoods"></el-input>
                    </el-form-item>
                    <el-form-item label="已发布:" prop="checkPass">
                        <el-input type="text" class="input-field" v-model="issue"></el-input>
                    </el-form-item>
                    <el-form-item label="已完成:">
                        <el-input class="input-field" v-model="finish"></el-input>
                    </el-form-item>
                </el-form>
            </div>
           <div class="pagination">
                 <el-button type="primary"  class="btn" @click="saveInfo">发布</el-button>
            </div>



        </div>
        

        
    </div>

</template>
<script>
import {getIndexNum,editIndexNum,getUserLoginState} from '../../api/getData';
  export default {
    data() {
      return {
        allMoods: '',
        issue: '',
        finish: '',
        limit:'',
        
      };
    },
    methods: {
      saveInfo(){
          if(this.allMoods!='' && this.issue!='' && this.finish!=''){
            this.limit={
              userCount:this.allMoods,
              taskCount:this.issue,
              finishCount:this.finish
            }
            editIndexNum(this.limit).then(res=>{
                if(res.data.success==true){
                    this.$message({
                        message: '提交成功!',
                        type: 'success'
                    });
                }else{
                    this.$message(res.data.message);
                }
            })
          }else{
              this.$message('数据不能为空!');
          }
      }
    },
    mounted () {
        getIndexNum().then(res=>{
            if(res.data.success==true){
                this.allMoods=res.data.data.userCount;
                this.issue=res.data.data.taskCount;
                this.finish=res.data.data.finishCount;
            }else{
                this.$message(res.data.message);
            }
        })
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
    
  }
  
</script>

<style scoped>
    .table{
        width: 100%;
        font-size: 14px;
    }
    .input-field{
        width: 300px
    }
    .pagination{
        text-align: left;
    }
    .btn{
        width: 90px;
        margin-left: 136px;
    }
</style>
