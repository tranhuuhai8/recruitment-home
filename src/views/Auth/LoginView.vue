<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue'
import { INITIAL_LOGIN, ROLE_OPTIONS, rulesLogin } from './shared'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { STATUS_CODE_SUCCESS, getRouterDashboard, notify, trim } from '@/libs'
import i18n from '@/lang'
import type { FormInstance } from 'ant-design-vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

const loading = ref(false)
const formRef = ref<FormInstance>()
const { t } = i18n
const router = useRouter()
const authStore = useAuthStore()
const formState = reactive<any>({ ...INITIAL_LOGIN })

const onFinish = async (values: Record<string, any>) => {
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

onUnmounted(() => formRef.value?.resetFields())
</script>

<template>
    <div class="box-auth">
        <div class="back-to-home" @click="() => router.push({ name: 'home' })">
            <ArrowLeftOutlined />
        </div>
        <h1 class="title">{{ t('auth.login') }}</h1>
        <a-form
            class="form-auth form-login"
            name="login_form"
            ref="formRef"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 19 }"
            layout="vertical"
            :model="formState"
            :rules="rulesLogin"
            @finish="onFinish"
            autocomplete="off"
        >
            <a-form-item
                name="mail_address"
                :label="t('auth.label.mail_address')"
            >
                <a-input
                    v-model:value="formState.mail_address"
                    :placeholder="t('auth.label.mail_address')"
                    @blur="trim('mail_address', formState)"
                />
            </a-form-item>
            <a-form-item name="password" :label="t('auth.label.password')">
                <a-input-password
                    v-model:value="formState.password"
                    type="password"
                    :placeholder="t('auth.label.password')"
                    @blur="trim('password', formState)"
                />
            </a-form-item>
            <a-form-item name="role" :label="t('auth.label.role')">
                <a-select
                    ref="select"
                    v-model:value="formState.role"
                    style="width: 120px"
                    :options="ROLE_OPTIONS"
                />
            </a-form-item>
            <a-button type="link" @click="() => router.push('/auth/login')">
                {{ t('auth.forgot_password') }}
            </a-button>
            <a-button
                :loading="loading"
                type="primary"
                html-type="submit"
                class="btn-auth mt-15"
            >
                {{ t('auth.login') }}
            </a-button>
        </a-form>
    </div>
</template>
