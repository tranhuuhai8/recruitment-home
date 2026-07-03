<script setup lang="ts">
import LayoutVue from '@/components/common/LayoutVue.vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useFavoritesStore } from '@/stores'

const config = {
    token: {
        colorPrimary: '#0d9488',
        colorInfo: '#0284c7',
        colorSuccess: '#059669',
        colorWarning: '#d97706',
        colorError: '#dc2626',
        borderRadius: 10,
        fontFamily:
            "'Plus Jakarta Sans', 'Noto Sans JP', system-ui, sans-serif",
        controlHeight: 40,
    },
}
const route = useRoute()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const router = useRouter()

onMounted(() => {
    if (authStore.isAuthenticated) {
        favoritesStore.hydrate()
    }
})

authStore.$subscribe(() => {
    // hydrate saved/followed when logging in
    if (authStore.isAuthenticated) {
        favoritesStore.hydrate()
    }
    if (!authStore.isAuthenticated && route.meta.requiresAuth) {
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
