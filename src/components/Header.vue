<template>
    <div style="line-height:60px; display:flex">

        <div style="flex:1;">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 20px" @click="collapse"></span>
        </div>
        <el-dropdown style="width: 100px; cursor: pointer">
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">个人中心</el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                    <router-link to="/login" style="text-decoration:none">退出</router-link>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>

export default {
    name:"Header",
    props:{
        collapseBtnClass:String,
    },
    methods: {
        collapse() {
            this.$emit("asideCollapse")
        }
    }
}
</script>

<style>

</style>