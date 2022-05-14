<template>
    <div class="wrapper">
        <!-- 注册框 -->
        <div style="margin: 100px auto; background-color: #fff; width: 500px; padding: 20px; border-radius: 10px; border: medium solid rgb(228,231,237)">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注 册</b></div>
            <el-form :model="user" :rules="rules" ref="userForm">
                <!-- 工号 -->
                <el-form-item prop="tno">
                    <el-input size="medium"  clearable=true style="margin: 5px 0" prefix-icon="el-icon-star-off" v-model="user.tno"></el-input>
                </el-form-item>
                <!-- 姓名 -->
                <el-form-item prop="username">
                    <el-input size="medium" clearable=true style="margin: 5px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input size="medium" clearable=true style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                </el-form-item>
                <!-- 电话 -->
                <el-form-item prop="phone">
                    <el-input size="medium" clearable=true style="margin: 5px 0" prefix-icon="el-icon-phone-outline" v-model="user.phone"></el-input>
                </el-form-item>
                <!-- 性别 -->
                <el-form-item prop="sex">
                    <el-select size="medium" v-model="user.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 咨询室 -->
                <el-form-item prop="room">
                    <el-select size="medium" v-model="user.room" placeholder="请选择所在咨询室">
                        <el-option label="咨询室1" value="咨询室1"></el-option>
                        <el-option label="咨询室2" value="咨询室2"></el-option>
                        <el-option label="咨询室3" value="咨询室3"></el-option>
                        <el-option label="咨询室4" value="咨询室4"></el-option>
                        <el-option label="咨询室5" value="咨询室5"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 个人简介 -->
                <el-form-item>
                    <el-input size="medium" type="textarea" :rows="3" placeholder="请输个人简介（建议填写）" v-model="user.introduction">
                    </el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: right">
                    <el-button type="primary" size="small"  autocomplete="off" @click="signIn">注册</el-button>
                    <el-button type="warning" size="small"  autocomplete="off" @click="back">返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
    name:"signIn",
    data(){
        return {
            user:{
                tno:"",
                username:"",
                password:"",
                sex:"",
                introduction:"",
                phone:"",
                room:""
            },
            rules: {
                tno: [
                    { required: true, message: '请输入工号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到10个字符', trigger: 'blur' }
                ],
                username: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    { min: 3, max: 10, message: '长度在 3 到10个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {min:11, max: 11, message: '请输入11位有效电话', trigger: 'blur'}
                ],
                sex: [
                    {required: true, message: '请选择性别', trigger: 'blur'}
                ],
                room: [
                    {required: true, message: '请选择咨询室', trigger: 'blur'}
                ]
            },
            userForm:{
                tno:"",
                password:"",
                sex:"",
                introduction:"",
                phone:"",
                room:""
            },
        }
    },
    methods: {
        //注册
        signIn() {
            this.$refs['userForm'].validate((valid) => {
                if(valid){
                    request.post("/teacher/insert", this.user).then(res => {
                        if(res){
                            this.$message.success("注册成功,请进行登录")
                            //跳转登陆界面
                            this.$router.push("/login")
                        }
                        else{
                            this.$message.error("注册失败")
                        }
                    })
                }
                else {
                    return false;
                }
            }); 
        },
        //返回登录
        back(){
            this.$router.push("/login")
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