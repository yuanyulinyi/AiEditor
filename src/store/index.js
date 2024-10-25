import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(persist)

export default store
export * from './modules/user'