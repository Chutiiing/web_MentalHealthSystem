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

        <!-- 表格主体部分 -->
        <el-main>
          <!-- 当前页面的子路由在其中展示 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  components: {
    Aside,
    Header
  },

  //数据
  data() {
      return {
        collapseBtnClass:'el-icon-s-fold',    //收缩按钮
        isCollapse:false,       //默认是展开的
        sideWidth:200,
        logoTextshow:true,   //名称默认是显示的     
      }
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
  }
}
</script>
