<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    useCityStore,
    useJobCategoryStore,
    useCompanyStore,
    useJobStore,
} from '@/stores/home'
import type { ParamsList } from '@/interface'
import { INITIAL_QUERY, QUERY_MST_PARENT } from '@/libs'
import { FORM_SEARCH_HOME, getQuerySearch } from './shared'
import { BannerBox, CompanyBox, JobBox } from './components'

const loading = ref(false)
const formSearch = ref<any>({ ...FORM_SEARCH_HOME })
const querySearch = ref<ParamsList>({ ...INITIAL_QUERY })
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

const getJobs = (params: Record<string, any>) => jobStore.list(params)

const filterJobByCategory = async (id: number) => {
    loading.value = true
    const paramSearch = getQuerySearch(querySearch, formSearch.value, id)
    await getJobs(paramSearch)
    loading.value = false
}

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
            <BannerBox :form-state="formSearch" @search="getData" />
            <CompanyBox />
            <JobBox @filter-category="filterJobByCategory" />
            <div
                class="content-1"
                style="height: 1000px; text-align: center; margin-top: 50px"
            >
                Helloworld
            </div>
        </div>
    </a-spin>
</template>
