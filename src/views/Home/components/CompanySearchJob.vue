<script setup lang="ts">
import { QUERY_GET_TREE, trim } from '@/libs'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useJobCategoryStore } from '@/stores/home'

const { t } = useI18n()
const formRef = ref()
const props = defineProps(['formState'])
const emits = defineEmits(['submit', 'reset'])
const formState = computed(() => props.formState)
const jobCategoryStore = useJobCategoryStore()

const resetFields = () => {
    formRef.value.resetFields()
    emits('reset')
}

onMounted(async () => {
    await jobCategoryStore.list(QUERY_GET_TREE)
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
        <a-form-item name="search" class="search-all">
            <a-input
                allowClear
                :placeholder="t('search')"
                v-model:value="formState.search"
                @blur="trim('search', formState)"
            />
        </a-form-item>

        <a-form-item name="job_category_id">
            <TreeSelect
                v-model="formState.job_category_id"
                :data="jobCategoryStore.getJobCategories?.data"
            />
        </a-form-item>

        <a-space class="space-group-btn">
            <a-button type="primary" html-type="submit">
                {{ t('search') }}
            </a-button>
            <a-button type="link" @click="resetFields">
                {{ t('reset') }}
            </a-button>
        </a-space>
    </a-form>
</template>
