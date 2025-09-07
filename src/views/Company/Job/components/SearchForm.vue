<script setup lang="ts">
import {
    FORMAT_DATE_DASH,
    getObjOptions,
    INITIAL_QUERY,
    PAYLOAD_ALL,
    STATUS_JOB_OPTIONS_SEARCH,
    trim,
    TYPE_JOB_OPTIONS_SEARCH,
} from '@/libs'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useCityStore, useJobCategoryStore } from '@/stores/home'
import TreeSelect from '@/components/common/Select/TreeSelect.vue'

const { t } = useI18n()
const formRef = ref()
const props = defineProps(['formState'])
const emits = defineEmits(['submit', 'reset'])
const formState = computed(() => props.formState)
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()

const resetFields = () => {
    formRef.value.resetFields()
    emits('reset')
}

onMounted(async () => {
    await cityStore.list({ ...INITIAL_QUERY, ...PAYLOAD_ALL })
    await jobCategoryStore.list({ ...INITIAL_QUERY, ...PAYLOAD_ALL })
})
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
                :placeholder="t('search')"
                v-model:value="formState.search"
                @blur="trim('search', formState)"
            />
        </a-form-item>

        <a-form-item name="start_date" :label="t('job.labels.start_date')">
            <a-date-picker
                :format="FORMAT_DATE_DASH"
                v-model:value="formState.start_date"
                :placeholder="t('job.labels.start_date')"
            />
        </a-form-item>

        <a-form-item name="end_date" :label="t('job.labels.end_date')">
            <a-date-picker
                :format="FORMAT_DATE_DASH"
                v-model:value="formState.end_date"
                :placeholder="t('job.labels.end_date')"
            />
        </a-form-item>

        <a-form-item name="type" :label="t('job.labels.type')">
            <a-select
                :options="getObjOptions(TYPE_JOB_OPTIONS_SEARCH)"
                v-model:value="formState.type"
            />
        </a-form-item>

        <a-form-item name="status" :label="t('status.label')">
            <a-select
                :options="getObjOptions(STATUS_JOB_OPTIONS_SEARCH)"
                v-model:value="formState.status"
            />
        </a-form-item>

        <a-form-item name="city_id" :label="t('job.labels.city')">
            <TreeSelect
                v-model="formState.city_id"
                :data="cityStore.getCities?.data"
            />
        </a-form-item>
        <a-form-item name="job_category_id" :label="t('job.labels.category')">
            <TreeSelect
                v-model="formState.job_category_id"
                :data="jobCategoryStore.getJobCategories?.data"
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
