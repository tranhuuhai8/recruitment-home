<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { INITIAL_QUERY, PER_PAGE_HOME, QUERY_MST_PARENT } from '@/libs'
import { useCityStore, useJobCategoryStore, useJobStore } from '@/stores/home'
import { filterOption, getOptions, trim } from '@/libs'
import { PaginationHome } from '@/components/common'
import JobList from './Job/JobList.vue'
import { getQuerySearch, FORM_SEARCH_HOME } from './shared'
import type { ParamsList } from '@/interface'

const { t } = useI18n()
const loading = ref(false)
const formRef = ref()

const formSearch = reactive<any>({
    ...FORM_SEARCH_HOME,
})

const querySearch = ref<ParamsList>({
    ...INITIAL_QUERY,
    per_page: PER_PAGE_HOME,
})

const jobStore = useJobStore()
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()

const fetchJobs = async (page?: number) => {
    loading.value = true
    const query = getQuerySearch(
        { ...querySearch.value, page: page ?? querySearch.value.page },
        formSearch
    )
    await jobStore.list(query as any)
    querySearch.value.page = (query as any).page ?? querySearch.value.page
    loading.value = false
}

const onSubmit = async () => {
    querySearch.value.page = 1
    await fetchJobs(1)
}

const onChangePage = async (page: number) => fetchJobs(page)

onMounted(async () => {
    loading.value = true
    await Promise.all([
        cityStore.listParent(QUERY_MST_PARENT as any),
        jobCategoryStore.listParent(QUERY_MST_PARENT as any),
    ])
    await fetchJobs(1)
})
</script>

<template>
    <div class="box-job content">
        <div class="container page-detail">
            <div class="box box-search">
                <div class="title-page">{{ t('header.job') }}</div>
                <a-form
                    ref="formRef"
                    class="form-search"
                    :model="formSearch"
                    @finish="onSubmit"
                >
                <a-form-item name="search" class="search-all">
                    <a-input
                        allowClear
                        :placeholder="t('home.search.all')"
                        v-model:value="formSearch.search"
                        @blur="trim('search', formSearch)"
                    />
                </a-form-item>

                <a-form-item name="job_category_id">
                    <a-select
                        allow-search
                        show-search
                        show-arrow
                        mode="multiple"
                        :placeholder="t('home.search.category')"
                        v-model:value="formSearch.job_category_id"
                        :max-tag-count="2"
                        :options="
                            getOptions(
                                jobCategoryStore.getJobCategoriesParent?.data ??
                                    []
                            )
                        "
                        :filter-option="filterOption"
                    />
                </a-form-item>

                <a-form-item name="city_id">
                    <a-select
                        allow-search
                        show-search
                        show-arrow
                        mode="multiple"
                        :placeholder="t('home.search.city')"
                        v-model:value="formSearch.city_id"
                        :max-tag-count="2"
                        :options="getOptions(cityStore.getCitiesParent?.data ?? [])"
                        :filter-option="filterOption"
                    />
                </a-form-item>

                <div class="space-group-btn" style="width: auto">
                    <a-button type="primary" html-type="submit">
                        {{ t('search') }}
                    </a-button>
                </div>
                </a-form>
            </div>

            <a-card :loading="loading" class="box">
                <div v-if="jobStore.getJobs?.data?.length" class="job-list">
                    <JobList />
                    <PaginationHome
                        :data="jobStore.getJobs"
                        @changePage="onChangePage"
                        v-if="
                            jobStore.getJobs?.total &&
                            jobStore.getJobs.total >
                                (jobStore.getJobs.per_page ?? 0)
                        "
                    />
                </div>
                <a-empty v-else />
            </a-card>
        </div>
    </div>
</template>
