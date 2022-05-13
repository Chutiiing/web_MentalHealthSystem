<template>
  <div>
    <!-- 表格搜索框 -->
    <div style="margin:10px 0; text-align:left">
        <el-input style="width:200px; margin-right:5px;" 
                    placeholder="按学号搜索"
                    prefix-icon="el-icon-star-off"
                    size="medium"
                    v-model="sno"
                    clearable>
        </el-input>
        <el-input style="width:200px; margin-right:5px;" 
                    placeholder="按姓名搜索"
                    prefix-icon="el-icon-user"
                    size="medium"
                    v-model="name"
                    clearable>
        </el-input>
        <el-select v-model="academy" 
                    placeholder="按学院搜索"
                    style="width:200px; margin-right:5px;"
                    prefix-icon="el-icon-collection-tag"
                    size="medium">
            <el-option
                v-for="item in optionacademy"
                :key="item.academy"
                :label="item.label"
                :value="item.academy">
            </el-option>
        </el-select>
        <el-select v-model="grade" 
                    placeholder="按年级搜索"
                    style="width:200px; margin-right:5px;"
                    prefix-icon="el-icon-collection-tag"
                    size="medium">
            <el-option
                v-for="item in optiongrade"
                :key="item.grade"
                :label="item.label"
                :value="item.grade">
            </el-option>
        </el-select>
        <el-select v-model="state" 
                    placeholder="按心理状态搜索"
                    style="width:200px; margin-right:5px;"
                    prefix-icon="el-icon-sunny"
                    size="medium">
            <el-option
                v-for="item in optionstate"
                :key="item.state"
                :label="item.label"
                :value="item.state">
            </el-option>
        </el-select>
        <el-button style="margin-left:5px;" 
                    type="primary" 
                    plain size="medium" 
                    icon="el-icon-search" 
                    @click="load">搜索</el-button>
        <el-button style="margin-left:5px;" 
                    type="warning" 
                    plain size="medium" 
                    icon="el-icon-refresh-left" 
                    @click="reset">重置</el-button>
    </div>

    <div style="margin:20px 0;text-align:left;">
        <el-button type="primary" @click="handleAdd"><i class="el-icon-circle-plus-outline" style="margin-right:5px;"></i>新增</el-button>
        <template>
            <el-popconfirm
                title="确定删除这些记录吗？"
                @confirm = "delBatch"
                style="margin-left:10px"
            >
            <el-button slot="reference" type="danger"><i class="el-icon-delete" style="margin-right:5px;"></i>批量删除</el-button> 
            </el-popconfirm>
        </template>
    </div>

    <el-table :data="tableData" border stripe :header-cell-style="{background:'rgb(214 216 221)'}" @selection-change="handleSelectionChange">
        <!-- 表格内容 -->
        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column prop="sno" label="学号" width="130">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="130">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="130">
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
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
                <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                <!-- 删除确认 -->
                <template>
                    <el-popconfirm
                        title="确定删除这一条记录吗？"
                        @confirm = "handleDel(scope.row.sno)"
                        style="margin-left:10px"
                        >
                        <el-button slot="reference" type="danger" icon="el-icon-delete" circle></el-button> 
                    </el-popconfirm>
                </template>
            </template>
    </el-table-column>

    </el-table>
    <!-- 分页功能 -->
    <div style="padding:10px 0; text-align:center;">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog title="学生信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="100px" size="small">
            <el-form-item label="学号">
                <el-input v-model="form.sno" autocomplete="off" :disabled="snoInput"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="女" value="女"></el-option>
                    <el-option label="男" value="男"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学院">
                <el-select v-model="form.academy" placeholder="请选择学院" >
                    <el-option label="计算机与大数据学院" value="计算机与大数据学院"></el-option>
                    <el-option label="物理与信息工程学院" value="物理与信息工程学院"></el-option>
                    <el-option label="土木工程学院" value="土木工程学院"></el-option>
                    <el-option label="数学与统计学院" value="数学与统计学院"></el-option>
                    <el-option label="外国语学院" value="外国语学院"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业">
                <el-input v-model="form.major" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年级">
                <el-select v-model="form.grade" placeholder="请选择年级" >
                    <el-option label="18" value="18"></el-option>
                    <el-option label="19" value="19"></el-option>
                    <el-option label="20" value="20"></el-option>
                    <el-option label="21" value="21"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="心理状态">
                <el-select v-model="form.state" placeholder="请选择心理状态">
                    <el-option label="良好" value="良好"></el-option>
                    <el-option label="危险" value="危险"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
    name:"Student",
    data() {
        return{
            tableData: [],
            total:0,          //展示的数据总书
            pageNum:1,        //默认在哪一页
            pageSize:10,       //默认的页面中项目数
            sno:"",               //搜索的学号默认是空
            name:"",               //搜索的姓名默认是空
            optionacademy: [{
                academy: '',
                label: '所有学院'
            }, {
                academy: '计算机与大数据学院',
                label: '计算机与大数据学院'
            },{
                academy: '物理与信息工程学院',
                label: '物理与信息工程学院'
            },{
                academy: '土木工程学院',
                label: '土木工程学院'
            },{
                academy: '数学与统计学院',
                label: '数学与统计学院'
            },{
                academy: '外国语学院',
                label: '外国语学院'
            }],
            academy:"",               //搜索的学院默认是空
            optiongrade: [{
                grade: '',
                label: '所有年级'
            }, {
                grade: '18',
                label: '18'
            },{
                grade: '19',
                label: '19'
            },{
                grade: '20',
                label: '20'
            },{
                grade: '21',
                label: '21'
            }],
            grade:"",                //搜索的年级默认是空
            optionstate: [{
                state: '',
                label: '全部状态'
            }, {
                state: '良好',
                label: '良好'
            },{
                state: '危险',
                label: '危险'
            }],
            state:"",               //搜索的心理状态默认是空
            dialogFormVisible:false,   //对话框弹窗
            form:{
                password: "123456"    //默认密码
            },
            flag:true,       //默认是新增
            snoInput:false,     //学号的文本框默认是可以输入
            multipleSelection:[]     //多选数组
        }
    },
    //项目创建
    created() {
        this.load()
    },
    //方法
    methods:{
        //请求分页查询数据
        load(){
            request.get("/students/page",{
            params:{
                pageNum: this.pageNum,
                pageSize: 10,
                sno: this.sno,
                name: this.name,
                academy:this.academy,
                grade: this.grade,
                state: this.state
            }
            }).then(res =>{
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
        },
        //重置按钮
        reset(){
            this.sno = "";
            this.name = "";
            this.academy = "";
            this.grade = "";
            this.state = "";
            this.load();
        },
        //新增用户数据
        handleAdd(){
            this.form = {};     //form对象置空
            this.flag = true;         //表示是新增
            this.snoInput = false;   //可输入学号
            this.dialogFormVisible = true;   //显示弹窗
        },
        //编辑用户信息
        handleEdit(row){
            this.form = row;
            this.flag = false;       //表示是编辑
            this.snoInput = true;    //学号不可修改
            this.dialogFormVisible = true;
        },
        //保存修改
        save(){
            this.dialogFormVisible = false;
            //新增
            if(this.flag){  
            this.form.password = "123456";              //默认密码
            request.post("/students/insert",this.form).then(res =>{
                if(res){
                this.$message.success("新增成功")
                this.load();     //刷新页面
                }
                else{
                this.$message.error("新增失败")
                }
            })
            }
            //修改
            else{
            request.post("/students/update",this.form).then(res =>{
                if(res){
                this.$message.success("修改成功")
                this.load();     //刷新页面
                }
                else{
                this.$message.error("修改失败")
                }
            })
            }
        },
        //删除
        handleDel(sno){
            request.delete("/students/del/"+sno).then(res =>{
                if(res){
                    this.$message.success("删除成功")
                    this.load();     //刷新页面
                }
                else{
                this.$message.error("删除失败")
                }
            })
        },
        //批量删除
        handleSelectionChange(val){
            console.log(val);
            this.multipleSelection = val;
        },
        delBatch(){
            let snos = this.multipleSelection.map(v => v.sno)
            console.log(snos);
            request.post("/students/batch",snos).then(res =>{
            if(res){
                this.$message.success("批量删除成功")
                this.load();     //刷新页面
                }
                else{
                this.$message.error("批量删除失败")
                }
            })
        }
    }

}
</script>

<style>

</style>