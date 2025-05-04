<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
    AppHeaderHomepage,
    AppFooterVue,
    AppSidebarVue,
    AppHeaderManager,
} from '.'
import { useRoute } from 'vue-router'
import { ROUTE_PATH_MANAGER, ROUTER_AUTH } from '@/libs'

const isRouteAuth = ref()
const isRouteManager = ref()
const route = useRoute()

watch(route, () => {
    isRouteManager.value = ROUTE_PATH_MANAGER.some((prefix) =>
        route.path.startsWith(`/${prefix}`)
    )

    isRouteAuth.value = ROUTER_AUTH.includes(String(route.name))
})
</script>

<template>
    <a-layout class="ant-layout-body" v-if="isRouteAuth">
        <a-layout-content>
            <slot />
        </a-layout-content>
    </a-layout>
    <a-layout class="ant-layout-body" v-if="isRouteManager">
        <AppHeaderManager />
        <div class="content-manager">
            <AppSidebarVue />
            <a-layout-content>
                <slot />
            </a-layout-content>
        </div>
    </a-layout>
    <a-layout class="ant-layout-body" v-if="!isRouteAuth && !isRouteManager">
        <AppHeaderHomepage />
        <a-layout-content>
            <slot />
        </a-layout-content>
        <AppFooterVue />
    </a-layout>
</template>
