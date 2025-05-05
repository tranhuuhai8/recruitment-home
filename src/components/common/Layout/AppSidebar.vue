<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { getInfoUser, ROLE_APPLICANT, SIDEBAR_BY_ROLE } from '@/libs'
import { reactive, ref, h, VueElement, onMounted } from 'vue'
import * as Icons from '@/components/icons'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()
const items: ItemType[] = reactive([])
const selectedKeys = ref<string[]>([])
const collapsed = ref(false)

const handleRoute = async () => {
    const menus = SIDEBAR_BY_ROLE[getInfoUser()?.role ?? ROLE_APPLICANT]
    for (const key in menus) {
        const item = menus[key]
        items.push(
            getItem(item.label, String(item.order), h(getIcon(item.order)))
        )
        if (route.name === item.name)
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

const getIcon = (order: number) => {
    switch (order) {
        case 1:
            return Icons.IconHome
        case 2:
            return Icons.IconCompany
        case 3:
            return Icons.IconUser
        case 4:
            return Icons.IconJob
        case 5:
            return Icons.IconFeedback
        case 6:
            return Icons.IconData
        case 7:
            return Icons.IconCategory
        case 8:
            return Icons.IconCity
        default:
            return Icons.IconCompany
    }
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
    const side: any = Object.values(
        SIDEBAR_BY_ROLE[getInfoUser()?.role ?? ROLE_APPLICANT]
    ).find((item: any) => String(item.order) === e.key)

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
