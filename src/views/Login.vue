<template>
  <div class="wrapper">
    <!-- 欢迎文字 -->
    <div style="margin-left:200px; margin-top:100px;">
        <h1>欢迎来到心理健康管理系统</h1>
    </div>
    <!-- 登录框 -->
    <div style="margin: 100px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px; border: medium solid rgb(228,231,237)">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="tno">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.tno"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small"  autocomplete="off" @click="login">登录</el-button>
          <el-button type="warning" size="small"  autocomplete="off" @click="signIn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
    name:"login",
    data(){
        return {
            user:{
                tno:"",
                password:""
            },
            rules: {
                tno: [
                    { required: true, message: '请输入工号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
            },
            userForm:{
                tno:"",
                password:""
            },
        }
    },
    methods:{
        //登录
        login(){
            this.$refs['userForm'].validate((valid) => {
                if (valid) {  // 表单校验合法则跳转
                    request.post("/teacher/login", this.user).then(res => {
                        if(!res) {
                            this.$message.error("账号或密码错误")
                        } else {
                            //存储用户信息到浏览器
                            localStorage.setItem("user",JSON.stringify(this.user.tno))   
                            this.$router.push("/")
                        }
                    })
                }
                else {
                    return false;
                }
            });
        },
        //跳转到注册界面
        signIn() {
            this.$router.push("/signIn")
        }
    }
}
</script>

<style>
.wrapper {
    height: 100vh;
    overflow: hidden;
    background-image: url('~@/assets/login1.png');
    background-size: cover;
}
</style>