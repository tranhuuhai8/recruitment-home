<script setup lang="ts">
import LayoutVue from '@/components/common/LayoutVue.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { ROUTER_AUTH } from './libs'

const config = {
    token: {
        colorPrimary: '#d98600',
        borderRadius: 5,
        fontFamily: 'Noto Sans JP',
    },
}
const route = useRoute()
const authStore = useAuthStore()
const router = useRouter()

authStore.$subscribe((mutations: any, state: any) => {
    if (
        !authStore.isAuthenticated &&
        !ROUTER_AUTH.includes((route.name as string) || '')
    ) {
        router.push({ name: 'login' })
    }
})
</script>

<template>
    <a-config-provider :theme="config" :autoInsertSpaceInButton="false">
        <LayoutVue>
            <router-view />
        </LayoutVue>
    </a-config-provider>
</template>
