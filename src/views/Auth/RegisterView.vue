<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getRuleRegister, INITIAL_REGISTER } from './shared'
import { useRouter } from 'vue-router'
import i18n from '@/lang'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import AuthForm from './components/AuthForm.vue'
import { useAuthStore } from '@/stores'
import { notify, STATUS_CODE_SUCCESS } from '@/libs'

const loading = ref(false)
const { t } = i18n
const router = useRouter()
const authStore = useAuthStore()
const formState = reactive<any>({ ...INITIAL_REGISTER })

const onFinish = async (values: Record<string, any>) => {
    try {
        loading.value = true
        const { status_code, message } = await authStore.register(
            values,
            values.role
        )

        if (status_code === STATUS_CODE_SUCCESS) {
            notify(message, '', 'success')
            return router.push({ name: 'login' })
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
    <div class="box-auth register">
        <div class="back-to-home" @click="() => router.push({ name: 'home' })">
            <ArrowLeftOutlined />
        </div>
        <h1 class="title">{{ t('auth.register') }}</h1>
        <AuthForm
            :is-login="false"
            :loading="loading"
            :form-state="formState"
            :rules="getRuleRegister(formState)"
            @finish="onFinish"
        />

        <div class="suggest-auth">
            {{ t('auth.btn.suggest_login') }}
            <span @click="() => router.push('/auth/login')">
                {{ t('auth.login') }}
            </span>
        </div>
    </div>
</template>
