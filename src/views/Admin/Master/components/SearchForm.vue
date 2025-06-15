<script setup lang="ts">
import {
    getObjOptions,
    STATUS_DISPLAY_OPTIONS_SEARCH,
    trim,
    TYPE_OPTIONS_SEARCH,
} from '@/libs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const formRef = ref()
const props = defineProps(['formState', 'hasType'])
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
        class="form-search"
        :model="formState"
        @finish="emits('submit')"
    >
        <a-form-item name="search">
            <a-input
                allowClear
                :placeholder="t('search')"
                v-model:value="formState.search"
                @blur="trim('search', formState)"
            />
        </a-form-item>

        <a-form-item name="status" :label="t('status.label')">
            <a-select
                :options="getObjOptions(STATUS_DISPLAY_OPTIONS_SEARCH)"
                v-model:value="formState.status"
            />
        </a-form-item>

        <a-form-item v-if="hasType" name="type" :label="t('type.label')">
            <a-select
                :options="getObjOptions(TYPE_OPTIONS_SEARCH)"
                v-model:value="formState.type"
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
