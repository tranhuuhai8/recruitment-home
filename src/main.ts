import './assets/scss/main.scss'
import i18n from '@/lang/index'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import {
    TableDataVue,
    ModalVue,
    ModalDelete,
    UploadImg,
    TreeSelect,
} from '@/components/common'
import App from './App.vue'
import router from './router'
import Vue3Marquee from 'vue3-marquee'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(i18n)
app.use(Antd)
app.use(createPinia())
app.use(router)
app.use(Vue3Marquee)

app.component('TableData', TableDataVue)
app.component('UploadImg', UploadImg)
app.component('ModalVue', ModalVue)
app.component('ModalDelete', ModalDelete)
app.component('TreeSelect', TreeSelect)

app.mount('#app')
