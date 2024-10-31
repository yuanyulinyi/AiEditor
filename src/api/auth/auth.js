import request from '@/utils/request'

// 登录方法
export function authByGithub() {
    return request({
        url: '/login/oauth2/github',
        headers: {
            isToken: false,//该请求不必验证token
            repeatSubmit: false//不允许多次提交
        },
        method: 'get'
    })
}
export function authByGitee() {
    return request({
        url: '/login/oauth2/gitee',
        headers: {
            isToken: false,//该请求不必验证token
            repeatSubmit: false//不允许多次提交
        },
        method: 'get'
    })
}

export function getAuthByCode(code, provider) {
    return request({
        url: `/login/oauth2/code/${provider}?code=${code}`,
        headers: {
            isToken: false, // 该请求不必验证token
            repeatSubmit: false // 不允许多次提交
        },
        method: 'get'
    });
}