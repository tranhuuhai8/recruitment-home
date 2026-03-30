<script setup lang="ts">
import { TYPE_OPTIONS } from '../shared'
import { useI18n } from 'vue3-i18n'
import type { IMailTemplateDto } from '@/interface'

defineProps<{
    open: boolean
    isSubmitting: boolean
    editingId: number | null
}>()

const formState = defineModel<IMailTemplateDto>('formState', { required: true })
const { t } = useI18n()
defineEmits(['update:open', 'submit'])
</script>

<template>
    <a-modal
        :open="open"
        :title="
            editingId
                ? t('contact.mail_template.form_title_edit')
                : t('contact.mail_template.form_title_create')
        "
        :confirm-loading="isSubmitting"
        :ok-text="t('save')"
        :cancel-text="t('cancel')"
        width="700px"
        @ok="$emit('submit')"
        @update:open="$emit('update:open', $event)"
    >
        <a-form :model="formState" layout="vertical" style="margin-top: 16px">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item
                        :label="t('contact.mail_template.name')"
                        required
                    >
                        <a-input
                            v-model:value="formState!.name"
                            :placeholder="
                                t('contact.mail_template.name_placeholder')
                            "
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item
                        :label="t('contact.mail_template.code')"
                        required
                    >
                        <a-input
                            v-model:value="formState!.code"
                            :placeholder="
                                t('contact.mail_template.code_placeholder')
                            "
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item :label="t('contact.mail_template.subject')" required>
                <a-input
                    v-model:value="formState!.subject"
                    :placeholder="
                        t('contact.mail_template.subject_placeholder')
                    "
                />
            </a-form-item>
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item :label="t('type.label')">
                        <a-select
                            v-model:value="formState!.type"
                            :options="TYPE_OPTIONS"
                            style="width: 100%"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item :label="t('status.label')">
                        <a-switch
                            v-model:checked="formState!.is_active"
                            :checked-children="
                                t('contact.mail_template.active')
                            "
                            :un-checked-children="
                                t('contact.mail_template.inactive')
                            "
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-form-item
                :label="t('contact.mail_template.html_content')"
                required
            >
                <a-textarea
                    v-model:value="formState!.body"
                    :rows="10"
                    :placeholder="t('contact.mail_template.html_placeholder')"
                    style="font-family: monospace; font-size: 0.85rem"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
