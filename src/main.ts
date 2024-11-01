import { createApp } from 'vue'
import App from '@/views/App.vue'
import store from '@/store/index.js'
import router from '@/router/index.js'
import './assets/main.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
