<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    useCityStore,
    useJobCategoryStore,
    useCompanyStore,
    useJobStore,
} from '@/stores/home'
import type { ParamsList } from '@/interface'
import { INITIAL_QUERY, PER_PAGE_HOME, QUERY_MST_PARENT } from '@/libs'
import { FORM_SEARCH_HOME, getQuerySearch } from './shared'
import { BoxBanner } from './components'
import CompanyView from './Company/CompanyView.vue'
import JobView from './Job/JobView.vue'

const loading = ref(false)
const formSearch = ref<any>({ ...FORM_SEARCH_HOME })
const querySearch = ref<ParamsList>({
    ...INITIAL_QUERY,
    per_page: PER_PAGE_HOME,
})
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()
const companyStore = useCompanyStore()
const jobStore = useJobStore()

const getData = async () => {
    loading.value = true
    const paramSearch = getQuerySearch(querySearch, formSearch.value)
    await getCompanies(paramSearch)
    await getJobs(paramSearch)
    loading.value = false
}

const getCompanies = (params: Record<string, any>) => companyStore.list(params)

const getJobs = async (params: Record<string, any>) => {
    loading.value = true
    await jobStore.list(params)
    loading.value = false
}

const filterJobByCategory = (id: number) => {
    getJobs(
        getQuerySearch(querySearch, formSearch.value, [
            ...formSearch.value.job_category_id,
            id,
        ])
    )
    Object.assign(formSearch.value, { ...formSearch.value, city_id: [] })
}

const handleChangePageJob = (page: number) =>
    getJobs({ ...querySearch.value, page })

onMounted(async () => {
    loading.value = true
    await cityStore.listParent(QUERY_MST_PARENT)
    await jobCategoryStore.listParent(QUERY_MST_PARENT)
    await getData()
    loading.value = false
})
</script>

<template>
    <a-spin :spinning="loading" class="spin-up-size">
        <div class="home-page">
            <BoxBanner :form-state="formSearch" @search="getData" />
            <CompanyView />
            <JobView
                :categories="formSearch.job_category_id"
                @filter-category="filterJobByCategory"
                @change-page="handleChangePageJob"
            />
            <div
                class="content-1"
                style="height: 1000px; text-align: center; margin-top: 50px"
            >
                Helloworld
            </div>
        </div>
    </a-spin>
</template>
