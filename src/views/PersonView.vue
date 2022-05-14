<template>
    <div style="height:100%">
    <el-container style="height: 100%">
      <!-- 侧边栏 -->
      <el-aside :width="sideWidth + 'px'" 
                style="background-color: #f4f4f5; height:100%; overflow-x:hidden; box-shadow:2px 0 6px rgb(0 21 41/35%);">
        <Aside :isCollapse="isCollapse" :logoTextshow="logoTextshow"/>
      </el-aside>

      <!-- 中间主体 -->
      <el-container>
        
        <!-- 中间头部 -->
        <el-header style="border-bottom:1px solid #ccc;">
          <Header @asideCollapse="collapse" :collapseBtnClass="collapseBtnClass"/>
        </el-header>

        <!-- 主体部分 -->
        <el-main>
          <div style="width: 500px; padding: 20px;">
                <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>个人信息</b></div>
                <el-form :model="user" :rules="rules" ref="userForm">
                    <!-- 工号 -->
                    <el-form-item prop="tno">
                        <el-input size="medium" :disabled=true clearable=true style="margin: 5px 0" prefix-icon="el-icon-star-off" v-model="user.tno"></el-input>
                    </el-form-item>
                    <!-- 姓名 -->
                    <el-form-item prop="username">
                        <el-input size="medium" :disabled="disabledItem" clearable=true style="margin: 5px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input size="medium" :disabled="disabledItem" clearable=true style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                    </el-form-item>
                    <!-- 电话 -->
                    <el-form-item prop="phone">
                        <el-input size="medium" :disabled="disabledItem" clearable=true style="margin: 5px 0" prefix-icon="el-icon-phone-outline" v-model="user.phone"></el-input>
                    </el-form-item>
                    <!-- 性别 -->
                    <el-form-item prop="sex">
                        <el-select :disabled="disabledItem" size="medium" v-model="user.sex" placeholder="请选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 咨询室 -->
                    <el-form-item prop="room">
                        <el-select :disabled="disabledItem" size="medium" v-model="user.room" placeholder="请选择所在咨询室">
                            <el-option label="咨询室1" value="咨询室1"></el-option>
                            <el-option label="咨询室2" value="咨询室2"></el-option>
                            <el-option label="咨询室3" value="咨询室3"></el-option>
                            <el-option label="咨询室4" value="咨询室4"></el-option>
                            <el-option label="咨询室5" value="咨询室5"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 个人简介 -->
                    <el-form-item>
                        <el-input :disabled="disabledItem" size="medium" type="textarea" :rows="3" placeholder="请输个人简介（建议填写）" v-model="user.introduction">
                        </el-input>
                    </el-form-item>
                    <el-form-item style="margin: 10px 0; text-align: right">
                        <el-button type="primary" size="medium"  autocomplete="off" @click="edit">{{this.str}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
    
</template>

<script>

import request from '@/utils/request'
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'

export default {
    components: {
        Aside,
        Header
    },
    data(){
        return{
            user:{
                tno:"",
                username:"",
                password:"",
                sex:"",
                introduction:"",
                phone:"",
                room:""
            },
            userForm:{
                tno:"",
                password:"",
                sex:"",
                introduction:"",
                phone:"",
                room:""
            },
            collapseBtnClass:'el-icon-s-fold',    //收缩按钮
            isCollapse:false,       //默认是展开的
            sideWidth:200,
            logoTextshow:true,   //名称默认是显示的 
            tno:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",   //教师工号
            disabledItem:true,   //默认是不可编辑的
            str:"编辑",
            flag:false           //标记按钮,false显示编辑
        }
    },
    created(){
        this.load()
    },
    //各种方法
    methods:{
        collapse(){  //点击展开收缩按钮触发
            this.isCollapse = !this.isCollapse
            this.logoTextshow = !this.logoTextshow
            if(this.isCollapse){    //收缩
                this.sideWidth = 64
                this.collapseBtnClass = 'el-icon-s-unfold'
            }
            else{      //展开
                this.sideWidth = 200
                this.collapseBtnClass = 'el-icon-s-fold'
            }
        },
        edit(){
            this.flag = !this.flag
            this.disabledItem = !this.disabledItem
            if(this.flag){   //进入编辑状态
                this.str = "保存"
            }
            else{
                this.str = "编辑"
                request.post("/teacher/update",this.user).then(res =>{
                    if(res){
                        this.$message.success("修改成功")
                        this.load();     //刷新页面
                    }
                    else{
                        this.$message.error("修改失败")
                    }
                })
            }

        },
        //载入页面
        load(){
            request.get("teacher/search/"+this.tno).then(res =>{
                this.user = res
            })
        }
    }
}
</script>

<style>

</style>