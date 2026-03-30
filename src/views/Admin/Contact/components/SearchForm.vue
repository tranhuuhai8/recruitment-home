<script setup lang="ts">
import { getObjOptions } from '@/libs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import {
    CONTACT_STATUS_OPTIONS_SEARCH,
    CONTACT_PRIORITY_OPTIONS_SEARCH,
} from '../shared'

const formRef = ref()
const { t } = useI18n()
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
        class="form-search search-contact"
        :model="formState"
        @finish="emits('submit')"
    >
        <a-form-item name="search">
            <a-input
                allow-clear
                placeholder="Tìm theo tên, email, tiêu đề..."
                v-model:value="formState.search"
            />
        </a-form-item>

        <a-form-item name="status" :label="t('status.label')">
            <a-select
                style="width: 200px"
                :options="getObjOptions(CONTACT_STATUS_OPTIONS_SEARCH)"
                v-model:value="formState.status"
            />
        </a-form-item>

        <a-form-item name="priority" label="Độ ưu tiên">
            <a-select
                style="width: 200px"
                :options="getObjOptions(CONTACT_PRIORITY_OPTIONS_SEARCH)"
                v-model:value="formState.priority"
            />
        </a-form-item>

        <a-space class="space-group-btn">
            <a-button type="primary" html-type="submit">{{
                t('search')
            }}</a-button>
            <a-button type="link" @click="resetFields">{{
                t('reset')
            }}</a-button>
        </a-space>
    </a-form>
</template>
