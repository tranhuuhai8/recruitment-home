<script setup lang="ts">
import { MAIL_LOG_STATUS_MAP } from '../shared'
import { useI18n } from 'vue3-i18n'

defineProps<{
    log: any
    open: boolean
}>()
const { t } = useI18n()
defineEmits(['update:open'])
</script>

<template>
    <a-modal
        :open="open"
        :title="t('contact.mail_log.detail_title')"
        width="700px"
        :footer="null"
        @update:open="$emit('update:open', $event)"
    >
        <a-descriptions v-if="log" bordered :column="1" size="small">
            <a-descriptions-item :label="t('contact.mail_log.send_to')">{{
                log.to_email
            }}</a-descriptions-item>
            <a-descriptions-item :label="t('contact.mail_template.subject')">{{
                log.subject
            }}</a-descriptions-item>
            <a-descriptions-item :label="t('status.label')">
                <a-tag :color="MAIL_LOG_STATUS_MAP[log.status]?.color">
                    {{ MAIL_LOG_STATUS_MAP[log.status]?.label }}
                </a-tag>
            </a-descriptions-item>
            <a-descriptions-item
                v-if="log.error_message"
                :label="t('contact.mail_log.error')"
            >
                <code style="color: #cf1322; font-size: 0.85rem">{{
                    log.error_message
                }}</code>
            </a-descriptions-item>
            <a-descriptions-item :label="t('contact.mail_log.sent_at')">{{
                log.sent_at ?? '—'
            }}</a-descriptions-item>
            <a-descriptions-item :label="t('contact.mail_log.created_at')">{{
                log.created_at
            }}</a-descriptions-item>
            <a-descriptions-item
                v-if="log.body"
                :label="t('contact.mail_log.html_content')"
            >
                <div
                    style="
                        border: 1px solid #f0f0f0;
                        border-radius: 8px;
                        padding: 16px;
                        background: #fafafa;
                        max-height: 300px;
                        overflow-y: auto;
                    "
                    v-html="log.body"
                />
            </a-descriptions-item>
        </a-descriptions>
    </a-modal>
</template>
