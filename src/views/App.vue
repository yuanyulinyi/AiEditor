<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from "@/store"
import {
  Document,
  ChatDotRound,
  Edit,
  Files,
  User,
  Key,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const isCollapse = ref(true)

const handleCommand = (command) => {
  if (command === 'logout') {
    logout()
  } else navigateTo('/user/' + command)
}

const handleOpen = (key, keyPath) => {
  console.log('Menu opened:', key, keyPath)
}

const handleClose = (key, keyPath) => {
  console.log('Menu closed:', key, keyPath)
}

const handleMouseEnter = () => {
  isCollapse.value = false
}

const handleMouseLeave = () => {
  isCollapse.value = true
}

const logout = () => {
  ElMessageBox.confirm('您确定要退出登录吗?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await userStore.logOut()
      router.push('/login')
      ElMessage.success('Logout successful!')
      userStore.setToken('')
      userStore.removeUser()
      router.push('login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消退出'
      })
    })
}

const menuItems = [
  { index: '1', path: '/study', icon: Document, title: '英语学习' },
  { index: '2', path: '/aiEditor', icon: ChatDotRound, title: '千问AI' },
  { index: '3', path: '/word', icon: Edit, title: '单词学习' },
  { index: '4', path: '/pdf', icon: Files, title: 'PDF预览' },
  {
    index: '5',
    path: '/user',
    icon: User,
    title: '用户中心',
    children: [
      { index: '5-1', path: '/user/profile', icon: User, title: '个人资料' },
      { index: '5-2', path: '/user/avatar', icon: Edit, title: '更换头像' },
      { index: '5-3', path: '/user/password', icon: Key, title: '修改密码' },
    ]
  }
]

const noLayoutPaths = ['/login', '/register']

const shouldRenderLayout = computed(() => {
  return !noLayoutPaths.includes(route.path)
})

const navigateTo = (path) => {
  console.log('Navigating to:', path)
  router.push(path)
}

// Watch for route changes
watch(
  () => route.path,
  (newPath) => {
    console.log('Route changed to:', newPath)
  }
)
</script>

<template>
  <div v-if="shouldRenderLayout" class="app-container">
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapse }" @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
      <div class="logo">
        <img src="../assets/images/profile.jpg" alt="Logo" class="logo-img" />
        <span v-show="!isCollapse" class="logo-text">员工管理系统</span>
      </div>
      <el-menu :default-active="route.path" class="el-menu-vertical" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose">
        <template v-for="item in menuItems" :key="item.index">
          <el-sub-menu v-if="item.children" :index="item.index">
            <template #title>
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.index" :index="child.path"
              @click="navigateTo(child.path)" style="background-color: transparent">
              <el-icon>
                <component :is="child.icon" />
              </el-icon>
              <template #title>{{ child.title }}</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.path" @click="navigateTo(item.path)">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </aside>
    <div class="main-container" :class="{ 'main-container-expanded': !isCollapse }">
      <header class="header">
        <div class="header-left">
          <h1 class="page-title">{{ route.meta.title || '员工管理系统' }}</h1>
        </div>
        <div class="header-right">
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <span class="el-dropdown__box">
              <el-avatar :src="userStore.user.avatar" />
              <span class="username">{{ userStore.user.username || '游客' }}</span>
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User">
                  基本资料
                </el-dropdown-item>
                <el-dropdown-item command="avatar" :icon="Edit">
                  更换头像
                </el-dropdown-item>
                <el-dropdown-item command="password" :icon="Key">
                  重置密码
                </el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <main class="main-content">
        <router-view />
      </main>
      <footer class="footer">
        ©2024 Created by 芩离
      </footer>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<style scoped lang="less">
.app-container {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(to bottom right, #9333ea, #ec4899, #ef4444);
}

.sidebar {
  width: 200px;
  transition: width 0.3s;
  backdrop-filter: blur(10px);
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  position: fixed;
  z-index: 1000;

  &.sidebar-collapsed {
    width: 64px;
  }

  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.2);

    .logo-img {
      width: 32px;
      height: 32px;
    }

    .logo-text {
      margin-left: 12px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      opacity: 1;
      transition: opacity 0.3s;
    }
  }

  .el-menu-vertical {
    border-right: none;
    background-color: transparent;

    .el-sub-menu {
      background-color: transparent;

      &.is-opened {
        >.el-sub-menu__title {
          background-color: wheat;
        }
      }

      .el-menu {
        background-color: transparent;

        .el-menu-item {
          background-color: transparent;

          &:hover {
            background-color: rgba(236, 72, 153, 0.7);
          }

          &.is-active {
            background-color: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
  }
}

.main-container {
  flex: 1;
  margin-left: 64px;
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;

  &.main-container-expanded {
    margin-left: 200px;
  }
}

.header {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;

  .header-left {
    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      margin: 0;
    }
  }

  .header-right {
    .el-dropdown__box {
      display: flex;
      align-items: center;
      cursor: pointer;

      .el-avatar {
        margin-right: 8px;
      }

      .username {
        margin-right: 8px;
        font-size: 14px;
        color: #fff;
      }

      .el-icon {
        color: #fff;
        font-size: 12px;
      }
    }
  }
}

.main-content {
  flex: 1;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  margin: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.footer {
  text-align: center;
  padding: 16px 24px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 0;

    &:hover {
      width: 200px;
    }
  }

  .main-container {
    margin-left: 0;
  }

  .header {
    padding: 0 16px;
  }

  .main-content {
    padding: 16px;
    margin: 16px;
  }
}
</style>