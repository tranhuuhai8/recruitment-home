<script lang="ts" setup>
import { computed, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { trim } from '@/libs'
import i18n from '@/lang'
import type { FormInstance } from 'ant-design-vue'
import { getRoleOptions } from '../shared'

const { t } = i18n
const formRef = ref<FormInstance>()
const router = useRouter()
const props = defineProps(['formState', 'isLogin', 'rules', 'loading'])
const formState = computed(() => props.formState)

onUnmounted(() => formRef.value?.resetFields())
</script>

<template>
    <a-form
        class="form-auth form-login"
        name="login_form"
        ref="formRef"
        layout="vertical"
        :model="formState"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        :rules="props.rules"
    >
        <a-form-item name="mail_address" :label="t('auth.labels.mail_address')">
            <a-input
                v-model:value="formState.mail_address"
                :placeholder="t('auth.labels.mail_address')"
                @blur="trim('mail_address', formState)"
            />
        </a-form-item>
        <a-form-item name="password" :label="t('auth.labels.password')">
            <a-input-password
                v-model:value="formState.password"
                type="password"
                :placeholder="t('auth.labels.password')"
                @blur="trim('password', formState)"
            />
        </a-form-item>
        <a-form-item
            v-if="!isLogin"
            name="password_confirmation"
            :label="t('auth.labels.password_confirmation')"
        >
            <a-input-password
                v-model:value="formState.password_confirmation"
                type="password"
                :placeholder="t('auth.labels.password_confirmation')"
                @blur="trim('password_confirmation', formState)"
            />
        </a-form-item>
        <a-form-item name="role" class="role" :label="t('auth.labels.role')">
            <a-select
                ref="select"
                v-model:value="formState.role"
                style="width: 120px"
                :options="getRoleOptions(isLogin)"
            />
        </a-form-item>
        <a-button
            v-if="isLogin"
            type="link"
            @click="() => router.push('/auth/login')"
        >
            {{ t('auth.forgot_password') }}
        </a-button>
        <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="btn-auth mt-15"
        >
            {{ t(`auth.${isLogin ? 'login' : 'register'}`) }}
        </a-button>
    </a-form>
</template>
