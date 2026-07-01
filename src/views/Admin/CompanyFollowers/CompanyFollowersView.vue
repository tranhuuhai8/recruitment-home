<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { useSettingStore } from '@/stores'
import { useCompanyFollowersStore } from '@/stores/admin'
import { INITIAL_QUERY } from '@/libs'

const { t } = useI18n()
const settingStore = useSettingStore()
const store = useCompanyFollowersStore()

const loading = ref(false)
const query = ref<Record<string, any>>({ ...INITIAL_QUERY })
const search = ref('')

const getData = async () => {
    loading.value = true
    await store.list(query.value)
    loading.value = false
}

const onSearch = () => {
    query.value = { ...query.value, page: 1, search: search.value }
}

const onChangePage = (page: number) => {
    query.value = { ...query.value, page }
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle('Công ty đã lưu')
})

watch(
    () => query.value,
    () => getData(),
    { immediate: true, deep: true }
)
</script>

<template>
    <div class="box box-search">
        <h1 class="title-page">Công ty đã lưu</h1>
        <a-space>
            <a-input
                v-model:value="search"
                placeholder="Tìm theo tên công ty"
                allowClear
                style="width: 360px"
            />
            <a-button type="primary" @click="onSearch">
                {{ t('search') }}
            </a-button>
        </a-space>
    </div>

    <div class="box">
        <a-table
            :loading="loading"
            :dataSource="store.getCompanies?.data ?? []"
            :pagination="false"
            rowKey="id"
        >
            <a-table-column title="ID" dataIndex="id" key="id" />
            <a-table-column title="Tên công ty" dataIndex="name" key="name" />
            <a-table-column
                title="Viết tắt"
                dataIndex="short_name"
                key="short_name"
            />
            <a-table-column
                title="Số người theo dõi"
                dataIndex="followers_count"
                key="followers_count"
            />
        </a-table>

        <div
            style="margin-top: 12px; text-align: right"
            v-if="store.getCompanies"
        >
            <a-pagination
                :current="store.getCompanies.current_page"
                :pageSize="store.getCompanies.per_page"
                :total="store.getCompanies.total"
                @change="onChangePage"
                showLessItems
            />
        </div>
    </div>
</template>
