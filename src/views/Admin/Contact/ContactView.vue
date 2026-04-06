<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useSettingStore } from '@/stores'
import { useContactStore } from '@/stores/admin'
import { mapSortQuery, TRUE_VALUE } from '@/libs'
import type { SortProps } from '@/interface'
import SearchForm from './components/SearchForm.vue'
import {
    columns,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_QUERY_CONTACT,
} from './shared'

const settingStore = useSettingStore()
const contactStore = useContactStore()
const { t } = useI18n()

const formState = ref({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_CONTACT })
const loading = ref(false)
const tableKey = ref(TRUE_VALUE)

const getData = async () => {
    loading.value = true
    await contactStore.list(query.value)
    loading.value = false
}

const handleSort = ({ field: key, order: dir }: SortProps) =>
    (query.value = mapSortQuery(query, key, dir ? `${dir}ing` : 'descending'))

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(query, formState.value))

const handleResetQuery = () => {
    formState.value = { ...INITIAL_FORM_SEARCH }
    query.value = { ...INITIAL_QUERY_CONTACT }
    tableKey.value++
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('contact.title'))
})

watch(
    () => query.value,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="box box-search">
        <SearchForm
            :form-state="formState"
            @submit="handleSearch"
            @reset="handleResetQuery"
        />
    </div>
    <div class="box contact-view">
        <div class="box-body no_padding">
            <table-data
                class="contact-list"
                :loading="loading"
                :columns="columns"
                :data="contactStore.getContacts"
                :show-pagination="true"
                :table-key="tableKey"
                @sort="handleSort"
                @change-page="handleChangePage"
            />
        </div>
    </div>
</template>
