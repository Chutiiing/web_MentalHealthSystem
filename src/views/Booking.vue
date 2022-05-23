<template>
    <el-row :gutter="20">
        <el-col :span="16" style="margin-top:20px;">
            <el-card style="width:100%;height:715px; ">
                <div style="width:100%;text-align:center;">
                    <h1 style="font-size:20px;">咨询室预约信息</h1>
                </div>
                <!-- 搜索框 -->
                <div style="margin-top:30px; ">
                    <el-select v-model="isbooking" 
                        placeholder="按预约情况搜索"
                        style="width:200px; margin-right:5px;"
                        prefix-icon="el-icon-collection-tag"
                        size="medium">
                        <el-option
                            v-for="item in optionBooking"
                            :key="item.isbooking"
                            :label="item.label"
                            :value="item.isbooking">
                        </el-option>
                    </el-select>
                    <el-button style="margin-left:5px;" 
                                type="primary" 
                                plain size="medium" 
                                icon="el-icon-search"
                                @click="search">搜索</el-button>
                </div>
                <!-- 预约信息列表 -->
                <!-- 利用v-for中的key对元素进行定位 -->
                <el-row :gutter="10">
                    <el-col :span="12" 
                            v-for="item in bookingItems"
                            :key="item.id" 
                            style="margin-top:30px;">
                        <el-card style="width:100%; ">
                            <div style="margin-bottom:10px">
                                <div style="margin-bottom:10px"><i class="el-icon-s-home"/>  咨询室：{{item.room}}</div>
                                <div style="margin-bottom:10px"><i class="el-icon-date"/>  预约时间：{{item.time}}</div>
                                <div style="margin-bottom:10px"><i class="el-icon-check"/>  预约情况：{{item.isbooking}}</div>
                                <div style="margin-bottom:10px"><i class="el-icon-user-solid"/>  预约人：{{item.sno}}</div>
                                <el-button size="medium" type="primary" plain @click="check(item.sno)">查看学生信息</el-button>
                                <!-- 删除确认 -->
                                <template>
                                    <el-popconfirm
                                        title="确定删除这条预约信息吗？"
                                        @confirm = "del(item.id)"
                                        style="margin-left:10px"
                                        >
                                        <el-button slot="reference" style="margin-left:20px" size="medium" type="danger" plain>删除预约信息</el-button>
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
        <el-dialog v-model="student" title="预约学生信息" :visible.sync="dialogFormVisible" width="30%">
            <div style="margin-bottom:15px;">  学    号：{{student.sno}}</div>
            <div style="margin-bottom:15px;">  姓    名：{{student.name}}</div>
            <div style="margin-bottom:15px;">  性    别：{{student.sex}}</div>
            <div style="margin-bottom:15px;">  学    院：{{student.academy}}</div>
            <div style="margin-bottom:15px;">  专    业：{{student.major}}</div>
            <div style="margin-bottom:15px;">  年    级：{{student.grade}}</div>
            <div style="margin-bottom:15px;">  心理状态：{{student.state}}</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
            </div>
        </el-dialog>

        <el-col :span="8" style="margin-top:20px;">
            <el-row :gutter="10" style="margin-bottom:15px">
                <!-- 发布预约信息 -->
                <el-card style="width:100%;height:300px;">
                    <div style="border-style:dashed; border-color:#ccc;height:250px; text-align:center;">
                        <!-- 表格名称 -->
                        <div style="display:inline-block; margin:0,auto; border:none; font-size:20px; position:relative; top:35px;"><b>预约信息发布</b></div>
                        <!-- 表单 -->
                        <el-form ref="formPush" :model="formPush" label-width="100px" class="demo-ruleForm" style="position:relative; margin-top:75px;">
                            <el-form-item style="margin-left:-100px;">
                                <el-date-picker
                                v-model="formPush.date"
                                type="datetime"
                                placeholder="选择日期时间"
                                size="medium"
                                default-time="09:00:00"
                                :picker-options="startPickerOptions"
                                >
                                </el-date-picker> 
                            </el-form-item>
                            <el-form-item style="margin-left:-100px;margin-top:40px">
                                <el-button type="primary" @click="push">发布</el-button>
                                <el-button @click="reset">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-row>
            <!-- 饼图 -->
            <el-row :gutter="10">
                <el-card style="width:100%; height:400px;text-align:center;">
                    <div id="pie" style="width: 100%;height: 420px"></div>
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
            formPush:{
                date:''
            },
            isbooking:'',     //查询预约情况默认为空
            optionBooking: [{                
                    isbooking: '',
                    label: '全部信息'
                }, {
                    isbooking: '已预约',
                    label: '已预约'
                },{
                    isbooking: '未预约',
                    label: '未预约'
            }],
            bookingItems:[],  //预约情况列表
            student:{},      //学生信息
            user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
            total:0,          //展示的数据总数
            pageNum:1,        //默认在哪一页
            pageSize:4,       //默认的页面中项目数
            dialogFormVisible:false,   //对话框弹窗
            bookingPush:{               //预约信息
                time:"",
                tno:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
                isbooking:"未预约",
            },
            minTime:new Date(),       //当前时间
            startPickerOptions:{        //限制时间选择器范围
                disabledDate: (time) => {
                    // 最小时间减一天，防止当天日期无法选择
                    return time.getTime() < this.minTime-24*3600000
                }
            }
        }
    },
    created(){
        this.load()
    },
    mounted() {
        this.pieShow()
    },
    methods:{
        load(){
            //分页查询
            request.get("/booking/page",{
                    params:{
                        pageNum: this.pageNum,
                        pageSize: 4,
                        isbooking: this.isbooking,
                        tno: this.user 
                    }
                    }).then(res =>{
                        console.log(res);
                        this.bookingItems = JSON.parse(JSON.stringify(res.data));
                        this.total = res.total;
                    })
            
        },
        //页面跳转相应（每页的总个数写定）
        handleCurrentChange(pageNum){
            console.log(pageNum)
            this.pageNum = pageNum
            this.load()
        },
        //根据预约状态搜索
        search(){
            this.load()
        },
        //查询学生信息
        check(sno){
            if(sno != null){
                request.get("/students/search/" + sno).then(res =>{
                    console.log(res)
                    this.student = res
                })
                this.dialogFormVisible = true;
            }
            else{
                this.$message.error("无预约学生，无法查看")
            }
        },
        //预约信息删除
        del(id){
            request.delete("/booking/del/"+id).then(res =>{
                if(res){
                    this.$message.success("删除成功")
                    this.pageNum = 1;   //回到第一页
                    this.load();     //刷新页面
                }
                else{
                this.$message.error("删除失败")
                }
            })
        },
        //发布信息框重置按钮
        reset(){
            this.formPush.date = ''
        },
        //发布信息
        push(){
            if(this.formPush.date != null){
                //确定发布时间
                this.bookingPush.time = this.formDate(this.formPush.date, "yyyy-MM-DD HH:mm:ss")
                console.log(JSON.stringify(this.bookingPush))
                request.post("/booking/insert",JSON.parse(JSON.stringify(this.bookingPush))).then(res =>{
                    if(res){
                        this.$message.success("新增成功")
                        this.load();     //刷新页面
                        this.pieShow();
                    }
                    else{
                    this.$message.error("新增失败")
                    }
                })
            }
        },
        //时间戳转换为标准格式
        formDate(data, format) {
            let time = {
                "M+": data.getMonth() + 1,
                "D+": data.getDate(),
                "H+": data.getHours(),
                "m+": data.getMinutes(),
                "s+": data.getSeconds(),
            };

            if (/(y+)/i.test(format)) {
                format = format.replace(
                    RegExp.$1,
                    (data.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            }

            for (let k in time) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1
                        ? time[k]
                        : ("00" + time[k]).substr(("" + time[k]).length)
                    );
                }
            }
            return format;
        },
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
                    text: '预约情况',
                },
                legend: {
                    top: '8%',
                    left: 'center'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
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
                                fontSize : 11,    //文字的字体大小
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

            //返回预约人数和未预约人数
            request.get("/booking/count/"+this.user).then(res =>{
                console.log(res.already)
                console.log(res.no)
                option.series[0].data = [
                    { value: res.already, name: '已预约'},
                    { value: res.no, name: '未预约'},
                ]
                option && myChart.setOption(option);
            })
        }
    }
}
</script>

<style>

</style>