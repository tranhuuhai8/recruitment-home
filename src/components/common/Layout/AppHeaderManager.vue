<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { useRouter } from 'vue-router'
import { getInfoUser, notify } from '@/libs'
import { ref, onMounted } from 'vue'
import {
    HomeOutlined,
    BellOutlined,
    LogoutOutlined,
} from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores'
import Logo from '@/assets/imgs/logo.png'

const { t } = useI18n()
const router = useRouter()
const isLogin = ref()
const authStore = useAuthStore()

onMounted(async () => {
    isLogin.value = !!getInfoUser()
})

const handleLogout = async () => {
    const messageLogout = await authStore.logout()
    if (messageLogout) {
        notify(messageLogout, '', 'success')
        router.push({ name: 'login', replace: true })

        return
    }

    notify(t('notify.error'), '', 'error')
}
</script>

<template>
    <a-row justify="space-between" align="middle" class="header-manager">
        <a-col>
            <img class="logo" :src="Logo" />
        </a-col>
        <a-col class="col-icon">
            <HomeOutlined @click="() => router.push({ name: 'home' })" />
            <BellOutlined />
            <LogoutOutlined @click="handleLogout" />
        </a-col>
    </a-row>
</template>
