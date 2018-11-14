<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  v-if="from!='edit'"><i class="el-icon-lx-roundadd"></i>轮播图</el-breadcrumb-item>
                <el-breadcrumb-item    v-else-if="from=='edit'"><i class="el-icon-lx-roundadd"></i>编辑轮播图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="container_cen">
                <el-form ref="ruleForm" label-width="140px" class="demo-ruleForm">
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
                    <el-form-item label="图片排名">
                            <el-input v-model="imgRank"></el-input>
                        </el-form-item>
                        <el-form-item label="图片跳转地址">
                            <el-input v-model="imgToUrl"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"  size="large" @click="submitForm()">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>
        </div>
    </div>
</template>


<script>
import {addIndexImg,editIndexImg,getUserLoginState} from '../../api/getData';
import { baseUrl} from '../../api/env';
  export default {
    data() {
      return {
        gameImg:'',
        imageUrl: '',
        imgUrl:baseUrl+'/common/qiniuUpload',
        id:'',
        indexImg:'',
        imgRank:'',
        imgToUrl:'',
        limit:{},
        from:'',
      };
    },
   
    methods: {
      // 发布
      submitForm(formName) {
          if ((this.indexImg!='' || this.imageUrl!='') && this.imgRank!='' && this.imgToUrl!='') {
            // 新增
            if(this.from!="edit"){
                this.limit={
                    imgAddress:this.indexImg,
                    url:this.imgToUrl,
                    rate:this.imgRank
                }
                addIndexImg(this.limit).then(res=>{
                  if (res.data.success==true) {
                    this.$message({
                        message: '添加成功!',
                        type: 'success'
                    });
                    this.$router.push({ path: '/images'});
                  }else{
                    this.$message.error(res.data.message);
                  }
                })
            }else{
              // 编辑
              this.limit={
                    id:this.id,
                    imgAddress:this.indexImg ? this.indexImg : this.imageUrl,
                    url:this.imgToUrl,
                    rate:this.imgRank
                }
                editIndexImg(this.limit).then(res=>{
                  if (res.data.success==true) {
                    this.$message({
                        message: '添加成功!',
                        type: 'success'
                    });
                    this.$router.push({ path: '/images'});
                  }else{
                    this.$message.error(res.data.message);
                  }
                })

            }
              
          }else{
              this.$message.error('数据不能为空!');
          }
      },
     // t图片上传成功之后的回调;  
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.indexImg=res.url;
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
            this.id=this.$route.query.data.id;
            this.imageUrl=this.$route.query.data.imgAddress;
            this.imgRank=this.$route.query.data.rate;
            this.imgToUrl=this.$route.query.data.url;
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
