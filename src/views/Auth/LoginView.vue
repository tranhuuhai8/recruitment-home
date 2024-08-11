<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue'
import { INITIAL_LOGIN } from './shared'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import { STATUS_CODE_SUCCESS, getRouterName, notify, trim } from '@/libs'
import i18n from '@/lang'
import type { FormInstance } from 'ant-design-vue'

const loading = ref(false)
const formRef = ref<FormInstance>()
const { t } = i18n
const router = useRouter()
const authStore = useAuthStore()
const formState = reactive<any>({ ...INITIAL_LOGIN })

const onFinish = async (values: any) => {
    loading.value = true
    const { status_code, message } = await authStore.login(values, 'applicant')
    loading.value = false
    if (status_code === STATUS_CODE_SUCCESS) {
        notify(message, '', 'success')
        return router.push({ name: getRouterName() })
    }
    notify(message, '', 'error')
}

onUnmounted(() => formRef.value?.resetFields())
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <h1>{{ t('login') }}</h1>
            </div>
            <a-row justify="center">
                <a-form
                    class="login-form"
                    name="login_form"
                    ref="formRef"
                    :model="formState"
                    layout="vertical"
                    @finish="onFinish"
                    autocomplete="off"
                >
                    <a-form-item name="mail_address">
                        <a-input
                            class="login-input"
                            v-model:value="formState.mail_address"
                            :placeholder="t('mail_address')"
                            @blur="trim('mail_address', formState)"
                        />
                    </a-form-item>
                    <a-form-item name="password">
                        <a-input-password
                            class="login-input"
                            v-model:value="formState.password"
                            type="password"
                            :placeholder="t('password')"
                            @blur="trim('password', formState)"
                        />
                    </a-form-item>
                    <div
                        class="forgot-password"
                        @click="() => router.push('/login')"
                    >
                        <a-button type="link">
                            {{ t('forgot_password') }}</a-button
                        >
                    </div>
                    <a-button
                        :loading="loading"
                        type="primary"
                        html-type="submit"
                        class="login-button"
                    >
                        {{ t('login') }}
                    </a-button>
                </a-form>
            </a-row>
        </div>
    </div>
</template>
