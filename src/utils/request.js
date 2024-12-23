import axios from 'axios'
//import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://localhost:8080'

const instance = axios.create({
    // TODO 1. 基础地址，超时时间
    baseURL,
    timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // TODO 2. 携带token
        const { getToken } = useUserStore()
        const token = getToken()
        if (token) {
            // 判断用户是否登录  若登录，则修改请求头携带token
            config.headers.token = token
        }
        return config
    },
    (err) => Promise.reject(err)
)

// 添加响应拦截器
instance.interceptors.response.use(
    (res) => {
        // 二进制数据则直接返回
        if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
            return Promise.resolve(res)
        }
        if (res.data.code === 200) {
            console.log('ok')
            // code值为200 时视为成功
            return Promise.resolve(res)
        }
        // TODO 3. 处理业务失败
        console.log('x')
        ElMessage.error(res.data.msg || '服务异常')
        return Promise.reject(res.data)
    },
    (err) => {
        // TODO 5. 处理401错误
        if (err.response?.status === 401) {
            //401权限错误 或 token过期， 跳转登录页
            router.push('/login')
        }

        // TODO 6. 处理默认情况
        ElMessage.error(err.response.data.msg || '服务异常')
        return Promise.reject(err)
    }
)
export default instance
export { baseURL }
