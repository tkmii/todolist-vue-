import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import '@/styles/reset.css'
import '@/styles/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')