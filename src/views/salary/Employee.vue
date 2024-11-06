<template>
    <div class="app-container">
        <div class="controls">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="查询部门工资" prop="department">
                    <el-select v-model="selectedDepartment" placeholder="请选择部门" @change="handleDepartmentChange">
                        <el-option v-for="dept in departmentList" :key="dept" :label="dept" :value="dept" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showSalaryChart">显示工资图表</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" plain icon="Download" @click="handleExport">导出</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog v-model="dialogVisible" title="工资图表" width="80%">
            <div class="chart-controls">
                <el-radio-group v-model="chartType" @change="updateChart">
                    <el-radio-button label="department">按部门显示</el-radio-button>
                    <el-radio-button label="individual">按个人显示</el-radio-button>
                </el-radio-group>
            </div>
            <div ref="chartRef" style="width: 100%; height: 400px;"></div>
        </el-dialog>

        <el-table v-loading="loading" :data="empList" class="employee-table">
            <el-table-column label="序号" type="index" width="50" align="center" prop="employeeId" />
            <el-table-column label="员工编号" align="center" prop="code" />
            <el-table-column label="姓名" align="center" prop="name" />
            <el-table-column label="性别" align="center" prop="gender" />
            <el-table-column label="出生日期" align="center">
                <template #default="scope">
                    {{ formatDate(scope.row.birthDate) }}
                </template>
            </el-table-column>
            <el-table-column label="入职日期" align="center">
                <template #default="scope">
                    {{ formatDate(scope.row.joinDate) }}
                </template>
            </el-table-column>
            <el-table-column label="部门" align="center" prop="department" />
            <el-table-column label="类别" align="center" prop="category" />
            <el-table-column label="职位" align="center" prop="position" />
            <el-table-column label="技术等级" align="center" prop="technicalLevel" />
            <el-table-column label="职称" align="center" prop="technicalTitle" />
            <el-table-column label="学历" align="center" prop="education" />
            <el-table-column label="民族" align="center" prop="ethnicity" />
            <el-table-column label="籍贯" align="center" prop="nativePlace" />
            <el-table-column label="地址" align="center" prop="address" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" @click="calcSalary(scope.row)">计算工资</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { pageQuery, calc, getDeptList, getAllDeptSalary, getDeptSalary } from '@/api/salary/employee'
import { download } from '@/api/download'
const dialogVisible = ref(false)
const chartRef = ref(null)
const empList = ref([])
const loading = ref(true)
const total = ref(0)
const selectedDepartment = ref('')
const departmentList = ref([])
const chartType = ref('department')
const chart = ref(null)

const queryParams = reactive({
    pageNum: 1,
    pageSize: 10
})

const salaryData = ref({
    departmentSalaries: null,
    individualSalaries: []
})

const getList = () => {
    loading.value = true
    pageQuery(queryParams.pageNum, queryParams.pageSize).then((response) => {
        empList.value = response.data.data.records
        total.value = response.data.data.total
        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}

const handleSizeChange = (size) => {
    queryParams.pageSize = size
    getList()
}

const handleCurrentChange = (page) => {
    queryParams.pageNum = page
    getList()
}

const calcSalary = (row) => {
    calc(row.employeeId).then((res) => {
        ElMessage.success(`${row.name}的工资是: ${res.data.data}元`)
    }).catch((error) => {
        console.error("计算工资失败:", error)
    })
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const fetchDepartments = () => {
    getDeptList().then(response => {
        departmentList.value = response.data.data
    }).catch(error => {
        console.error('获取部门列表失败:', error)
    })
}

const handleDepartmentChange = () => {
    if (selectedDepartment.value) {
        getDeptSalary(selectedDepartment.value).then(response => {
            ElMessage.success(selectedDepartment.value + '工资总计：' + response.data.data)
        }).catch(error => {
            console.error('获取部门工资数据失败:', error)
        })
    }
}

const showSalaryChart = async () => {
    dialogVisible.value = true
    if (!salaryData.value.departmentSalaries) {
        try {
            const response = await getAllDeptSalary()
            salaryData.value.departmentSalaries = response.data.data
        } catch (error) {
            console.error('获取所有部门工资数据失败:', error)
            ElMessage.error('获取工资数据失败')
            return
        }
    }
    updateChart()
}

const updateChart = () => {
    if (!chart.value) {
        chart.value = echarts.init(chartRef.value)
    }

    let option
    if (chartType.value === 'department') {
        option = createDepartmentChartOption()
    } else {
        option = createIndividualChartOption()
    }

    chart.value.setOption(option)
}

const createDepartmentChartOption = () => {
    const data = Object.entries(salaryData.value.departmentSalaries).map(([dept, info]) => ({
        name: dept,
        value: info.total_salary
    }))

    return {
        title: { text: '部门工资总额' },
        tooltip: { trigger: 'axis', formatter: '{b}: {c}元' },
        xAxis: { type: 'category', data: data.map(item => item.name) },
        yAxis: { type: 'value', name: '工资总额 (元)' },
        series: [{
            data: data.map(item => item.value),
            type: 'bar',
            name: '工资总额'
        }]
    }
}

const createIndividualChartOption = () => {
    return {
        title: { text: '员工个人工资' },
        tooltip: { trigger: 'axis', formatter: '{b}: {c}元' },
        xAxis: { type: 'category', data: salaryData.value.individualSalaries.map(item => item.name) },
        yAxis: { type: 'value', name: '工资 (元)' },
        series: [{
            data: salaryData.value.individualSalaries.map(item => item.salary),
            type: 'bar',
            name: '工资'
        }]
    }
}

// 导出工资表
const handleExport = async () => {
    download("http://localhost:8080/salary/export", `salary_${new Date().getTime()}.xlsx`);
};
watch(chartType, () => {
    if (chartType.value === 'individual' && salaryData.value.individualSalaries.length === 0) {
        Promise.all(empList.value.map(emp => calc(emp.employeeId)))
            .then(results => {
                salaryData.value.individualSalaries = results.map((result, index) => ({
                    name: empList.value[index].name,
                    salary: result.data.data
                }))
                updateChart()
            })
            .catch(error => {
                console.error('获取个人工资数据失败:', error)
                ElMessage.error('获取个人工资数据失败')
            })
    } else {
        updateChart()
    }
})

onMounted(() => {
    fetchDepartments()
    getList()
})
</script>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.controls {
    background-color: #f0f2f5;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-form-inline {
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-form-item {
    margin-bottom: 0;
    margin-right: 20px;
}

.el-form-item__label {
    font-weight: bold;
    color: #333;
    font-size: 16px;
}

.el-select {
    width: 200px;
}

.chart-controls {
    margin-bottom: 16px;
}

.employee-table {
    width: 100%;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .demo-form-inline {
        flex-direction: column;
        align-items: stretch;
    }

    .el-form-item {
        margin-right: 0;
        margin-bottom: 15px;
    }

    .el-select {
        width: 100%;
    }
}
</style>