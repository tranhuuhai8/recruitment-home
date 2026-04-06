<script setup lang="ts">
import { getObjOptions } from '@/libs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { MAIL_TEMPLATE_TYPE_OPTIONS_SEARCH, IS_ACTIVE_OPTIONS } from '../shared'

const formRef = ref()
const { t } = useI18n()
const props = defineProps(['formState'])
const emits = defineEmits(['submit', 'reset', 'create'])
const formState = computed(() => props.formState)

const resetFields = () => {
    formRef.value.resetFields()
    emits('reset')
}
</script>

<template>
    <a-form
        ref="formRef"
        class="form-search search-contact"
        :model="formState"
        @finish="emits('submit')"
    >
        <a-form-item name="search">
            <a-input
                allow-clear
                placeholder="Tìm theo tên, code..."
                v-model:value="formState.search"
            />
        </a-form-item>

        <a-form-item name="type" :label="t('type.label')">
            <a-select
                style="width: 200px"
                :options="getObjOptions(MAIL_TEMPLATE_TYPE_OPTIONS_SEARCH)"
                v-model:value="formState.type"
            />
        </a-form-item>

        <a-form-item name="is_active" :label="t('status.label')">
            <a-select
                style="width: 200px"
                :options="IS_ACTIVE_OPTIONS"
                v-model:value="formState.is_active"
            />
        </a-form-item>

        <a-space class="space-group-btn">
            <a-button type="primary" html-type="submit">{{
                t('search')
            }}</a-button>
            <a-button type="link" @click="resetFields">{{
                t('reset')
            }}</a-button>
            <a-button type="primary" ghost @click="emits('create')">
                + Thêm mẫu email
            </a-button>
        </a-space>
    </a-form>
</template>
