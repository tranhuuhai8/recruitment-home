<script setup lang="ts">
import {
    getObjOptions,
    filterOption,
    STATUS_DISPLAY_OPTIONS_SEARCH,
    trim,
    TYPE_OPTIONS_SEARCH,
    getOptions,
} from '@/libs'
import { useCityStore, useJobCategoryStore } from '@/stores/home'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue3-i18n'
import { QUERY_MST_PARENT } from '../shared'

const { t } = useI18n()
const formRef = ref()
const props = defineProps(['formState', 'hasType'])
const emits = defineEmits(['submit', 'reset'])
const formState = computed(() => props.formState)
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()

const resetFields = () => {
    formRef.value.resetFields()
    emits('reset')
}

watch(
    () => props.hasType,
    async () => {
        if (!props.hasType) {
            await cityStore.listParent(QUERY_MST_PARENT)
        } else {
            await jobCategoryStore.listParent(QUERY_MST_PARENT)
        }
    },
    { immediate: true }
)
</script>

<template>
    <a-form
        ref="formRef"
        class="form-search form-search-master-data"
        :model="formState"
        @finish="emits('submit')"
    >
        <a-form-item v-if="hasType" name="search">
            <a-input
                allowClear
                name="search_category"
                :placeholder="t('masterData.placeholder.category')"
                v-model:value="formState.search"
                @blur="trim('search', formState)"
            />
        </a-form-item>

        <a-form-item v-else name="search">
            <a-input
                allowClear
                name="search_city"
                :placeholder="t('masterData.placeholder.city')"
                v-model:value="formState.search"
                @blur="trim('search', formState)"
            />
        </a-form-item>

        <a-form-item name="status" :label="t('status.label')">
            <a-select
                show-arrow
                :options="getObjOptions(STATUS_DISPLAY_OPTIONS_SEARCH)"
                v-model:value="formState.status"
            />
        </a-form-item>

        <a-form-item v-if="hasType" name="type" :label="t('type.label')">
            <a-select
                show-arrow
                :options="getObjOptions(TYPE_OPTIONS_SEARCH)"
                v-model:value="formState.type"
            />
        </a-form-item>

        <a-form-item
            v-if="hasType"
            name="parent_id"
            :label="t('masterData.labels.parent_category_name')"
            class="form-item-select-parent-id"
        >
            <a-select
                allow-search
                show-search
                show-arrow
                ref="select"
                mode="multiple"
                :placeholder="t('select.placeholder')"
                v-model:value="formState.parent_id"
                :max-tag-count="2"
                :options="
                    getOptions(
                        jobCategoryStore.getJobCategoriesParent?.data ?? []
                    )
                "
                :filter-option="filterOption"
            />
        </a-form-item>

        <a-form-item
            v-if="!hasType"
            name="parent_id"
            :label="t('masterData.labels.parent_city_name')"
            class="form-item-select-parent-id"
        >
            <a-select
                allow-search
                show-search
                show-arrow
                ref="select"
                mode="multiple"
                :placeholder="t('select.placeholder')"
                v-model:value="formState.parent_id"
                :max-tag-count="3"
                :options="getOptions(cityStore.getCitiesParent?.data ?? [])"
                :filter-option="filterOption"
            />
        </a-form-item>

        <a-space class="space-group-btn">
            <a-button type="primary" html-type="submit">
                {{ t('search') }}
            </a-button>
            <a-button type="link" class="mr-10" @click="resetFields">
                {{ t('reset') }}
            </a-button>
        </a-space>
    </a-form>
</template>
