<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import CompanyList from './CompanyList.vue'
import CompanyMarquee from './CompanyMarquee.vue'

const { t } = useI18n()
const props = defineProps(['loading'])
</script>

<template>
    <div class="box-company">
        <h1 class="title">{{ t('home.company.title') }}</h1>
        <p class="subtitle">
            {{ t('home.company.subtitle') }}
        </p>
        <a-card :loading="props.loading">
            <CompanyList />
            <CompanyMarquee />
        </a-card>
    </div>
</template>
