<template>
    <div>
        <el-col :span="8" style="margin-top:15px;">
            <el-row :gutter="10" style="margin-bottom:10px">
                <el-card style="width:400px; ">
                    <div style="width:300px">
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
                            <div slot="tip" class="el-upload__tip">只能上传xlsx类型的文件，进行心理量表的导入</div>
                        </el-upload>
                    </div>
                </el-card>
            </el-row>
            <el-row :gutter="10">
                <el-card style="width:400px; height:400px">
                    <div id="pie" style="width: 350px;height: 400px"></div>
                </el-card>
            </el-row>
        </el-col>
        <el-col :span="16" style="margin-top:10px;">
            <el-card style="width:100%;height:730px; ">
            </el-card>
        </el-col>
    </div>
    
  
</template>

<script>

import * as echarts from 'echarts';

export default {
    data() {
      return {
        fileList: [
            {name: '心理健康量表1.xlsx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
            {name: '心理健康量表2.xlsx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
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
                
                labelLine: {
                    show: false
                },
                data: [
                    { value: 16, name: '量表1'},
                    { value: 5, name: '量表2' },
                    { value: 8, name: '量表3' },
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