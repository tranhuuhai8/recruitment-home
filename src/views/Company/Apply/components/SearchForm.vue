<script setup lang="ts">
import {
    FORMAT_DATE_DASH,
    getObjOptions,
    STATUS_APPLY_OPTIONS_SEARCH,
    trim,
} from '@/libs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const formRef = ref()
const props = defineProps(['formState'])
const emits = defineEmits(['submit', 'reset'])
const formState = computed(() => props.formState)

const resetFields = () => {
    formRef.value.resetFields()
    emits('reset')
}
</script>

<template>
    <a-form
        ref="formRef"
        layout="vertical"
        class="form-search search-job"
        :model="formState"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        @finish="emits('submit')"
    >
        <a-form-item name="search" :label="t('search')">
            <a-input
                allowClear
                :placeholder="t('apply.placeholder.search')"
                v-model:value="formState.search"
                @blur="trim('search', formState)"
            />
        </a-form-item>

        <a-form-item name="created_at" :label="t('apply.labels.created_at')">
            <a-date-picker
                :format="FORMAT_DATE_DASH"
                v-model:value="formState.created_at"
                :placeholder="t('placeholder.date')"
            />
        </a-form-item>

        <a-form-item name="status" :label="t('status.label')">
            <a-select
                :options="getObjOptions(STATUS_APPLY_OPTIONS_SEARCH)"
                v-model:value="formState.status"
            />
        </a-form-item>

        <a-space class="space-group-btn">
            <a-button type="primary" html-type="submit">
                {{ t('search') }}
            </a-button>
            <a-button type="link" class="mr-10" @click="resetFields">
                {{ t('reset') }}
            </a-button>
        </a-space>
    </a-form>
</template>
