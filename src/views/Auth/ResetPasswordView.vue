<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue'
import { getRuleResetPassword, INITIAL_RESET_PASSWORD } from './shared'
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/lang'
import { useAuthStore } from '@/stores'
import { notify, STATUS_CODE_SUCCESS, trim } from '@/libs'
import type { FormInstance } from 'ant-design-vue'
import type { ResetPasswordDto } from '@/interface'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

const { t } = i18n
const loading = ref(false)
const formRef = ref<FormInstance>()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const formState = reactive<ResetPasswordDto>({ ...INITIAL_RESET_PASSWORD })

const onFinish = async (values: ResetPasswordDto) => {
    try {
        loading.value = true
        const { status_code, message } = await authStore.resetPassword(
            String(route.query.token),
            {
                ...values,
                mail_address: String(route.query.email),
            }
        )

        if (status_code === STATUS_CODE_SUCCESS) {
            notify(t('auth.notify.change_password.success'), '', 'success')
            return router.push({ name: 'login' })
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
        <h1 class="title">{{ t('auth.reset_password') }}</h1>
        <a-form
            class="form-auth form-reset-password"
            ref="formRef"
            layout="vertical"
            :model="formState"
            :label-col="{ span: 12 }"
            :wrapper-col="{ span: 24 }"
            :rules="getRuleResetPassword(formState)"
            @finish="onFinish"
        >
            <a-form-item name="password" :label="t('auth.labels.password')">
                <a-input-password
                    type="password"
                    v-model:value="formState.password"
                    :placeholder="t('auth.labels.password')"
                    @blur="trim('password', formState)"
                />
            </a-form-item>

            <a-form-item
                name="password_confirmation"
                :label="t('auth.labels.password_confirmation')"
            >
                <a-input-password
                    type="password"
                    v-model:value="formState.password_confirmation"
                    :placeholder="t('auth.labels.password_confirmation')"
                    @blur="trim('password_confirmation', formState)"
                />
            </a-form-item>

            <a-button
                :loading="loading"
                type="primary"
                html-type="submit"
                class="btn-auth mt-15"
            >
                {{ t('update') }}
            </a-button>
        </a-form>
    </div>
</template>
