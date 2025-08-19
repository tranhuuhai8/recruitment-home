<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'
import Avatar from '@/assets/imgs/avatar.png'
import { APP_HEADER, getUserInformation, getRolePathMap, notify } from '@/libs'
import { reactive, ref, VueElement, onMounted } from 'vue'
import Logo from '@/assets/imgs/logo.png'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isLogin = ref()
const items: ItemType[] = reactive([])
const selectedKeys = ref<string[]>([])

const handleRoute = async () => {
    for (const key in APP_HEADER) {
        const item = APP_HEADER[key]
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
    const side: any = Object.values(APP_HEADER).find(
        (item: any) => String(item.order) === e.key
    )
    if (side) router.push({ name: side.name })
    selectedKeys.value.splice(0, 1, String(side?.order))
}

const handleClick: MenuProps['onClick'] = async (e) => {
    if (e.key == '1') {
        router.push({ name: `${getRolePathMap()}-dashboard` })
        return
    }

    if (e.key == '2') {
        const messageLogout = await authStore.logout()
        if (messageLogout) {
            notify(messageLogout, '', 'success')
            redirectToLogin()
            return
        }

        notify(t('notify.error'), '', 'error')
    }
}

const redirectToLogin = () => router.push({ name: 'login', replace: true })

onMounted(async () => {
    await router.isReady()
    await handleRoute()
    isLogin.value = !!getUserInformation()
})
</script>

<template>
    <a-row justify="space-between" align="middle" class="header">
        <a-col>
            <img :src="Logo" alt="" class="header-logo" />
        </a-col>
        <a-col>
            <a-menu
                class="header-menu"
                :items="items"
                :selectedKeys="selectedKeys"
                @click="handleMenuClick"
            />
        </a-col>
        <a-col class="header-auth">
            <a-dropdown :placement="'bottomRight'" v-if="isLogin">
                <img class="avatar" :src="Avatar" />
                <template #overlay>
                    <a-menu @click="handleClick" class="drop-down-header">
                        <a-menu-item key="1">
                            {{ t('header.account') }}
                        </a-menu-item>
                        <a-menu-item key="2">
                            {{ t('header.logout') }}
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <a-button v-else @click="redirectToLogin()">
                {{ t('auth.login') }}
            </a-button>
        </a-col>
    </a-row>
</template>
