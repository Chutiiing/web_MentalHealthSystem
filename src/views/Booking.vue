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
                                icon="el-icon-search">搜索</el-button>
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
                                <div style="margin-bottom:10px"><i class="el-icon-date"/>  预约时间：{{item.date}}</div>
                                <div style="margin-bottom:10px"><i class="el-icon-check"/>  预约情况：{{item.isbooking}}</div>
                                <div style="margin-bottom:10px"><i class="el-icon-user-solid"/>  预约人：{{item.name}}</div>
                                <el-button size="medium" type="primary" plain>查看学生信息</el-button>
                                <el-button style="margin-left:20px" size="medium" type="danger" plain>删除预约信息</el-button>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 分页 -->
                <div style="padding:10px 0; text-align:center; margin-top:20px">
                    <el-pagination
                        
                        :current-page="1"
                        :page-size="4"
                        layout="prev, pager, next, jumper"
                        :total="16">
                    </el-pagination>
                </div>
            </el-card>
        </el-col>
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
                                size="medium">
                                </el-date-picker> 
                            </el-form-item>
                            <el-form-item style="margin-left:-100px;margin-top:40px">
                                <el-button type="primary">发布</el-button>
                                <el-button>重置</el-button>
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
            bookingItems:[{                         //预约情况列表
                    id:'1',
                    room:'咨询室1',
                    date:'2022-04-26 15:00:00',
                    isbooking:'已预约',
                    name:'小小'
                },{
                    id:'2',
                    room:'咨询室1',
                    date:'2022-04-26 17:00:00',
                    isbooking:'已预约',
                    name:'小林'
                },{
                    id:'3',
                    room:'咨询室1',
                    date:'2022-04-27 9:00:00',
                    isbooking:'未预约',
                    name:''
                },{
                    id:'4',
                    room:'咨询室1',
                    date:'2022-04-27 15:00:00',
                    isbooking:'已预约',
                    name:'小B'
                }
            
                
            ]
        }
    },
    mounted() {
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
                data: [
                    { value: 4, name: '已预约'},
                    { value: 12, name: '未预约'},
                ]
                }
            ]
        };

        option && myChart.setOption(option);
    }

}
</script>

<style>

</style>