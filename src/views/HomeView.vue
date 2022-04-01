<template>
  <div style="height:100%">
  <el-container style="height: 100%">

  <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246); height:100%;overflow-x:hidden;">
    <el-menu :default-openeds="['1', '3']" 
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
        <el-menu-item-group>
          <template slot="title" style="text-color:#f7e8d2">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组二">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-data" style="color:#fff"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting" style="color:#fff"></i>
        <span>设置</span>
      </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="font-size: 12px; border-bottom:1px solid #ccc; line-height:60px; display:flex">
      <div style="flex:1;font-size:18px">
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
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
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
