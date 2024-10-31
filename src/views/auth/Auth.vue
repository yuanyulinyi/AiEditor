<template>
    <div>Redirecting...</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useUserStore } from "@/store";
import { getAuthByCode } from "@/api/auth/auth";

export default {
    setup() {
        const router = useRouter();
        const userStore = useUserStore();

        const handleCallback = async (code, provider) => {
            try {
                const res = await getAuthByCode(code, provider);
                const { token, userName } = res.data.data; // 从后端响应中提取 token
                userStore.setToken(token);
                userStore.setUsername(userName);

                router.push('/'); // 登录后重定向
            } catch (error) {
                console.error('Error handling callback:', error);
            }
        };

        const getCodeAndProviderFromUrl = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const code = searchParams.get('code');

            // 假设路径格式固定，提取 provider
            const pathSegments = window.location.pathname.split('/');
            const provider = pathSegments[pathSegments.length - 1]; // 第二个倒数即为provider
            console.log('Provider:', provider);
            return {
                code,
                provider
            };
        };

        const { code, provider } = getCodeAndProviderFromUrl();

        if (code && provider) {
            handleCallback(code, provider).catch((error) => {
                console.error('Failed to handle callback:', error);
                // 可能重定向到错误页面或显示消息
            });
        } else {
            console.error('Authorization code or provider not found');
        }
    },
};
</script>