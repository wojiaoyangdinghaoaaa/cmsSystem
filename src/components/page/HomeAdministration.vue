<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户提现</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <span class="demonstration">上传轮播图片</span>
            <div class="picture">
            <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            </div> 



        <div class="demo-input-size">
        <el-form label-width="60px" class="demo-ruleForm">
        <el-form-item label="总人气:" prop="pass">
            <el-input type="text" class="input-field" ></el-input>
        </el-form-item>
        <el-form-item label="已发布:" prop="checkPass">
            <el-input type="text" class="input-field"></el-input>
        </el-form-item>
        <el-form-item label="已完成:" prop="age">
            <el-input class="input-field"></el-input>
        </el-form-item>
       
        </el-form>
      
        </div>
           <div class="pagination">
                 <el-button type="primary">发布</el-button>
            </div>



        </div>
        

        
    </div>

</template>
<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
         input6: '',
        input7: '',
        input8: '',
        
      };
    },


    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        
      },
      
    }
    
  }
  
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .picture{
         margin-bottom: 20px;
    }
    .input-field{width: 300px}
    .pagination{
            text-align: left;
    }
</style>
