<template>
    <div>
        <el-col :span="8" style="margin-top:20px;">
            <el-row :gutter="10" style="margin-bottom:15px">
                <!-- 发布预约信息 -->
                <el-card style="width:400px;height:300px;">
                    <div style="border-style:dashed; border-color:#ccc;height:250px; text-align:center;">
                        <!-- 表格名称 -->
                        <div style="display:inline-block; margin:0,auto; border:none; font-size:20px; position:relative; top:35px;">预约信息发布</div>
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
                <el-card style="width:400px; height:400px">
                    <div id="pie" style="width: 350px;height: 420px"></div>
                </el-card>
            </el-row>
        </el-col>
        <el-col :span="16" style="margin-top:20px;">
            <el-card style="width:100%;height:715px; ">
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
                                >搜索</el-button>
                </div>
                <!-- 预约信息列表 -->
                <el-row :gutter="10">
                    <el-col :span="12" 
                            v-for="item in 4"
                            :key="item" 
                            style="margin-top:30px;">
                        <el-card style="width:100%; ">
                            <div style="margin-bottom:10px">
                                <div style="margin-bottom:10px"><i class="el-icon-s-home"/>  咨询室：咨询室1</div>
                                <div style="margin-bottom:10px"><i class="el-icon-date"/>  预约时间：2022-04-26 15:00:00</div>
                                <div style="margin-bottom:10px"><i class="el-icon-check"/>  预约情况：已预约</div>
                                <div style="margin-bottom:10px"><i class="el-icon-user-solid"/>  预约人：admin</div>
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
                        :total="4">
                    </el-pagination>
                </div>
            </el-card>
        </el-col>
    </div>  
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
                    isbooking: '1',
                    label: '已预约'
                },{
                    isbooking: '0',
                    label: '未预约'
            }],
            bookingItems:[]
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
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
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
                                    color: "#fff"
                                },
                                formatter:'{d}%'
                            }
                        },
                color: [
                            '#95a1b9',
                            '#bd867d'
                        ],
                labelLine: {
                    show: false
                },
                data: [
                    { value: 16, name: '已预约'},
                    { value: 5, name: '未预约'},
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