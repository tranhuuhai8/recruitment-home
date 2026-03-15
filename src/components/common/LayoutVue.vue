<script lang="ts" setup>
import { ref, watch } from 'vue'
import { AppHeaderHomepage, AppFooterVue, AppSidebarVue } from '.'
import { useRoute } from 'vue-router'
import {
    PAGE_NOT_FOUND,
    ROUTE_CHANGE_PASSWORD,
    ROUTE_PATH_MANAGER,
    ROUTER_AUTH,
} from '@/libs'

const isRouteAuth = ref()
const isRouteManager = ref()
const isRouteNotFound = ref()
const loading = ref(true)
const route = useRoute()

const checkRoute = async () => {
    isRouteManager.value =
        ROUTE_PATH_MANAGER.some((prefix) =>
            route.path.startsWith(`/${prefix}`)
        ) || route.name === ROUTE_CHANGE_PASSWORD
    isRouteAuth.value =
        ROUTER_AUTH.includes(String(route.name)) &&
        route.name !== ROUTE_CHANGE_PASSWORD
    isRouteNotFound.value = route.name === PAGE_NOT_FOUND
}

watch(route, async () => {
    await checkRoute()
    loading.value = false
})
</script>

<template>
    <div v-if="!loading">
        <a-layout class="ant-layout-body" v-if="isRouteAuth || isRouteNotFound">
            <a-layout-content>
                <slot />
            </a-layout-content>
        </a-layout>
        <a-layout class="ant-layout-body" v-else-if="isRouteManager">
            <div class="content-manager">
                <AppSidebarVue />
                <a-layout-content>
                    <slot />
                </a-layout-content>
            </div>
        </a-layout>
        <a-layout class="ant-layout-body" v-else>
            <AppHeaderHomepage />
            <a-layout-content>
                <slot />
            </a-layout-content>
            <AppFooterVue />
        </a-layout>
    </div>
    <a-spin v-else :spinning="loading" class="spin-full spin-up-size"></a-spin>
</template>
