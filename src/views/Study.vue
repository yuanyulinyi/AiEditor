<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CET4 } from '../dictionary/dicts/CET4'
import { CET6 } from '../dictionary/dicts/CET6'
import { insertWord } from '../api/word/word'
import axios from 'axios'
const input = ref('')
const word = ref({
  "name": '',
  "trans": ''
})
const link = ref('')
const getWord = async () => {
  const flag = ref(false)

  CET4.value.forEach(item => {
    if (item.name === input.value) {
      flag.value = true
      word.value.name = item.name
      word.value.trans = item.trans[0]
    }
  });
  if (!flag.value) {
    CET6.value.forEach(item => {
      if (item.name === input.value) {
        flag.value = true
        word.value.name = item.name
        word.value.trans = item.trans[0]
      }
    });
  }
  if (!flag.value) {
    console.log("本次为api调用");
    console.log("输入值：", input.value);
    const res = await axios.get('https://apis.tianapi.com/enwords/index' + '?key=605a8c0fed85b2126fd23d0846059929&word=' + input.value)
    if (res.data.code !== 250) {
      flag.value = true
      word.value.name = res.data.result.word
      word.value.trans = res.data.result.content
    }
  }
  if (!flag.value) {
    word.value.name = input.value
    word.value.trans = '未找到该单词'
  }
}
const insert = async () => {
  await insertWord(word.value.name, word.value.trans)
  ElMessage.success('插入成功')
}
const getLink = () => {
  link.value = 'https://dict.youdao.com/result?word=' + input.value + '&lang=en'
}
onMounted(() => {

})
/* -------------------------------------------------- */
</script>
<template>
  <el-divider>单词查询</el-divider>
  <el-input v-model="input" style="max-width: 600px" placeholder="请输入英文单词：" class="input-with-select"
    @input="getLink()">
    <template #append>
      <el-button :icon="Search" @click=getWord() />
    </template>
  </el-input>
  <el-button type="primary" @click="insert">插入</el-button>
  <el-link type="primary" :href="link">有道词典</el-link>
  <br>
  <div>{{ word.name }} 翻译:</div>
  <textarea v-model="word.trans" />
</template>

<style scoped></style>
../api/word/word