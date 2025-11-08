<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { reactive, ref, h, VueElement, onMounted } from 'vue'
import * as Icons from '@/components/icons'
import { useAuthStore } from '@/stores'
import {
    getUserInformation,
    ROLE_APPLICANT,
    SIDEBAR_BY_ROLE,
    notify,
} from '@/libs'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import Logo from '@/assets/imgs/logo.png'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const items: ItemType[] = reactive([])
const selectedKeys = ref<string[]>([])
const collapsed = ref(false)

const handleRoute = async () => {
    const menus = SIDEBAR_BY_ROLE[getUserInformation()?.role ?? ROLE_APPLICANT]
    for (const key in menus) {
        const item = menus[key]
        items.push(
            getItem(item.label, String(item.order), h(getIcon(item.name)))
        )
        if (route.name === item.route)
            selectedKeys.value.push(String(item.order))
    }
}

const getItem = (
    label: VueElement | string,
    key: string,
    icon: any,
    children?: ItemType[],
    type?: 'group'
): ItemType =>
    ({
        key,
        icon,
        children,
        label,
        type,
    }) as ItemType

const roleIconMap: Record<string, Record<string, any>> = {
    1: {
        companies: Icons.IconCompany,
        applicants: Icons.IconUser,
        jobs: Icons.IconJob,
        reviews: Icons.IconFeedback,
        masterData: Icons.IconData,
    },
    2: {
        info: Icons.IconUser,
        jobs: Icons.IconJob,
        applications: Icons.IconInfo,
    },
    3: {
        info: Icons.IconUser,
        fileUpload: Icons.IconUploadFile,
        applied: Icons.IconJob,
    },
}

const getIcon = (name: string) => {
    const role = getUserInformation()?.role ?? ROLE_APPLICANT

    switch (name) {
        case 'dashboard':
            return Icons.IconDashboard
        case 'home':
            return Icons.IconHome
        case 'changePassword':
            return Icons.IconKey
        case 'logout':
            return Icons.IconLogout
        default:
            return roleIconMap[role]?.[name] ?? Icons.IconCompany
    }
}

const handleLogout = async () => {
    const messageLogout = await authStore.logout()
    if (!messageLogout) {
        return notify(t('notify.error'), '', 'error')
    }

    router.push({ name: 'login', replace: true })
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
    const side: any = Object.values(
        SIDEBAR_BY_ROLE[getUserInformation()?.role ?? ROLE_APPLICANT]
    ).find((item: any) => String(item.order) === e.key)

    if (side?.route === 'logout') {
        return handleLogout()
    }

    side && router.push({ name: side.route })
    selectedKeys.value.splice(0, 1, String(side?.order))
}

const toggleCollapsed = () => (collapsed.value = !collapsed.value)

onMounted(async () => {
    await router.isReady()
    await handleRoute()
})
</script>

<template>
    <div id="sidebar">
        <div class="logo" @click="() => router.push({ name: 'home' })">
            <img :src="Logo" alt="Logo sidebar" />
        </div>
        <a-menu
            class="sidebar-menu"
            :class="`${collapsed ? 'sp' : 'pc'}`"
            :items="items"
            mode="inline"
            :selectedKeys="selectedKeys"
            :inline-collapsed="collapsed"
            @click="handleMenuClick"
        />
        <a-button type="primary" class="btn-collapsed" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
    </div>
</template>
