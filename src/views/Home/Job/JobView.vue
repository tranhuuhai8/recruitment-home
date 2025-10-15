<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import JobList from './JobList.vue'
import { useJobCategoryStore, useJobStore } from '@/stores/home'
import { PaginationHome } from '@/components/common'

const { t } = useI18n()
const jobStore = useJobStore()
const jobCategoryStore = useJobCategoryStore()
const topCategories = ref()
const tabIdCurrent = ref<number | null>(null)
const emit = defineEmits(['filterCategory', 'changePage'])
const props = defineProps(['categories'])

const handleChangeTab = (id: number | null) => {
    tabIdCurrent.value = id
    emit('filterCategory', id)
}

const onChangePage = async (page: number) => emit('changePage', page)

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
                    :class="`${!tabIdCurrent && !props.categories.length ? 'active' : ''}`"
                    @click="handleChangeTab(null)"
                >
                    {{ t('all') }}
                </a-button>
                <a-button
                    v-for="item in topCategories"
                    :key="item.id"
                    :class="`${tabIdCurrent === item.id || props.categories?.includes(item.id) ? 'active' : ''}`"
                    @click="handleChangeTab(item.id)"
                >
                    {{ item.name }}
                </a-button>
            </div>
        </div>

        <div v-if="jobStore.getJobs?.data?.length" class="container job-list">
            <JobList />
            <PaginationHome
                :data="jobStore.getJobs"
                @changePage="onChangePage"
                v-if="
                    jobStore.getJobs?.total &&
                    jobStore.getJobs.total > jobStore.getJobs.per_page
                "
            />
        </div>
    </div>
</template>
