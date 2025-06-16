<script setup lang="ts">
import { getObjOptions, STATUS_OPTIONS_SEARCH, trim } from '@/libs'
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
                style="width: 200px"
                :options="getObjOptions(STATUS_OPTIONS_SEARCH)"
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
