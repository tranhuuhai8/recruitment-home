<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
    <div className="page-not-found">
        <p>{{ t('page_not_found.not_found') }}</p>
        <a-button type="primary" @click="() => router.push({ name: 'home' })">
            {{ t('page_not_found.btn_redirect') }}
        </a-button>
    </div>
</template>
