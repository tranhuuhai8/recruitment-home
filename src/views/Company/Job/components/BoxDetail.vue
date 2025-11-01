<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { IconLocation, IconMoney, IconUser } from '@/components/icons'
import { getCityName, getSalaryText } from '@/views/Home/shared'
import { FieldTimeOutlined } from '@ant-design/icons-vue'

const { t } = useI18n()
const props = defineProps(['job'])
</script>

<template>
    <div class="box-header">
        <div class="box-header-info">
            <h2 class="box-header-title">
                {{ props.job?.title }}
            </h2>
            <div class="box-header-content">
                <div class="info-meta" v-if="props.job?.city">
                    <IconLocation />
                    <p>
                        <b>{{ t('home.job.detail.address') }}</b>
                        <br />{{ getCityName(props.job?.city) }}
                    </p>
                </div>
                <div class="info-meta">
                    <IconUser />
                    <p>
                        <b>{{ t('home.job.detail.number_of_recruitment') }}</b>
                        <br />{{ props.job?.number_of_recruitment }}
                    </p>
                </div>
                <div class="info-meta">
                    <IconMoney />
                    <p>
                        <b>{{ t('home.job.detail.salary') }}</b>
                        <br />{{ getSalaryText(props.job) }}
                    </p>
                </div>
                <div class="info-meta">
                    <FieldTimeOutlined />
                    <p>
                        <b>{{ t('home.job.detail.deadline') }}</b>
                        <br />{{ props.job?.end_date }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="box-body">
        <div class="box-body-item w-full">
            <h2 class="title">
                {{ t('home.job.detail.title.description') }}
            </h2>
            <div class="content" v-html="props.job.description" />
        </div>
    </div>
</template>
