<script setup lang="ts">
import {
    filterOption,
    FORMAT_DATE_DASH,
    getObjOptions,
    getOptions,
    QUERY_GET_TREE,
    STATUS_JOB_OPTIONS_SEARCH,
    trim,
    TYPE_JOB_OPTIONS_SEARCH,
} from '@/libs'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useCityStore } from '@/stores/home'
import { useCompanyStore } from '@/stores/admin'

const { t } = useI18n()
const formRef = ref()
const props = defineProps(['formState'])
const emits = defineEmits(['submit', 'reset'])
const formState = computed(() => props.formState)
const cityStore = useCityStore()
const companyStore = useCompanyStore()
const loading = ref(false)

const resetFields = () => {
    formRef.value.resetFields()
    emits('reset')
}

onMounted(async () => {
    loading.value = true
    await cityStore.list(QUERY_GET_TREE)
    await companyStore.getSelect(QUERY_GET_TREE)
    loading.value = false
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

        <a-form-item name="company_id" :label="t('job.labels.company')">
            <a-select
                allow-search
                allow-clear
                show-search
                show-arrow
                class="filter-company"
                v-model:value="formState.company_id"
                :options="
                    getOptions(
                        companyStore.getCompanies.length
                            ? companyStore.getCompanies
                            : []
                    )
                "
                :placeholder="t('select.placeholder')"
                :filter-option="filterOption"
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
