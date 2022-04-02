<template>
  <div style="height:100%">
    <el-container style="height: 100%">
      <!-- 侧边栏 -->
      <el-aside :width="sideWidth + 'px'" 
                style="background-color: rgb(238, 241, 246); height:100%;overflow-x:hidden;box-shadow:2px 0 6px rgb(0 21 41/35%);">
        <el-menu  :default-openeds="['1','2', '3']" 
                  style="height:100%; overflow-x:hidden" 
                  background-color="#8797A6" 
                  text-color="#fff"
                  :collapse-transition="false"     
                  :collapse="isCollapse">
          <div style="height:60px; line-height:60px; text-align:center">
            <img src="../assets/sign.png" alt="" style="width:50px; position:relative; top:15px;"/>
            <b style="color:#fff" v-show="logoTextshow">后台管理系统</b>
          </div>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom" style="color:#fff"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data" style="color:#fff"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting" style="color:#fff"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 中间主体 -->
      <el-container>
        
        <!-- 中间头部 -->
        <el-header style="font-size: 12px; border-bottom:1px solid #ccc; line-height:60px; display:flex">
          <div style="flex:1;font-size:22px">
            <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
          </div>
          <el-dropdown style="width:100px">
            <i class="el-icon-user-solid" style="color:#303133; margin-right:10px; cursor:pointer;"></i>
            <span style="cursor:pointer;">王小虎</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        
        <!-- 表格主体部分 -->
        <el-main>
          <!-- 表格搜索框 -->
          <div style="padding:10px 0">
            <el-input style="width:300px;" 
                      placeholder="请输入内容"
                      prefix-icon="el-icon-search">
            </el-input>
            <el-button style="margin-left:5px;" type="primary">搜索</el-button>
          </div>
          <el-table :data="tableData" border stripe :header-cell-style="{background:'rgb(214 216 221)'}">
            <!-- 表格内容 -->
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
          <!-- 分页功能 -->
          <div style="padding:10px 0; text-align:center;">
            <el-pagination
              
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="100">
            </el-pagination>
          </div>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(10).fill(item),
        collapseBtnClass:'el-icon-s-fold',    //收缩按钮
        isCollapse:false,       //默认是展开的
        sideWidth:200,
        logoTextshow:true   //名称默认是显示的
      }
  },
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
    }
  }
}
</script>
