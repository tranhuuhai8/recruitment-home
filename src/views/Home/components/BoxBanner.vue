<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue3-i18n'
import { filterOption, getOptions, trim } from '@/libs'
import { useCityStore, useJobCategoryStore } from '@/stores/home'
import Banner from '@/assets/imgs/bg-banner.jpg'

const { t } = useI18n()
const formRef = ref()
const props = defineProps(['formState'])
const emits = defineEmits(['search'])
const { formState } = props
const cityStore = useCityStore()
const jobCategoryStore = useJobCategoryStore()
</script>

<template>
    <div class="box-banner">
        <img :src="Banner" alt="" class="bg-banner" />
        <div class="body-banner container">
            <h1 class="title">{{ t('home.title') }}</h1>
            <p class="subtitle">{{ t('home.sub_title') }}</p>
            <a-form
                ref="formRef"
                class="form-search-home"
                :model="formState"
                @finish="emits('search')"
            >
                <a-form-item name="search" class="search-all">
                    <a-input
                        allowClear
                        :placeholder="t('home.search.all')"
                        v-model:value="formState.search"
                        @blur="trim('search', formState)"
                    />
                </a-form-item>

                <a-form-item name="job_category_id">
                    <a-select
                        allow-search
                        show-search
                        show-arrow
                        ref="select"
                        mode="multiple"
                        :placeholder="t('home.search.category')"
                        v-model:value="formState.job_category_id"
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
                        ref="select"
                        mode="multiple"
                        :placeholder="t('home.search.city')"
                        v-model:value="formState.city_id"
                        :max-tag-count="4"
                        :options="
                            getOptions(cityStore.getCitiesParent?.data ?? [])
                        "
                        :filter-option="filterOption"
                    />
                </a-form-item>

                <a-button type="primary" html-type="submit">
                    {{ t('search') }}
                </a-button>
            </a-form>
        </div>
    </div>
</template>
