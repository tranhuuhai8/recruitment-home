<script setup lang="ts">
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, VueElement, h, onMounted, watch } from 'vue'
import { IconSupport } from '@/components/icons/'
import { APP_SIDEBAR } from '@/libs'

const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([])
const items: ItemType[] = reactive([])

const handleRoute = async () => {
    for (const key in APP_SIDEBAR) {
        const item = APP_SIDEBAR[key]
        items.push(
            getItem(item.label, String(item.order), () =>
                h(getIcon(item.order))
            )
        )
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
): ItemType => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as ItemType
}

const handleClick: MenuProps['onClick'] = (e) => {
    const side: any = Object.values(APP_SIDEBAR).find(
        (item: any) => String(item.order) === e.key
    )
    if (side) router.push(side.route)
    selectedKeys.value.splice(0, 1, String(side?.order))
}

const getIcon = (order: number) => {
    switch (order) {
        case 1:
            return IconSupport
        default:
            return IconSupport
    }
}

onMounted(async () => {
    await router.isReady()
    await handleRoute()
})

watch(route, async () => {
    if (APP_SIDEBAR) {
        for (const key in APP_SIDEBAR) {
            const item = APP_SIDEBAR[key]
            if (item.name === route.name) {
                selectedKeys.value = [String(item.order)]
            }
        }
    }
})
</script>

<template>
    <a-menu
        id="sidebar"
        mode="inline"
        :items="items"
        :selectedKeys="selectedKeys"
        @click="handleClick"
    />
</template>
