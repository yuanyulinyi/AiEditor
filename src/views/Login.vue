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
                        <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
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
                                <span v-if="showPassword">
                                    <EyeOffIcon class="h-5 w-5" />
                                </span>
                                <span v-else>
                                    <EyeIcon class="h-5 w-5" />
                                </span>
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
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UserIcon, Loader2Icon, CheckIcon, XIcon } from 'lucide-vue-next'
import Cookies from "js-cookie"
import { useUserStore } from "@/store"
import { encrypt } from '@/utils/jsencrypt'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const showPassword = ref(false)

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const isLogin = ref(true)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
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
            // 登录逻辑
            await userStore.login(username.value, password.value)
            if (rememberMe.value) {
                /* Cookies.set("username", username.value, { expires: 30 })
                Cookies.set("password", encrypt(password.value), { expires: 30 })
                Cookies.set("rememberMe", rememberMe.value, { expires: 30 }) */
                userStore.saveUser(username.value, password.value)
            } else {
                /* Cookies.remove("username")
                Cookies.remove("password")
                Cookies.remove("rememberMe") */
                userStore.removeUser()
            }
            userStore.setUsername(username.value)

            const redirect = route.query.redirect?.toString() || '/'
            router.push(redirect)
        } else {
            // 注册逻辑
            // 这里需要实现注册的 API 调用
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