<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { getInfoUser, ROLE_APPLICANT, SIDEBAR_BY_ROLE } from '@/libs'
import { reactive, ref, VueElement, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const items: ItemType[] = reactive([])
const selectedKeys = ref<string[]>([])

const handleRoute = async () => {
    const menus = SIDEBAR_BY_ROLE[getInfoUser()?.role ?? ROLE_APPLICANT]
    for (const key in menus) {
        const item = menus[key]
        items.push(getItem(item.label, String(item.order)))
        if (route.name === item.name)
            selectedKeys.value.push(String(item.order))
    }
}

const getItem = (
    label: VueElement | string,
    key: string,
    icon?: any,
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

const handleMenuClick: MenuProps['onClick'] = (e) => {
    const side: any = Object.values(
        SIDEBAR_BY_ROLE[getInfoUser()?.role ?? ROLE_APPLICANT]
    ).find((item: any) => String(item.order) === e.key)
    if (side) router.push(side.route)
    selectedKeys.value.splice(0, 1, String(side?.order))
}

onMounted(async () => {
    await router.isReady()
    await handleRoute()
})
</script>

<template>
    <a-menu
        class="header-menu"
        :items="items"
        :selectedKeys="selectedKeys"
        @click="handleMenuClick"
    />
</template>
