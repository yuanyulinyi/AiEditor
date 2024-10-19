<template>
    <div>
        <el-input v-model="input" style="width: 240px" placeholder="请输入访问pdf的url" />
        <el-button type="primary" @click="updatePdf">提交</el-button>
    </div>
    <vue-office-pdf :src="pdfUrl" style="height: 100vh;width: 100vh" @rendered="renderedHandler"
        @error="errorHandler" />
</template>

<script>
import { ref } from 'vue'
import VueOfficePdf from '@vue-office/pdf'
import { ElInput, ElButton, ElMessage } from 'element-plus'

export default {
    components: {
        VueOfficePdf,
        ElInput,
        ElButton
    },
    setup() {
        let input = ref('')
        const pdfUrl = ref('')
        const updatePdf = () => {
            pdfUrl.value = 'https://yuanyulinyi.github.io/docs/' + encodeURIComponent(input.value) + '.pdf'
        }

        const renderedHandler = () => {
            console.log("渲染完成")
        }

        const errorHandler = () => {
            console.log("渲染失败")
            ElMessage({
                message: '渲染失败,请检查输入路径',
                type: 'error',
                plain: true,
            })
        }

        return {
            input,
            pdfUrl,
            updatePdf,
            renderedHandler,
            errorHandler
        }
    }
}
</script>