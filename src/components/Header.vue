<template>
    <div style="line-height:60px; display:flex">

        <div style="flex:1;">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 20px" @click="collapse"></span>
        </div>
        <el-dropdown style="width: 100px; cursor: pointer">
            <span>{{username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <span style="text-decoration:none" @click="person">个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <span style="text-decoration:none" @click="loginOut">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>

import request from '@/utils/request'

export default {
    name:"Header",
    props:{
        collapseBtnClass:String,
    },
    data() {
        return {
            user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
            username:"?"
        }
    },
    created(){
        request.get("/teacher/search/"+this.user).then(res =>{
            this.username = res.username
        })
    },
    methods: {
        collapse() {
            this.$emit("asideCollapse")
        },
        
        //退出登录
        loginOut() {
            this.$router.push("/login")
            localStorage.removeItem("user")
            this.$message.success("退出成功")
        },

        //到个人中心
        person() {
            this.$router.push("/person")
        }
    }
}
</script>

<style>

</style>