<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { AppHeaderVue, AppFooterVue } from '.'
import { getInfoUser } from '@/libs'
import { useRoute } from 'vue-router'

const role = ref()
const isRouteLogin = ref()
const route = useRoute()

watch(route, () => {
    isRouteLogin.value = route.name !== 'login'
    role.value = getInfoUser()?.role
})

onMounted(() => {
    role.value = getInfoUser()?.role
})
</script>

<template>
    <a-layout>
        <a-layout-sider width="240" v-if="route.name !== 'login'">
            <AppSidebarVue />
        </a-layout-sider>
        <a-layout class="ant-layout-body">
            <AppHeaderVue v-if="isRouteLogin" />
            <a-layout-content>
                <slot />
            </a-layout-content>
            <AppFooterVue v-if="isRouteLogin" />
        </a-layout>
    </a-layout>
</template>
