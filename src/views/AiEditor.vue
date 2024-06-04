<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import { onMounted, onUnmounted, ref } from "vue";

const divRef = ref();
let aiEditor: AiEditor | null = null;

onMounted(() => {
    aiEditor = new AiEditor({
        element: divRef.value as Element,
        ai: {
            models: {
                spark: {
                    appId: "b8af2714",
                    apiKey: "db4348bf42a2f95b85b62dc1705ec52c",
                    apiSecret: "M2M5ZWJmYjJkNjI0ZTI0OTNjMDMyMjk0",
                    protocol: "ws", //或者 wss
                    version: "v3.5", //或者其他
                }
            }
        },
        placeholder: "点击输入内容...",
        content: 'AIEditor页面 ',
    })
})

onUnmounted(() => {
    aiEditor && aiEditor.destroy();
})
</script>

<template>
    <div>
        <h1>AiEditor，一个面向 AI 的富文本编辑器</h1>
    </div>
    <div ref="divRef" style="height: 600px" />
</template>

<style scoped>
h1 {
    color: #646cff;
}
</style>