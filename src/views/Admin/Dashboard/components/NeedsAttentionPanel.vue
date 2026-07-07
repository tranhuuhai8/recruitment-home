<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { IconFeedback, IconMail } from '@/components/icons'
import type { DashboardNeedsAttention } from '@/interface'

const { t } = useI18n()
const router = useRouter()

defineProps<{ data: DashboardNeedsAttention }>()

const goToContacts = () => router.push({ name: 'admin-contact' })
const goToMailLogs = () => router.push({ name: 'admin-mail-log' })
</script>

<template>
    <div class="box-widget needs-attention">
        <div class="widget-header">
            <h3>{{ t('dashboard.admin.title.needs_attention') }}</h3>
        </div>
        <div class="attention-item" @click="goToContacts">
            <IconFeedback />
            <span>
                {{
                    t('dashboard.admin.title.pending_contacts', [
                        data.pending_contacts,
                    ])
                }}
            </span>
        </div>
        <div class="attention-item" @click="goToMailLogs">
            <IconMail />
            <span>
                {{
                    t('dashboard.admin.title.failed_mails', [data.failed_mails])
                }}
            </span>
        </div>
    </div>
</template>
