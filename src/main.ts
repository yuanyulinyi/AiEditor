import { createApp } from 'vue'

import pinia from '@/stores/index'
import App from './views/App.vue'

import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
