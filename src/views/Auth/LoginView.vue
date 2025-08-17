<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { INITIAL_LOGIN, rulesLogin } from './shared'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { STATUS_CODE_SUCCESS, getRouterDashboard, notify } from '@/libs'
import i18n from '@/lang'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import AuthForm from './components/AuthForm.vue'
import type { LoginDto } from '@/interface'

const loading = ref(false)
const { t } = i18n
const router = useRouter()
const authStore = useAuthStore()
const formState = reactive<LoginDto>({ ...INITIAL_LOGIN })

const onFinish = async (values: LoginDto) => {
    try {
        loading.value = true
        const { status_code, message } = await authStore.login(
            values,
            values.role
        )

        if (status_code === STATUS_CODE_SUCCESS) {
            notify(message, '', 'success')
            return router.push({ name: getRouterDashboard() })
        }
        notify(message, '', 'error')
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="box-auth">
        <div class="back-to-home" @click="() => router.push({ name: 'home' })">
            <ArrowLeftOutlined />
        </div>
        <h1 class="title">{{ t('auth.login') }}</h1>
        <AuthForm
            :is-login="true"
            :loading="loading"
            :rules="rulesLogin"
            :form-state="formState"
            @finish="onFinish"
        />
        <div class="suggest-auth">
            {{ t('auth.btn.suggest_register') }}
            <span @click="() => router.push({ name: 'register' })">
                {{ t('auth.register') }}
            </span>
        </div>
    </div>
</template>
