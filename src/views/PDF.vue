<template>
    <vue-office-pdf :src="pdf" style="height: 100vh;margin:0,25%" @rendered="renderedHandler" @error="errorHandler" />
</template>

<script>
// 引入 VueOfficePdf 组件
import VueOfficePdf from '@vue-office/pdf'

export default {
    components: {
        VueOfficePdf
    },
    data() {
        return {
            pdf: 'https://yuanyulinyi.github.io/docs/设计模式.pdf' // 设置文档地址
        }
    },
    methods: {
        renderedHandler() {
            console.log("渲染完成")
        },
        errorHandler() {
            console.log("渲染失败")
        }
    }
}
</script>
