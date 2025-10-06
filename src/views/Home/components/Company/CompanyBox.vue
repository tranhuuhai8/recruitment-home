<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { CompanyList, CompanyMarquee } from '../'

const { t } = useI18n()
</script>

<template>
    <div class="box-company">
        <h1 class="title">{{ t('home.company.title') }}</h1>
        <p class="subtitle">
            {{ t('home.company.subtitle') }}
        </p>
        <CompanyList />
        <CompanyMarquee />
    </div>
</template>
