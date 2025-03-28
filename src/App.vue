<script setup lang="ts">
import LayoutVue from '@/components/common/LayoutVue.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { ROUTER_AUTH } from './libs/constants/constants'

const config = {
    token: {
        colorPrimary: '#d98600',
        borderRadius: 5,
        fontFamily: 'Noto Sans JP',
    },
}
const route = useRoute()
const authStore = useAuthStore()
const isLogin = ref(authStore.isAuthenticated)
const router = useRouter()

authStore.$subscribe((mutations, state) => {
    isLogin.value = !!state.token
    if (
        !authStore.isAuthenticated &&
        !ROUTER_AUTH.includes((route.name as string) || '')
    ) {
        router.push({ name: 'login' })
    }
})

onMounted(() => {
    if (!localStorage.getItem('access_token')) {
        isLogin.value = false
    }
})

watch(
    () => route.name,
    (newName) => {
        if (ROUTER_AUTH.includes(newName as string)) {
            isLogin.value = false
        } else {
            isLogin.value = authStore.isAuthenticated
        }
    }
)
</script>

<template>
    <a-config-provider :theme="config" :autoInsertSpaceInButton="false">
        <LayoutVue v-if="isLogin" class="container-main">
            <router-view />
        </LayoutVue>
        <template v-else>
            <router-view />
        </template>
    </a-config-provider>
</template>
