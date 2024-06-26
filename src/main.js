import Antd from '../node_modules/ant-design-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(Antd).mount('#app')
