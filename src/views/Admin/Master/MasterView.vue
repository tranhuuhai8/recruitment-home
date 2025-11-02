<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useSettingStore } from '@/stores'
import {
    TabCity,
    TabJobCategory,
    CityForm,
    JobCategoryForm,
    SearchForm,
} from './components'
import {
    changeButton,
    getQuerySearch,
    INITIAL_FORM_SEARCH,
    INITIAL_QUERY_MST,
    KEY_TAB_CITY,
    KEY_TAB_CATEGORY,
} from './shared'
import { FALSE_VALUE, TRUE_VALUE } from '@/libs'
import type { FormSearchMst } from '@/interface'

const { t } = useI18n()
const settingStore = useSettingStore()
const activeKey = ref(KEY_TAB_CITY)
const formState = ref<FormSearchMst>({ ...INITIAL_FORM_SEARCH })
const query = ref<Record<string, any>>({ ...INITIAL_QUERY_MST })
const open = ref(false)
const id = ref()
const tableKey = ref(TRUE_VALUE)

const cellClick = (e: any, b: Record<string, any>) => {
    id.value = b.id
    open.value = true
}

const handleCreate = () => {
    id.value = null
    open.value = true
}

const handleSort = (newQuery: Record<string, any>) =>
    (query.value = { ...newQuery })

const handleChangePage = (page: number) =>
    (query.value = { ...query.value, page })

const handleSearch = () =>
    (query.value = getQuerySearch(
        query,
        formState.value,
        activeKey.value === KEY_TAB_CATEGORY
    ))

const handleResetQuery = () => {
    query.value = { ...INITIAL_QUERY_MST }
    tableKey.value++
}

const onTabChange = (key: string) => {
    handleResetQuery()
    if (key === KEY_TAB_CITY) {
        formState.value = { ...INITIAL_FORM_SEARCH }
        return
    }

    formState.value = { ...INITIAL_FORM_SEARCH, type: FALSE_VALUE }
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('sidebar.master_data'))
    window.addEventListener('editClick', (event: any) =>
        cellClick(null, event.detail)
    )
})

onUnmounted(() => {
    window.removeEventListener('editClick', (event: any) =>
        cellClick(null, event.detail)
    )
})
</script>

<template>
    <div class="box box-search">
        <SearchForm
            :has-type="activeKey === KEY_TAB_CATEGORY"
            :form-state="formState"
            @submit="handleSearch"
            @reset="handleResetQuery"
        />
    </div>

    <div class="box master-data">
        <a-button type="primary" class="btn-create" @click="handleCreate">
            {{ t(`masterData.btn_create.${changeButton(activeKey)}`) }}
        </a-button>
        <div class="box-body no_padding">
            <a-tabs
                v-model:activeKey="activeKey"
                destroyInactiveTabPane
                class="custom master-tabs"
                @change="onTabChange"
            >
                <a-tab-pane key="1" :tab="t('masterData.tab.city')">
                    <TabCity
                        :query="query"
                        :table-key="tableKey"
                        @sort="handleSort"
                        @change-page="handleChangePage"
                    />
                </a-tab-pane>
                <a-tab-pane key="2" :tab="t('masterData.tab.category')">
                    <TabJobCategory
                        :query="query"
                        :table-key="tableKey"
                        @sort="handleSort"
                        @change-page="handleChangePage"
                    />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
    <modal-vue
        centered
        wrapClassName="modal-mst-data"
        :open="open"
        :hasFooter="false"
        :closable="false"
        @cancel="open = false"
    >
        <template #body>
            <CityForm
                v-if="activeKey === KEY_TAB_CITY"
                :id="id"
                :query="query"
                :open="open"
                @cancel="((open = false), (id = null))"
                @submit="open = false"
            />
            <JobCategoryForm
                v-else
                :id="id"
                :query="query"
                :open="open"
                @cancel="((open = false), (id = null))"
                @submit="open = false"
            />
        </template>
    </modal-vue>
</template>

<style lang="scss">
.ant-modal-root {
    .ant-modal-mask {
        backdrop-filter: blur(2px);
    }
}
</style>
