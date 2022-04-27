<template>
  <div>
      <!-- 概览 -->
      <el-row :gutter="15" style="margin-top:15px">
          <el-col :span="6">
            <el-card>
                <div><i class="el-icon-user" style="margin-right:5px" />全校学生总人数</div>
                <div style="padding:10px 0; text-align:center; font-size:20px; font-weight:bold;">{{this.total}}</div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <div><i class="el-icon-check" style="margin-right:5px" />良好人数</div>
                <div style="padding:10px 0; text-align:center; font-size:20px; font-weight:bold;">{{this.total-this.danger}}</div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <div><i class="el-icon-warning-outline" style="margin-right:5px" />潜在风险人数</div>
                <div style="padding:10px 0; text-align:center; font-size:20px; font-weight:bold;">{{this.danger}}</div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <div><i class="el-icon-bell" style="margin-right:5px" />高风险学院</div>
                <div style="padding:10px 0; text-align:center;  font-size:20px;font-weight:bold;">{{this.academyTop}}</div>
            </el-card>
        </el-col>
      </el-row>

      <!-- 图表 -->
      <el-row :gutter="15" style="margin-top:30px">
        <el-col :span="12">
            <el-card>
                <div id="bar" style="width: 600px; height: 500px;"></div>
            </el-card>
        </el-col>

        <el-col :span="12">
            <el-card>
                <div id="pie" style="width: 600px; height: 500px;"></div>
            </el-card>
        </el-col>        
      </el-row>
  </div>
</template>

<script>

import * as echarts from 'echarts';
import request from '@/utils/request'

export default {
    name:"Analysis",
    data() {
        return {
            total:"1",
            danger:"1",
            academyTop:"",
        }
    },
    created(){
        //返回学校总人数和危险人数
        request.get("/students/stuCount").then(res =>{
            this.total = res.total;     //总人数
            this.danger = res.danger;   //危险人数
        })
    },
    mounted() {    //页面渲染之后再触发
        //柱状图
        var chartDomBar = document.getElementById('bar');
        var myChartBar = echarts.init(chartDomBar);
        var optionBar;

        optionBar = {
            title: {
                text: '各个学院心理健康情况'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: []    //纵坐标为是什么学院
            },
            series: [
                {
                    name: "总人数",
                    data: [],        //总人数
                    type: 'bar',
                    color: '#95a1b9'
                    
                },
                {
                    name: "存在风险人数",
                    data: [],           //潜在风险的人数
                    type: 'bar',
                    color :'#bd867d'
                }
            ]
            };
            //请求查询各个学院的人数
            request.get("/students/academy").then(res =>{
                this.academyTop = res.y[0];      //取出最危险学院赋值
                optionBar.yAxis.data = res.y;
                optionBar.series[0].data = res.total;
                optionBar.series[1].data = res.danger;
                optionBar && myChartBar.setOption(optionBar);
            })

            //饼图
            var chartDomPie = document.getElementById('pie');
            var myChartPie = echarts.init(chartDomPie);
            var optionPie;

            optionPie = {
                title: {
                    text: '全校心理健康比例概况',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        type: 'pie',
                        radius:  ['40%', '70%'],
                        color: [
                            '#95a1b9',
                            '#bd867d'
                        ],
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 14,    //文字的字体大小
                                    color: "#fff"
                                },
                                formatter:'{d}%'
                            }
                        },
                        data: [],     //动态绑定数据
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            //返回学校总人数和危险人数
            request.get("/students/stuCount").then(res =>{
                optionPie.series[0].data = [
                    { value: res.total-res.danger, name: '良好'},
                    { value: res.danger, name: '存在风险'},
                ]
                optionPie && myChartPie.setOption(optionPie);
            })
    }
}


</script>
    
<style>

</style>