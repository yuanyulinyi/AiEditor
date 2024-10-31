<template>
    <div
        class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div class="p-8">
                <div class="text-center mb-8">
                    <div
                        class="inline-block p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">
                        <UserIcon class="h-8 w-8" />
                    </div>
                    <h2 class="text-3xl font-extrabold text-gray-900">
                        {{ isLogin ? 'Welcome Back' : 'Create Account' }}
                    </h2>
                    <p class="mt-2 text-sm text-gray-600">
                        {{ isLogin ? 'Sign in to your account' : 'Sign up for a new account' }}
                    </p>
                </div>
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input type="text" id="username" v-model="username" required :class="{
                            'pr-10': usernameError,
                            'border-red-300': usernameError,
                            'text-red-900': usernameError,
                            'placeholder-red-300': usernameError
                        }" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                placeholder="Enter your username">
                            <div v-if="usernameError"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <XIcon class="h-5 w-5 text-red-500" />
                            </div>
                        </div>
                        <p v-if="usernameError" class="mt-2 text-sm text-red-600">{{ usernameError }}</p>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required
                                :class="{
                            'pr-10': passwordError,
                            'border-red-300': passwordError,
                            'text-red-900': passwordError
                        }" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                placeholder="••••••••">
                            <button type="button" @click="togglePassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none">
                                <EyeIcon v-if="showPassword" class="h-5 w-5" />
                                <EyeOffIcon v-else class="h-5 w-5" />
                            </button>
                        </div>
                        <p v-if="passwordError" class="mt-2 text-sm text-red-600">{{ passwordError }}</p>
                    </div>

                    <div v-if="!isLogin">
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm
                            Password</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input type="password" id="confirmPassword" v-model="confirmPassword" required :class="{
                            'pr-10': confirmPasswordError,
                            'border-red-300': confirmPasswordError,
                            'text-red-900': confirmPasswordError,
                            'placeholder-red-300': confirmPasswordError
                        }" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                placeholder="••••••••">
                            <div v-if="!confirmPasswordError && confirmPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <CheckIcon class="h-5 w-5 text-green-500" />
                            </div>
                            <div v-if="confirmPasswordError"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <XIcon class="h-5 w-5 text-red-500" />
                            </div>
                        </div>
                        <p v-if="confirmPasswordError" class="mt-2 text-sm text-red-600">{{ confirmPasswordError }}</p>
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" v-model="rememberMe"
                                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="isLoading || !isFormValid">
                            <Loader2Icon v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            {{ isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up') }}
                        </button>
                    </div>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-2 gap-3">
                        <button @click="handleGithubLogin"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <GithubIcon class="h-5 w-5 mr-2" />
                            GitHub
                        </button>
                        <button @click="handleGiteeLogin"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <img src="@/assets/images/gitee.png" width="20px">
                            Gitee
                        </button>
                    </div>
                </div>
            </div>

            <div
                class="px-8 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                <div class="text-sm text-gray-600">
                    {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                </div>
                <button @click="toggleForm"
                    class="mt-3 sm:mt-0 w-full sm:w-auto flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out">
                    {{ isLogin ? 'Sign Up' : 'Sign In' }}
                </button>
            </div>
        </div>
        <transition name="fade">
            <div v-if="message" class="fixed bottom-4 right-4 p-4 rounded-md shadow-lg" :class="messageClass">
                {{ message }}
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UserIcon, EyeIcon, EyeOffIcon, Loader2Icon, CheckIcon, XIcon, GithubIcon } from 'lucide-vue-next'
import { useUserStore } from "@/store"
import { authByGithub, authByGitee } from "@/api/auth/auth"

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isLogin = ref(true)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const message = ref('')
const rememberMe = ref(false)

const usernameError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

const validateUsername = (username) => {
    return username.length >= 3
}

const validatePassword = (password) => {
    return password.length >= 6
}

const isFormValid = computed(() => {
    return validateUsername(username.value) && validatePassword(password.value) &&
        (isLogin.value || password.value === confirmPassword.value)
})

watch(username, (newValue) => {
    usernameError.value = validateUsername(newValue) ? '' : 'Username must be at least 3 characters long'
})

watch(password, (newValue) => {
    passwordError.value = validatePassword(newValue) ? '' : 'Password must be at least 6 characters long'
})

watch(confirmPassword, (newValue) => {
    confirmPasswordError.value = newValue === password.value ? '' : 'Passwords do not match'
})

const messageClass = computed(() => {
    return {
        'bg-green-100 text-green-800 border-green-300': message.value.includes('successful'),
        'bg-red-100 text-red-800 border-red-300': message.value.includes('failed') || message.value.includes('match')
    }
})

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const toggleForm = () => {
    isLogin.value = !isLogin.value
    username.value = ''
    password.value = ''
    confirmPassword.value = ''
    message.value = ''
    usernameError.value = ''
    passwordError.value = ''
    confirmPasswordError.value = ''
}

const handleSubmit = async () => {
    if (!isFormValid.value) {
        message.value = 'Please correct the errors in the form'
        return
    }

    isLoading.value = true

    try {
        if (isLogin.value) {
            // Login logic
            await userStore.login(username.value, password.value)
            if (rememberMe.value) {
                userStore.saveUser(username.value, password.value)
            } else {
                userStore.removeUser()
            }
            userStore.setUsername(username.value)

            const redirect = route.query.redirect?.toString() || '/'
            router.push(redirect)
        } else {
            // Register logic
            await userStore.register(username.value, password.value)
            message.value = 'Registration successful! Please login.'
            isLogin.value = true
        }
    } catch (error) {
        console.error('Authentication error:', error)
        message.value = `Authentication failed: ${error.message}`
    } finally {
        isLoading.value = false
    }
}

//Github登录
const handleGithubLogin = async () => {
    console.log('GitHub login clicked');
    try {
        const res = await authByGithub();
        const clientId = res.data.data; // 确保这里的路径是正确的
        const redirectUri = "http://localhost:5173/login/oauth2/code/github";
        console.log('Client ID:', clientId); // 打印 Client ID 以确认是否正确获取
        console.log('Redirect URI:', redirectUri); // 打印 Redirect URI 以确认是否正确
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    } catch (error) {
        console.error('Failed to authenticate with GitHub:', error);
    }
};


const handleGiteeLogin = async () => {
    console.log('Gitee login clicked');
    try {
        const res = await authByGitee();
        const clientId = res.data.data; // 确保这里的路径是正确的
        const redirectUri = "http://localhost:5173/login/oauth2/code/gitee";
        console.log('Client ID:', clientId); // 打印 Client ID 以确认是否正确获取
        console.log('Redirect URI:', redirectUri); // 打印 RedirectURI 以确认是否正确
        window.location.href = `https://gitee.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    } catch (error) {
        console.error('Failed to authenticate with Gitee:', error);
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>