<template>
    <el-row :gutter="20">
        
        <el-col :span="16" style="margin-top:10px;">
            <el-card style="width:100%;height:730px; ">
                <!-- 搜索框 -->
                <div style="margin-top:25px; ">
                    <el-input style="width:200px; margin-right:5px;" 
                        placeholder="按量表名称搜索"
                        prefix-icon="el-icon-star-off"
                        size="medium"
                        v-model="title"
                        clearable>
                    </el-input>
                    <el-button style="margin-left:5px;" 
                                type="primary" 
                                plain size="medium" 
                                icon="el-icon-search"
                                @click="search">搜索</el-button>
                </div>
                <!-- 量表信息列表 -->
                <el-row :gutter="10">
                    <el-col :span="12" 
                            v-for="item in Tables"
                            :key="item.tableid" 
                            style="margin-top:30px;">
                        <el-card style="width:100%; ">
                            <div style="margin-bottom:10px">
                                <div style="margin-bottom:15px"><b>{{item.title}}</b></div>
                                <div style="margin-bottom:15px;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp:2;
                                            overflow: hidden;
                                            white-space:pre-wrap;
                                            height:42px;">简介：{{item.introduction}}</div>
                                <div style="margin-bottom:15px; font-size:13px; color:#938a8a"><i class="el-icon-user-solid"/>  发布人：{{item.admin}}</div>
                                <div style="margin-bottom:15px; font-size:13px; color:#938a8a" ><i class="el-icon-date"/>  发布时间：{{item.time}}</div>
                                <el-button size="medium" type="primary" plain @click="detail(item)">查看量表详情</el-button>
                                <!-- 删除确认 -->
                                <template>
                                    <el-popconfirm
                                        title="确定删除这张量表吗？"
                                        @confirm = "del(item.tableid,item.admin)"
                                        style="margin-left:10px"
                                        >
                                        <el-button slot="reference" style="margin-left:20px" size="medium" type="danger" plain>删除量表</el-button>
                                    </el-popconfirm>
                                </template>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 分页 -->
                <div style="padding:10px 0; text-align:center; margin-top:20px">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-size="4"
                        layout="prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </el-col>

        <!-- 弹窗 -->
        <el-dialog v-model="tableItem" title="量表详情" :visible.sync="dialogFormVisible" width="30%">
            <div style="margin-bottom:15px"><b>{{tableItem.title}}</b></div>
            <div style="margin-bottom:15px;">简介：{{tableItem.introduction}}</div>
            <div style="margin-bottom:15px; font-size:13px; color:#938a8a"><i class="el-icon-user-solid"/>  发布人：{{tableItem.admin}}</div>
            <div style="margin-bottom:15px; font-size:13px; color:#938a8a" ><i class="el-icon-date"/>  发布时间：{{tableItem.time}}</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
            </div>
        </el-dialog>

        <el-col :span="8" style="margin-top:10px;">
             <!-- 导入文件 -->
            <el-row :gutter="10" style="margin-bottom:15px">
                <el-card style="width:100%;">
                    <div style="width:100%;text-align:center;">
                        <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="2"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div slot="tip" class="el-upload__tip" style="text-align:left !important;">只能上传xlsx类型的文件，进行心理量表的导入</div>
                        </el-upload>
                    </div>
                </el-card>
             </el-row>
             <!-- 饼图 -->
            <el-row :gutter="15">
                <el-card style="width:100%; height:400px;text-align:center;">
                    <div id="pie" style="width: 100%;height: 300px"></div>
                    <!-- 搜索框 -->
                    <div style="margin-top:5px; ">
                        <el-select v-model="titleOption" 
                            placeholder="选择量表"
                            style="width:200px; margin-right:5px;"
                            prefix-icon="el-icon-collection-tag"
                            size="small">
                            <el-option
                                v-for="item in optionTable"
                                :key="item.titleOption"
                                :label="item.label"
                                :value="item.titleOption">
                            </el-option>
                        </el-select>
                        <el-button style="margin-left:5px;" 
                                    type="primary" 
                                    plain size="small" 
                                    icon="el-icon-search" @click="pieSearch">搜索</el-button>
                    </div>
                </el-card>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>

import * as echarts from 'echarts';
import request from '@/utils/request'

export default {
    data() {
      return {
        title:'',    //搜索框数据
        Tables:[],     //所有的表
        tableItem:{},  //某一个表
        total:0,          //展示的数据总数
        pageNum:1,        //默认在哪一页
        pageSize:4,       //默认的页面中项目数
        dialogFormVisible:false,   //对话框弹窗
        user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",

        titleOption:'心理压力测评表',     //图表显示的量表搜索框默认为空
        optionTable:[{
            titleOption:'心理压力测评表',
            label:'心理压力测评表'
        },{
            titleOption:'Sarason考试焦虑量表(TAS)',
            label:'Sarason考试焦虑量表(TAS)'
        },{
            titleOption:'焦虑自评量表 (SAS)',
            label:'焦虑自评量表 (SAS)'
        },{
            titleOption:'人际信任量表',
            label:'人际信任量表'
        }],

        fileList: [
            {name: '焦虑自评量表 (SAS).xlsx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
            {name: '人际信任量表.xlsx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ]
      };
    },
    created(){
        this.load()
    },
    mounted() {
        this.pieShow()
    },
    methods: {
        //加载
        load(){
            request.get("/test/page",{
                params:{
                    pageNum: this.pageNum,
                    pageSize: 4,
                    title:this.title
                }
                }).then(res =>{
                    console.log(res);
                    this.Tables = res.data;
                    this.total = res.total;
                })
        },
        //页面跳转相应（每页的总个数写定）
        handleCurrentChange(pageNum){
            console.log(pageNum)
            this.pageNum = pageNum
            this.load()
        },
        //量表搜索
        search() {
            this.load();
        },
        //查看量表详情
        detail(item) {
            this.tableItem = item
            this.dialogFormVisible = true;
        },
        //量表删除
        del(id,admin){
            request.get("/teacher/search/"+this.user).then(res =>{
                if(res.username == admin){
                    request.delete("/test/del/"+id).then(res =>{
                        if(res){
                            this.$message.success("删除成功")
                            this.pageNum = 1;   //回到第一页
                            this.load();     //刷新页面
                        }
                        else{
                        this.$message.error("删除失败")
                        }
                    })
                }
                else{
                    this.$message.error("不可删除他人创建的量表")
                }
            })
            
        },
        //饼图搜索
        pieSearch(){
            this.pieShow()
        },
        //渲染
        pieShow(){
            //显示
            var chartDom = document.getElementById('pie');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                tooltip: {
                    trigger: 'item'
                },
                title: {
                    text: '量表填写情况',
                },
                legend: {
                    top: '15%',
                    left: 'center'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['50%','60%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 10,    //文字的字体大小
                                    color: "#000"
                                },
                                formatter:'{d}%'
                            }
                        },
                        color: [
                                    '#8caae7',
                                    '#bdd7f4'
                                ],
                        labelLine: {
                            show: false
                        },
                        data: []
                    }
                ]
            };

            //返回填写人数和未填写人数
            request.get("/testHistory/count/"+this.titleOption).then(res =>{
                console.log(res.total)
                console.log(res.finish)
                option.series[0].data = [
                    { value: res.finish, name: '已填写'},
                    { value: res.total-res.finish, name: '未填写'},
                ]
                option && myChart.setOption(option);
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>

<style>
a.el-upload-list__item-name{
    text-align:left !important;
}
</style>