<script setup lang="ts">
import { inject } from 'vue'
import { useI18n } from 'vue3-i18n'
import { EyeOutlined, SyncOutlined } from '@ant-design/icons-vue'

defineProps<{ record: any }>()

const handleDetail = inject('handleDetail') as (record: any) => void
const handleRetry = inject('handleRetry') as (record: any) => void
const { t } = useI18n()
</script>

<template>
    <a-row justify="center" class="col-action">
        <a-tooltip :title="t('contact.mail_log.view_detail')">
            <div
                class="icon-operation icon-detail"
                @click="handleDetail(record)"
            >
                <EyeOutlined />
            </div>
        </a-tooltip>
        <a-tooltip
            :title="
                record.status !== 3
                    ? t('contact.mail_log.retry_failed')
                    : t('contact.mail_log.retry')
            "
        >
            <div
                class="icon-operation icon-edit"
                :class="{ 'is-disabled': record.status !== 3 }"
                @click="record.status === 3 && handleRetry(record)"
            >
                <SyncOutlined />
            </div>
        </a-tooltip>
    </a-row>
</template>

<style scoped lang="scss">
.is-disabled {
    opacity: 0.35;
    cursor: not-allowed;
}
</style>
