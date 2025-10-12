<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { TYPE_JOB_MAP } from '@/libs'
import { IconLocation, IconMoney } from '@/components/icons'
import { HeartOutlined } from '@ant-design/icons-vue'
import { getSalaryText } from '../../shared'
import { useJobStore } from '@/stores/home'

const { t } = useI18n()
const jobStore = useJobStore()
</script>

<template>
    <a-list
        :grid="{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 3,
        }"
        :data-source="jobStore.getJobs.data"
    >
        <template #renderItem="{ item }">
            <a-list-item>
                <div class="job-item-header">
                    <div class="company-logo" :title="item.company_name">
                        <img class="avatar" :src="item?.company_logo" />
                    </div>
                    <p class="job-title">{{ item?.title }}</p>
                </div>

                <div class="job-item-body">
                    <span class="meta-item">
                        <IconLocation />
                        {{ item?.city_name }}
                    </span>
                    <span class="meta-item">
                        <IconMoney />
                        {{ getSalaryText(item) }}
                    </span>
                </div>
                <button class="bookmark-btn"><HeartOutlined /></button>

                <div class="job-item-footer">
                    <a-tag class="job-tag category">
                        {{ item?.category_name }}
                    </a-tag>
                    <a-tag class="job-tag">
                        {{ t(`type.${TYPE_JOB_MAP[item?.type]}`) }}
                    </a-tag>
                </div>
            </a-list-item>
        </template>
    </a-list>
</template>
