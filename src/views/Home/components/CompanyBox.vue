<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import CompanyList from './CompanyList.vue'
import CompanyMarquee from './CompanyMarquee.vue'

const { t } = useI18n()
</script>

<template>
    <div class="box-company">
        <h1 class="title-box center">{{ t('home.company.title') }}</h1>
        <p class="subtitle-box center">
            {{ t('home.company.subtitle') }}
        </p>
        <CompanyList />
        <CompanyMarquee />
    </div>
</template>
