import { createRouter, createWebHistory } from 'vue-router'
// createRouter创建路由实例
//  配置history模式
// createWebHistory创建history模式  地址栏无#
// createWebHashHistory创建hash模式 地址栏有#
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/App.vue'),
            redirect: '/study'
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
        }
    ]
})
export default router
