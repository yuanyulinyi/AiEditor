import { ref } from 'vue';
import { defineStore } from 'pinia';
import { login, logout, register } from '@/api/login/login';
import defAva from '@/assets/images/profile.jpg';

export const useUserStore = defineStore(
    // 仓库名
    'userStore',
    {
        // 状态
        state: () => ({
            token: '',
            user: {
                username: '',
                password: ''
            }
        }),
        // 计算属性
        getters: {
            getUsername: (state) => state.user.username,
            getPassword: (state) => state.user.password
        },
        // 方法
        actions: {
            // 登录
            login(username, password) {
                return new Promise((resolve, reject) => {
                    login(username, password).then(res => {
                        console.log('登录成功', res.data.data);
                        this.setToken(res.data.data.token);
                        this.saveUser(username, password);
                        resolve();
                    }).catch(error => {
                        console.log('登录失败', error);
                        reject(error);
                    });
                });
            },
            //注册
            register(username, password) {
                return new Promise((resolve, reject) => {
                    register(username, password).then(res => {
                        console.log('注册成功', res.data.data);
                        resolve();
                    }).catch(error => {
                        console.log('注册失败', error);
                        reject(error);
                    });
                });
            },
            // 退出系统
            logOut() {
                this.removeToken();
                this.removeUser();
            },
            setUsername(newUsername) {
                this.user.username = newUsername;
            },
            // 设置 Token
            setToken(newToken) {
                this.token = newToken;
            },
            // 获取 Token
            getToken() {
                return this.token;
            },
            // 移除 Token
            removeToken() {
                this.token = '';
            },
            // 保存用户信息
            saveUser(username, password) {
                this.user = { username, password };
            },
            // 移除用户信息
            removeUser() {
                this.user = { username: '', password: '' };
            }
        },
        // 持久化
        persist: true
    }
);