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
    <div class="ph-page job-page">
        <!-- Hero Banner -->
        <div class="ph-hero job-hero">
            <div class="ph-hero__overlay job-hero__overlay" />
            <div class="ph-hero__content ph-fade-in-up">
                <div class="ph-hero__badge">💼 Cơ hội nghề nghiệp</div>
                <h1 class="ph-hero__title">
                    Tìm Việc Làm<br />Phù Hợp Với Bạn
                </h1>
                <p class="ph-hero__subtitle">
                    Khám phá hàng nghìn vị trí việc làm từ các nhà tuyển dụng uy
                    tín trên toàn quốc.
                </p>
                <div class="ph-hero__stats">
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">1000+</span>
                        <span class="ph-stat-item__label">Việc làm</span>
                    </div>
                    <div class="ph-stat-divider" />
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">500+</span>
                        <span class="ph-stat-item__label">Doanh nghiệp</span>
                    </div>
                    <div class="ph-stat-divider" />
                    <div class="ph-stat-item">
                        <span class="ph-stat-item__num">Hằng ngày</span>
                        <span class="ph-stat-item__label">Cập nhật</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search + List -->
        <div class="box-job content">
            <div class="ph-container job-content">
                <div class="job-search-box">
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
                                show-search
                                show-arrow
                                mode="multiple"
                                :placeholder="t('home.search.category')"
                                v-model:value="formSearch.job_category_id"
                                :max-tag-count="2"
                                :options="
                                    getOptions(
                                        jobCategoryStore.getJobCategoriesParent
                                            ?.data ?? []
                                    )
                                "
                                :filter-option="filterOption"
                            />
                        </a-form-item>

                        <a-form-item name="city_id">
                            <a-select
                                show-search
                                show-arrow
                                mode="multiple"
                                :placeholder="t('home.search.city')"
                                v-model:value="formSearch.city_id"
                                :max-tag-count="2"
                                :options="
                                    getOptions(
                                        cityStore.getCitiesParent?.data ?? []
                                    )
                                "
                                :filter-option="filterOption"
                            />
                        </a-form-item>

                        <a-button type="primary" html-type="submit">
                            {{ t('search') }}
                        </a-button>
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
    </div>
</template>

<style scoped>
.job-hero {
    background-image: url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    min-height: 380px;
}
.job-hero__overlay {
    background: linear-gradient(
        105deg,
        rgba(15, 23, 42, 0.75) 0%,
        rgba(15, 118, 110, 0.55) 45%,
        rgba(14, 165, 233, 0.35) 100%
    );
}
</style>
