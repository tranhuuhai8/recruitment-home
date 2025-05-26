<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { nextTick, onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores'
import {
    TabCity,
    TabJobCategory,
    CityForm,
    JobCategoryForm,
} from './components'
import { changeButton } from './shared'

const { t } = useI18n()
const settingStore = useSettingStore()
const activeKey = ref('1')

const open = ref(false)
const id = ref()

const cellClick = (e: any, b: Record<string, any>) => {
    id.value = b.id
    open.value = true
}

const handleCreate = () => {
    id.value = null
    open.value = true
}

onMounted(async () => {
    await nextTick()
    settingStore.setTitle(t('sidebar.master_data'))
})
</script>

<template>
    <div class="box full master-data">
        <a-button type="primary" class="btn-create" @click="handleCreate">
            {{ t(`masterData.btn_create.${changeButton(activeKey)}`) }}
        </a-button>
        <div class="box-body no_padding">
            <a-tabs
                v-model:activeKey="activeKey"
                destroyInactiveTabPane
                class="custom master-tabs"
            >
                <a-tab-pane key="1" :tab="t('masterData.tab.city')">
                    <TabCity @cellClick="cellClick" />
                </a-tab-pane>
                <a-tab-pane key="2" :tab="t('masterData.tab.category')">
                    <TabJobCategory @cellClick="cellClick" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
    <modal-vue
        centered
        :open="open"
        wrapClassName="modal-mst-data"
        :width="500"
        :hasFooter="false"
        :closable="false"
        @cancel="open = false"
    >
        <template #body>
            <CityForm
                v-if="activeKey === '1'"
                :id="id"
                @cancel="((open = false), (id = null))"
                @submit="open = false"
            />
            <JobCategoryForm
                v-else
                :id="id"
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
