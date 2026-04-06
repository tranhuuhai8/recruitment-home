<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, h, VueElement, onMounted, watch } from 'vue'
import type { MenuProps, ItemType } from 'ant-design-vue'
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
        if (item.menu_childs && !!item.menu_childs.length) {
            const children: ItemType[] = item.menu_childs.map((child: any) =>
                getItem(
                    child.label,
                    String(child.order),
                    h(getIcon(child.name))
                )
            )
            items.push(
                getItem(
                    item.label,
                    String(item.order),
                    h(getIcon(item.name)),
                    children
                )
            )
            const matchedChild = item.menu_childs.find(
                (child: Record<string, any>) => route.name === child.route
            )
            if (matchedChild) {
                selectedKeys.value.push(String(matchedChild.order))
            }
        } else {
            items.push(
                getItem(item.label, String(item.order), h(getIcon(item.name)))
            )
            if (route.name === item.route)
                selectedKeys.value.push(String(item.order))
        }
    }
}

const updateSelectedKeys = (routeName: string) => {
    selectedKeys.value = []
    const menus = SIDEBAR_BY_ROLE[getUserInformation()?.role ?? ROLE_APPLICANT]

    const currentMeta = route.meta as Record<string, any>
    const parentRoute = currentMeta?.parentRoute as string | undefined

    for (const key in menus) {
        const item = menus[key]
        if (item.route === routeName) {
            selectedKeys.value = [String(item.order)]
            break
        }
        if (item.menu_childs && item.menu_childs.length) {
            const matchedChild = item.menu_childs.find(
                (child: any) =>
                    child.route === routeName ||
                    (parentRoute && child.route === parentRoute)
            )
            if (matchedChild) {
                selectedKeys.value = [String(matchedChild.order)]
                break
            }
        }
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
        contactGroup: Icons.IconFeedback,
        contact: Icons.IconInfo,
        mailTemplate: Icons.IconCopy,
        mailLog: Icons.IconData,
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
    const allMenus =
        SIDEBAR_BY_ROLE[getUserInformation()?.role ?? ROLE_APPLICANT]

    // Search in top-level items first
    let side: any = Object.values(allMenus).find(
        (item: any) => String(item.order) === e.key
    )

    // If not found, search in menu_childs
    if (!side) {
        for (const item of Object.values(allMenus) as any[]) {
            if (item.menu_childs && item.menu_childs.length > 0) {
                const child = item.menu_childs.find(
                    (c: any) => String(c.order) === e.key
                )
                if (child) {
                    side = child
                    break
                }
            }
        }
    }

    if (side?.route === 'logout') {
        return handleLogout()
    }

    if (side?.route) {
        router.push({ name: side.route })
    }
}

const toggleCollapsed = () => (collapsed.value = !collapsed.value)

onMounted(async () => {
    await router.isReady()
    await handleRoute()
})

watch(
    () => route.name,
    (newRouteName) => {
        updateSelectedKeys(String(newRouteName))
    },
    { immediate: true }
)
</script>

<template>
    <div id="sidebar">
        <div class="logo" @click="() => router.push({ name: 'home' })">
            <img :src="Logo" alt="Logo sidebar" />
        </div>
        <a-menu
            mode="inline"
            class="sidebar-menu"
            :class="`${collapsed ? 'sp' : 'pc'}`"
            :items="items"
            v-model:selectedKeys="selectedKeys"
            :inline-collapsed="collapsed"
            @click="handleMenuClick"
        />
        <a-button type="primary" class="btn-collapsed" @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
        </a-button>
    </div>
</template>
