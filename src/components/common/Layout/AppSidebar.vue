<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { getInfoUser, ROLE_APPLICANT, SIDEBAR_BY_ROLE } from '@/libs'
import { reactive, ref, h, VueElement, onMounted } from 'vue'
import * as Icons from '@/components/icons'

const router = useRouter()
const route = useRoute()
const items: ItemType[] = reactive([])
const selectedKeys = ref<string[]>([])

const handleRoute = async () => {
    const menus = SIDEBAR_BY_ROLE[getInfoUser()?.role ?? ROLE_APPLICANT]
    for (const key in menus) {
        const item = menus[key]
        items.push(
            getItem(
                item.label,
                String(item.order),
                h(getIcon(item.order)),
                item.menu_childs.length ? item.menu_childs : null
            )
        )
        if (route.name === item.name)
            selectedKeys.value.push(String(item.order))
    }
}

const getItem = (
    label: VueElement | string,
    key: string,
    icon: any,
    children: ItemType[],
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
            return Icons.IconSupport
        case 3:
            return Icons.IconEcosystem
        case 4:
            return Icons.IconCommunity
        case 5:
            return Icons.IconDocumentation
        default:
            return Icons.IconTooling
    }
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
    const side: any = Object.values(
        SIDEBAR_BY_ROLE[getInfoUser()?.role ?? ROLE_APPLICANT]
    ).find(
        (item: any) =>
            String(item.order) === e.key || item.order === e.item?.orderParent
    )

    if (side) {
        const sideNew = side.menu_childs.length
            ? side.menu_childs.find(
                  (child: Record<string, any>) => child.order === e.item?.order
              )
            : side
        sideNew && router.push({ name: sideNew.route })
    }

    selectedKeys.value.splice(0, 1, String(side?.order))
}

onMounted(async () => {
    await router.isReady()
    await handleRoute()
})
</script>

<template>
    <a-menu
        class="sidebar-menu"
        :items="items"
        mode="inline"
        :selectedKeys="selectedKeys"
        @click="handleMenuClick"
    />
</template>
