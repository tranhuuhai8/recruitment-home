<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'
import Avatar from '@/assets/imgs/avatar.png'
import { APP_SIDEBAR, getInfoUser } from '@/libs'
import { reactive, ref, VueElement, onMounted } from 'vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const username = ref()
const isLogin = ref()
const items: ItemType[] = reactive([])
const selectedKeys = ref<string[]>([])

const handleRoute = async () => {
    for (const key in APP_SIDEBAR) {
        const item = APP_SIDEBAR[key]
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
    const side: any = Object.values(APP_SIDEBAR).find(
        (item: any) => String(item.order) === e.key
    )
    if (side) router.push(side.route)
    selectedKeys.value.splice(0, 1, String(side?.order))
}

const handleClick: MenuProps['onClick'] = async (e) => {
    const { key } = e
    if (key == '1') {
        authStore.token = null
        localStorage.clear()
        onLogin()
        // const data = await authStore.logout()
        // data && onLogin()
    }
}

const onLogin = () => router.push({ name: 'login', replace: true })

onMounted(async () => {
    await router.isReady()
    await handleRoute()
    username.value = getInfoUser()?.name
    isLogin.value = !!getInfoUser()
})
</script>

<template>
    <a-row justify="space-between" align="middle" class="header">
        <a-col>
            <h1 class="header-logo">{{ t('title') }}</h1>
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
                <a-row justify="space-between" align="middle">
                    <img class="avatar" :src="Avatar" />
                    <span> {{ username }} </span>
                </a-row>
                <template #overlay>
                    <a-menu @click="handleClick">
                        <a-menu-item key="1">
                            {{ t('logout') }}
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <a-button v-if="!isLogin" @click="onLogin">
                {{ t('login') }}
            </a-button>
        </a-col>
    </a-row>
</template>
