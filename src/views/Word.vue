<script setup>
import { ref, onMounted } from 'vue'
import { CET4 } from '../dictionary/dicts/CET4'
import { CET6 } from '../dictionary/dicts/CET6'
import { ElDrawer, ElMessage } from 'element-plus'
import { getWords } from '../api/word/word'

const formLabelWidth = '80px'

const dialog = ref(false)
const tableData = ref()
const form = ref({
    dict: ''
})

const onClick = () => {
    if (form.value.dict === '4')
        tableData.value = CET4.value
    else
        tableData.value = CET6.value
    dialog.value = false
}
const getMyWords = async () => {
    await getWords().then(res => {
        tableData.value = res.data.data
    })
    console.log(tableData.value);
    ElMessage.success('查询成功')
}
const cancelForm = () => {
    dialog.value = false
}
onMounted(() => {
    getMyWords()
})
</script>

<template>
    <el-button text @click="dialog = true">选择词典</el-button>
    <el-drawer v-model="dialog" title="请选择你的词典" direction="ltr" class="demo-drawer">
        <div class="demo-drawer__content">
            <el-form :model="form">
                <el-form-item label="词典" :label-width="formLabelWidth">
                    <el-select v-model="form.dict" placeholder="请选择">
                        <el-option label="CET4" value="4" />
                        <el-option label="CET6" value="6" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取消</el-button>
                <el-button type="primary" @click="onClick">确定</el-button>
            </div>
        </div>
    </el-drawer>

    <el-table :data="tableData" style="width: 100%" table-layout="fixed">
        <el-table-column prop="name" label="单词" width="120" />
        <el-table-column prop="trans" label="翻译" width="120" />
    </el-table>
</template>

<style></style>
../api/word/word