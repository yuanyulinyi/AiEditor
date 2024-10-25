import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/store"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/App.vue'),
            redirect: '/study'
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/study',
            component: () => import('../views/Study.vue')
        },
        {
            path: '/aiEditor',
            component: () => import('../views/AiEditor.vue')
        },
        {
            path: '/word',
            component: () => import('../views/Word.vue')
        },
        {
            path: '/pdf',
            component: () => import('../views/PDF.vue')
        },
        {
            path: '/user',
            redirect: 'profile',
            children: [
                {
                    path: 'profile',
                    component: () => import('../views/user/Profile.vue')
                },
                {
                    path: 'avatar',
                    component: () => import('../views/user/Avatar.vue')
                },
                {
                    path: 'password',
                    component: () => import('../views/user/Password.vue')
                }
            ]
        }
    ]
})

router.beforeEach((to) => {
    // 路由守卫  若当前页面不是登录页面，则判断是否有token，没有则跳转到登录页面
    const userStore = useUserStore()
    if (to.path !== '/login' && to.path !== '/register' && !userStore.token) {
        alert('非法访问')
        return '/login'
    }
    return true
})

export default router