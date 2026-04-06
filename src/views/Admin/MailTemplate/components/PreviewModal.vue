<script setup lang="ts">
import { useI18n } from 'vue3-i18n'

defineProps<{
    open: boolean
    data: any
    loading: boolean
}>()
const { t } = useI18n()
defineEmits(['update:open'])
</script>

<template>
    <a-modal
        :open="open"
        :title="t('contact.mail_template.preview_title')"
        width="750px"
        :footer="null"
        @update:open="$emit('update:open', $event)"
    >
        <a-spin :spinning="loading">
            <template v-if="data">
                <a-descriptions
                    bordered
                    :column="1"
                    size="small"
                    style="margin-bottom: 16px"
                >
                    <a-descriptions-item label="Code">{{
                        data.code
                    }}</a-descriptions-item>
                    <a-descriptions-item
                        :label="t('contact.mail_template.subject')"
                        >{{ data.subject }}</a-descriptions-item
                    >
                </a-descriptions>
                <div
                    style="
                        border: 1px solid #f0f0f0;
                        border-radius: 8px;
                        padding: 20px;
                        background: #fafafa;
                        min-height: 120px;
                    "
                    v-html="data.body"
                />
            </template>
        </a-spin>
    </a-modal>
</template>
