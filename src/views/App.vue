<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChatDotRound,
  User,
} from '@element-plus/icons-vue'
const router = useRouter()
const navigateTo = (path) => {
  router.push(path)
}
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
onMounted(() => {
})
</script>
<template>
  <el-container>
    <el-header>
      <div class="headerText">
        English Assistant
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1" @click="navigateTo('aiEditor')">
            <el-icon>
              <ChatDotRound />
            </el-icon>
            <template #title>千问</template>
          </el-menu-item>
          <el-menu-item index="2" @click="navigateTo('study')">
            <el-icon>
              <User />
            </el-icon>
            <template #title>英语</template>
          </el-menu-item>
          <el-menu-item index="3" @click="navigateTo('word')">
            <el-icon>
              <User />
            </el-icon>
            <template #title>单词</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-container>
        <el-footer> ©2024 Created by 芩离</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
.headerText {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  /* 设置高度，例如50px，根据需要调整 */
  height: 80px;

  /* 防止内容被遮挡时出现滚动条 */
  z-index: 99;
  /* 根据页面其他元素的z-index调整，确保footer在最上层 */

  /* 可选：为了美观，可以添加背景色或者其他样式 */
  background-color: #646cff;
  color: #fff;
  text-align: center;
  font-size: 25px;
  line-height: 80px;
}

.el-aside {
  width: 150px;
  height: 800px
}

.el-main {
  height: 800px
}

.el-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  /* 设置高度，例如50px，根据需要调整 */
  height: 50px;

  /* 防止内容被遮挡时出现滚动条 */
  z-index: 99;
  /* 根据页面其他元素的z-index调整，确保footer在最上层 */

  /* 可选：为了美观，可以添加背景色或者其他样式 */
  background-color: #333;
  color: #fff;
  text-align: right;
  line-height: 50px;
  /* 使文本垂直居中 */
}
</style>