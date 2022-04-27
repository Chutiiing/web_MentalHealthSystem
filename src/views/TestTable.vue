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
                                >搜索</el-button>
                </div>
                <!-- 预约信息列表 -->
                <el-row :gutter="10">
                    <el-col :span="12" 
                            v-for="item in Tables"
                            :key="item.id" 
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
                                            height:42px;">简介：{{item.abstract}}</div>
                                <div style="margin-bottom:15px; font-size:13px; color:#938a8a"><i class="el-icon-user-solid"/>  发布人：{{item.admin}}</div>
                                <div style="margin-bottom:15px; font-size:13px; color:#938a8a" ><i class="el-icon-date"/>  发布时间：{{item.date}}</div>
                                <el-button size="medium" type="primary" plain>查看量表详情</el-button>
                                <el-button style="margin-left:20px" size="medium" type="danger" plain>删除量表</el-button>
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
                                    icon="el-icon-search">搜索</el-button>
                    </div>
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
        title:'',    //搜索框数据
        Tables:[{       //量表信息
            id:'1',
            title:'心理压力测评表',
            abstract:'在现代社会中，由于竞争日趋激烈，生活节奏加快，各种应急事件增多，人们的心理压力不断加大，容易产生各种负性情绪，成为影响人们生活质量的重要因素。那么，我们能否自我测试所受的心理压力，预防和减轻身心损害呢？',
            admin:'admin',
            date:'2022-04-26 17:00:00'
        },{
            id:'2',
            title:'Sarason考试焦虑量表(TAS)',
            abstract:'此量表用于测定初中以上学生在考试期间的焦虑水平。下列37个句子是描述人们对参加考试的感受。',
            admin:'admin',
            date:'2022-04-26 17:00:00'
        },{
            id:'3',
            title:'焦虑自评量表 (SAS)',
            abstract:'焦虑自评量表(Self-Rating Anxiety Scale SAS)由华裔教授Zung编制（1971）。从量表构造的形式到具体评定的方法，都与抑郁自评量表(SDS)十分相似，是一种分析病人主观症状的相当简便的临床工具。由于焦虑是心理咨询门诊中较常见的一种情绪障碍，所以近年来SAS是咨询门诊中了解焦虑症状的常用量表。',
            admin:'admin',
            date:'2022-04-26 17:00:00'
        },{
            id:'4',
            title:'人际信任量表',
            abstract:'本量表用于测试受试者对他人行为、承诺或陈述之可靠性的估计。共25个项目，其内容涉及各种处境下的人际信任，涉及不同社会角色。多数项目于社会角色的可信赖信有关，但有些项目与对未来的社会的乐观程度有关。',
            admin:'admin',
            date:'2022-04-26 17:00:00'
        }],
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
    methods: {
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
                data: [
                    { value: 18, name: '已填写人数'},
                    { value: 5, name: '未填写人数' },
                ]
                }
            ]
        };

        option && myChart.setOption(option);

    }

}
</script>

<style>
a.el-upload-list__item-name{
    text-align:left !important;
}
</style>