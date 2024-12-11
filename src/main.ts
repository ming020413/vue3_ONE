import '@/assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/router/permission'

/* 懒加载 */
import { Lazyload } from 'vant';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Lazyload)

app.mount('#app')
