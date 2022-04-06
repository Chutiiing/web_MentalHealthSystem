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
              <span>学生信息管理</span>
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
          <!-- 页签 -->
          <div style="margin-bottom:30px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>学生信息管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 表格搜索框 -->
          <div style="margin:10px 0; text-align:left">
            <el-input style="width:200px; margin-right:5px;" 
                      placeholder="按学号搜索"
                      prefix-icon="el-icon-star-off"
                      size="medium"
                      v-model="sno">
            </el-input>
            <el-input style="width:200px; margin-right:5px;" 
                      placeholder="按姓名搜索"
                      prefix-icon="el-icon-user"
                      size="medium"
                      v-model="name">
            </el-input>
            <el-input style="width:200px; margin-right:5px;" 
                      placeholder="按专业搜索"
                      prefix-icon="el-icon-tickets"
                      size="medium"
                      v-model="major">
            </el-input>
            <el-input style="width:200px; margin-right:5px;" 
                      placeholder="按年级搜索"
                      prefix-icon="el-icon-collection-tag"
                      size="medium"
                      v-model="grade">
            </el-input>
            <el-input style="width:200px; margin-right:5px;" 
                      placeholder="按心理状态搜索"
                      prefix-icon="el-icon-sunny"
                      size="medium"
                      v-model="state">
            </el-input>
            <el-button style="margin-left:5px;" type="primary" plain size="medium" icon="el-icon-search" @click="load()">搜索</el-button>
          </div>

          <div style="margin:20px 0;text-align:left;">
            <el-button type="primary"><i class="el-icon-circle-plus-outline" style="margin-right:5px;"></i>新增</el-button>
            <el-button type="danger"><i class="el-icon-delete" style="margin-right:5px;"></i>批量删除</el-button>
          </div>

          <el-table :data="tableData" border stripe :header-cell-style="{background:'rgb(214 216 221)'}">
            <!-- 表格内容 -->
            <el-table-column prop="sno" label="学号" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="150">
            </el-table-column>
            <el-table-column prop="academy" label="学院" width="200">
            </el-table-column>
            <el-table-column prop="major" label="专业" width="150">
            </el-table-column>
            <el-table-column prop="grade" label="年级" width="150">
            </el-table-column>
            <el-table-column prop="state" label="心理状态" width="160">
            </el-table-column>
            <el-table-column label="操作">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="warning" icon="el-icon-star-off" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button> 
            </el-table-column>
        
          </el-table>
          <!-- 分页功能 -->
          <div style="padding:10px 0; text-align:center;">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-size="2"
              layout="prev, pager, next, jumper"
              :total="total">
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

  //数据
  data() {
      return {
        tableData: [],
        total:0,          //展示的数据总书
        pageNum:1,        //默认在哪一页
        pageSize:2,       //默认的页面中项目数
        sno:"",               //搜索的学号默认是空
        name:"",               //搜索的姓名默认是空
        major:"",               //搜索的专业默认是空
        grade:"",               //搜索的年级默认是空
        state:"",               //搜索的心理状态默认是空
        collapseBtnClass:'el-icon-s-fold',    //收缩按钮
        isCollapse:false,       //默认是展开的
        sideWidth:200,
        logoTextshow:true   //名称默认是显示的
      }
  },

  //项目创建
  created() {
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
    //请求分页查询数据
    load(){
      fetch("http://localhost:9090/students/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+
      "&sno="+this.sno+"&name="+this.name+"&major="+this.major+"&grade="+this.grade+
      "&state="+this.state).then(res => res.json()).then(res =>{
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      })
    },
    //页面跳转相应（每页的总个数写定）
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    }
  }
}
</script>
