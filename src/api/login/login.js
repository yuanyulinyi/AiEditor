import request from '@/utils/request'

// 登录方法
export function login(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: '/login',
        headers: {
            isToken: false,//该请求不必验证token
            repeatSubmit: false//不允许多次提交
        },
        method: 'post',
        data: data
    })
}

// 注册方法
export function register(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: '/register',
        headers: {
            isToken: false,//该请求不必验证token
            repeatSubmit: false//不允许多次提交
        },
        method: 'post',
        data: data
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}