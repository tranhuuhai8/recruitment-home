<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import type { MenuProps, ItemType } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'
import Avatar from '@/assets/imgs/avatar.png'
import { APP_HEADER, getRolePathMap, notify, getAvatarUser } from '@/libs'
import { reactive, ref, VueElement, onMounted } from 'vue'
import Logo from '@/assets/imgs/logo.png'
import { KEY_LOGOUT } from '@/libs'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
import { computed } from 'vue'
const isLogin = computed(() => authStore.isAuthenticated)
const isShowNavMobile = ref(false)
const items = reactive<ItemType[]>([])
const itemsMobile = reactive<ItemType[]>([])
const selectedKeys = ref<string[]>([])

const handleRoute = async () => {
    isLogin.value && itemsMobile.push(getItem(t('header.management'), '0'))
    for (const key in APP_HEADER) {
        const item = APP_HEADER[key]
        items.push(getItem(item.label, String(item.order)))
        itemsMobile.push(getItem(item.label, String(item.order)))
        if (route.name === item.name)
            selectedKeys.value.push(String(item.order))
    }
    isLogin.value &&
        itemsMobile.push(getItem(t('header.logout'), String(KEY_LOGOUT)))

    !isLogin.value && itemsMobile.push(getItem(t('auth.login'), '0'))
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

const handleClick = async (e: any, isMobile: Boolean = false) => {
    if ((e.key == '1' && !isMobile) || !+e.key) {
        router.push({ name: `${getRolePathMap()}-dashboard` })
        return
    }

    if ((e.key == '2' && !isMobile) || +e.key === KEY_LOGOUT) {
        const messageLogout = await authStore.logout()
        if (!messageLogout) {
            return notify(t('notify.error'), '', 'error')
        }

        return redirectToLogin()
    }

    handleMenuClick(e)
}

const redirectToLogin = () => router.push({ name: 'login', replace: true })
const redirectToHome = () => router.push({ name: 'home' })

onMounted(async () => {
    await router.isReady()
    await handleRoute()
})
</script>

<template>
    <a-row justify="space-between" align="middle" class="header">
        <a-col @click="redirectToHome">
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
                <img class="avatar" :src="getAvatarUser() ?? Avatar" />
                <template #overlay>
                    <a-menu @click="handleClick" class="drop-down-header">
                        <a-menu-item key="1">
                            {{ t('header.management') }}
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

        <div
            :class="`icon-nav-mobile ${isShowNavMobile ? 'open' : ''}`"
            @click="isShowNavMobile = !isShowNavMobile"
        >
            <span class="line"></span>
            <span class="line"></span>
        </div>
        <div
            :class="`nav-mobile ${isShowNavMobile ? 'active' : ''}`"
            v-if="items"
        >
            <a-menu
                class="header-menu-mobile"
                :items="itemsMobile"
                :selectedKeys="selectedKeys"
                @click="(e: any) => handleClick(e, true)"
            />
        </div>
    </a-row>
</template>
