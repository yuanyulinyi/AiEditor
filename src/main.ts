import { createApp } from 'vue'
declare const require: any
const App = require('@/views/App.vue')
const store = require('@/store/index')
const router = require('@/router/index')
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
