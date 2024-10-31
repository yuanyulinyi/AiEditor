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
            path: '/login/oauth2/code/:pathMatch(.*)*',
            component: () => import('../views/auth/Auth.vue')
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
    // 使用正则表达式匹配需要排除的路径
    const excludedPathsRegex = /^\/(login|register|oauth2\/authorization|login\/oauth2\/code)($|\/)/;

    // 检查路径是否匹配正则表达式
    if (!excludedPathsRegex.test(to.path)) {
        // 如果路径不是要排除的路径之一，则检查 token
        const userStore = useUserStore();
        if (!userStore.token) {
            // 如果用户没有 token，则重定向到登录页面
            alert('非法访问');
            return '/login';
        }
    }
});

export default router