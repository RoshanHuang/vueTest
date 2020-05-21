<template>
<div class="main">
  <div>
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="width-90-percent">
      <el-form-item label="姓名" class="margin-bottom-30" prop="username">
        <el-input  v-model="ruleForm.username" maxlength="20" minlength="3" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" class="margin-bottom-30" prop="password">
        <el-input  v-model="ruleForm.password" maxlength="30" minlength="7" clearable type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <el-button type="primary" @click="submit">提交</el-button>
</div>
</template>
<style>
 #form{
   position:absolute;
   top:60%;
   left:50%;
   width:300px;
   transform:translate(-50%,-55%);
 }
</style>
<script>
  import { mapMutations } from 'vuex';
  export default {
    data(){
      return{
        ruleForm:{
          username:"",
          password:""
        },rules:{
          username:[{
            required:true,message:"请输入您的姓名",trigger:"blur"
          },{min:3,max:20,message:"长度在3到20个字符",trigger:"blur"}],
          password:[{required:true,message:"请输入你的密码",trigger:"blur"}]
        }
      }
    },
    methods:{
      ...mapMutations(['changeLogin']),
      submit(){
        this.$refs.form.validate(valid=>{
          if(valid){
            console.log("验证通过");
            var form=this.ruleForm;
            var data="username="+form.username+"&password="+form.password;
            const url = 'http://192.168.10.191:20400/authentication/login?'+data;
          this.$axios({
              method:'post',
              url:url
            }).then(response=>{
              console.log(response.data)
               this.userToken='Bearer'+response.data;
              this.changeLogin({Authorization:this.userToken});
              this.$router.push('/manage');
            })
          }else {
            console.log("验证失败")
          }
        })
      }
    }

  }
</script>
