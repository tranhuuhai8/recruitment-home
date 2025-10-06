<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import JobItem from './JobItem.vue'
import { useJobCategoryStore, useJobStore } from '@/stores/home'

const { t } = useI18n()
const jobStore = useJobStore()
const jobCategoryStore = useJobCategoryStore()
const topCategories = ref()
const tabIdCurrent = ref<number | null>(null)
const emit = defineEmits(['filterCategory'])

const handleChangeTab = (id: number | null) => {
    tabIdCurrent.value = id
    emit('filterCategory', id)
}

watch(
    () => jobCategoryStore.getJobCategoriesParent,
    (newVal) => {
        if (newVal?.data?.length) {
            topCategories.value = newVal.data
                .sort(
                    (a: Record<string, any>, b: Record<string, any>) =>
                        b.total_jobs - a.total_jobs
                )
                .slice(0, 4)
        }
    },
    { immediate: true }
)
</script>

<template>
    <div class="box-job">
        <h1 class="title">{{ t('home.job.title') }}</h1>
        <p class="subtitle">
            {{ t('home.job.subtitle') }}
        </p>

        <div class="container">
            <div class="filter-tabs">
                <a-button
                    :class="`${!tabIdCurrent ? 'active' : ''}`"
                    @click="handleChangeTab(null)"
                >
                    All
                </a-button>
                <a-button
                    v-for="item in topCategories"
                    :key="item.id"
                    :class="`${tabIdCurrent === item.id ? 'active' : ''}`"
                    @click="handleChangeTab(item.id)"
                >
                    {{ item.name }}
                </a-button>
            </div>
        </div>

        <div v-if="jobStore.getJobs?.data?.length" class="container job-list">
            <a-list
                :grid="{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 3,
                }"
                :data-source="jobStore.getJobs.data"
            >
                <template #renderItem="{ item }">
                    <JobItem :item="item" :key="item.id" />
                </template>
            </a-list>
        </div>
    </div>
</template>
