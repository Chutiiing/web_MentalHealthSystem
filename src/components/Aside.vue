<template>
  <div style="height:100%;">
      <el-menu  :default-openeds="['1','2', '3']" 
                  style="height:100%; overflow-x:hidden" 
                  background-color="#f4f4f5" 
                  text-color="#000"
                  :collapse-transition="false"     
                  :collapse="isCollapse"
                  active-text-color="#005bbb"
                  router>
        <div style="height:60px; line-height:60px; text-align:center">
            <img src="../assets/sign.png" alt="" style="width:50px; position:relative; top:15px;"/>
            <b style="color:#000" v-show="logoTextshow">后台管理系统</b>
        </div>

        <el-menu-item index="/">
            <i class="el-icon-user" style="color:#000"></i>
            <span>学生信息管理</span>
        </el-menu-item>

        <el-menu-item index="/analysis">
            <i class="el-icon-pie-chart" style="color:#000"></i>
            <span>数据统计</span>
        </el-menu-item>

        <el-menu-item index="/TestTable">
            <i class="el-icon-document" style="color:#000"></i>
            <span>测评量表管理</span>
        </el-menu-item>

        <el-menu-item index="/booking">
            <i class="el-icon-chat-dot-square" style="color:#000"></i>
            <span>咨询室预约管理</span>
        </el-menu-item>
        
    </el-menu>
  </div>
</template>

<script>
export default {
    name:"Aside",
    props: {
    logoTextshow:Boolean,
    isCollapse:Boolean
  }
}
</script>

<style>

</style>