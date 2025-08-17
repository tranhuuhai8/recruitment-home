<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue'
import { INITIAL_FORGOT_PASSWORD, rulesForgotPassword } from './shared'
import { useRouter } from 'vue-router'
import i18n from '@/lang'
import { useAuthStore } from '@/stores'
import { notify, STATUS_CODE_SUCCESS, trim } from '@/libs'
import type { FormInstance } from 'ant-design-vue'
import type { ForgotPasswordDto } from '@/interface'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

const { t } = i18n
const loading = ref(false)
const formRef = ref<FormInstance>()
const router = useRouter()
const authStore = useAuthStore()
const formState = reactive<ForgotPasswordDto>({ ...INITIAL_FORGOT_PASSWORD })

const onFinish = async (values: ForgotPasswordDto) => {
    try {
        loading.value = true
        const { status_code, message } = await authStore.forgotPassword(values)

        if (status_code === STATUS_CODE_SUCCESS) {
            notify(t('auth.notify.forgot_password.success'), '', 'success')
            return router.push({ name: 'reset-password' })
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
    <div class="box-auth change-password">
        <div class="back-to-home" @click="() => router.push({ name: 'login' })">
            <ArrowLeftOutlined />
        </div>
        <h1 class="title">{{ t('auth.forgot_password') }}</h1>
        <a-form
            class="form-auth form-change-password"
            ref="formRef"
            layout="vertical"
            :model="formState"
            :label-col="{ span: 12 }"
            :wrapper-col="{ span: 24 }"
            :rules="rulesForgotPassword"
            @finish="onFinish"
        >
            <a-form-item
                name="mail_address"
                :label="t('auth.labels.mail_address')"
            >
                <a-input
                    v-model:value="formState.mail_address"
                    :placeholder="t('auth.labels.mail_address')"
                    @blur="trim('mail_address', formState)"
                />
            </a-form-item>

            <a-button
                :loading="loading"
                type="primary"
                html-type="submit"
                class="btn-auth mt-15"
            >
                {{ t('submit') }}
            </a-button>
        </a-form>
    </div>
</template>
