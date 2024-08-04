import './assets/scss/main.scss'
import i18n from '@/lang/index'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import { TableDataVue } from '@/components/common'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(i18n)
app.use(Antd)
app.use(createPinia())
app.use(router)

app.component('TableData', TableDataVue)
app.mount('#app')
