<script lang="ts" setup>
import { onUnmounted, reactive, ref } from 'vue'
import { getRuleChangePassword, INITIAL_CHANGE_PASSWORD } from './shared'
import { useRouter } from 'vue-router'
import i18n from '@/lang'
import { useAuthStore } from '@/stores'
import { getRolePathMap, notify, STATUS_CODE_SUCCESS, trim } from '@/libs'
import type { FormInstance } from 'ant-design-vue'
import type { ChangePasswordDto } from '@/interface'

const { t } = i18n
const loading = ref(false)
const formRef = ref<FormInstance>()
const router = useRouter()
const authStore = useAuthStore()
const formState = reactive<ChangePasswordDto>({ ...INITIAL_CHANGE_PASSWORD })

const onFinish = async (values: ChangePasswordDto) => {
    try {
        loading.value = true
        const { status_code, message } = await authStore.changePassword(
            values,
            getRolePathMap()
        )

        if (status_code === STATUS_CODE_SUCCESS) {
            notify(t('auth.notify.change_password.success'), '', 'success')
            await authStore.logout()
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
    <div class="box change-password">
        <h1 class="title-page">{{ t('auth.change_password') }}</h1>
        <a-form
            class="form-change-password"
            ref="formRef"
            layout="vertical"
            :model="formState"
            :label-col="{ span: 12 }"
            :wrapper-col="{ span: 24 }"
            :rules="getRuleChangePassword(formState)"
            @finish="onFinish"
        >
            <a-form-item
                name="old_password"
                :label="t('auth.labels.old_password')"
            >
                <a-input-password
                    type="password"
                    v-model:value="formState.old_password"
                    :placeholder="t('auth.labels.old_password')"
                    @blur="trim('old_password', formState, true)"
                />
            </a-form-item>

            <a-form-item name="password" :label="t('auth.labels.new_password')">
                <a-input-password
                    type="password"
                    v-model:value="formState.password"
                    :placeholder="t('auth.labels.new_password')"
                    @blur="trim('password', formState, true)"
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
                    @blur="trim('password_confirmation', formState, true)"
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
