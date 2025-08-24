<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FORM_SEARCH_HOME, getQuerySearch, QUERY_MST_PARENT } from './shared'
import { useCityStore, useJobCategoryStore } from '@/stores/home'
import { useCompanyStore } from '@/stores/home/company'
import { INITIAL_QUERY } from '@/libs'
import type { ParamsList } from '@/interface'
import CompanyBox from './components/CompanyBox.vue'
import BannerBox from './components/BannerBox.vue'

const loading = ref(false)
const formSearch = ref<any>({ ...FORM_SEARCH_HOME })
const querySearch = ref<ParamsList>({ ...INITIAL_QUERY })
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()
const companyStore = useCompanyStore()

const getData = async () => {
    loading.value = true
    await companyStore.list(getQuerySearch(querySearch, formSearch.value))
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
            <div
                class="content-1"
                style="height: 1000px; text-align: center; margin-top: 50px"
            >
                Hello Haudau
            </div>
        </div>
    </a-spin>
</template>
