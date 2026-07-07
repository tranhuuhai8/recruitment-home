<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { StatusColumnApply } from '@/components/common'
import type { RecentApplicationItem } from '@/interface'

const { t } = useI18n()
const router = useRouter()

defineProps<{ items: RecentApplicationItem[] }>()

const goToApplied = () => router.push({ name: 'applicant-applied' })
</script>

<template>
    <div class="box-widget recent-applications">
        <div class="widget-header">
            <h3>{{ t('applicant.dashboard.title.recent_applications') }}</h3>
        </div>
        <table class="recent-applications-table">
            <thead>
                <tr>
                    <th>{{ t('job.labels.title') }}</th>
                    <th class="status-column">{{ t('status.label') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in items"
                    class="clickable"
                    :key="`${item.job_id}-${item.created_at}`"
                    @click="goToApplied"
                >
                    <td>
                        <div class="recent-application-info">
                            <span class="widget-list-label">
                                {{ item.job_title }}
                            </span>
                            <span class="widget-list-meta">
                                {{ item.company_name }}
                            </span>
                        </div>
                    </td>
                    <td class="status-column">
                        <StatusColumnApply :status="item.status" />
                    </td>
                </tr>
                <tr v-if="!items.length">
                    <td colspan="2" class="widget-empty">--</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
.recent-applications-table {
    width: 100%;
    border-collapse: collapse;

    th {
        text-align: left;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--vt-c-gray);
        padding-bottom: 8px;
        border-bottom: 1px solid var(--vt-c-border);
    }

    td {
        padding: 10px 0;
        border-bottom: 1px solid var(--vt-c-border);
    }

    tr:last-child td {
        border-bottom: none;
    }

    tr.clickable {
        cursor: pointer;

        &:hover .widget-list-label {
            color: var(--vt-c-main);
        }
    }

    .recent-application-info {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .widget-list-meta {
            color: var(--vt-c-gray);
            font-size: 13px;
        }
    }

    .status-column {
        width: 140px;
        text-align: right;
    }

    :deep(.type-status) {
        display: inline-block;
        margin: 0;
        padding: 0;
        background: none;
        font-weight: 600;

        &.pending {
            color: var(--vt-c-gray);
        }

        &.reviewed {
            color: var(--vt-c-blue);
        }

        &.accepted {
            color: var(--vt-c-green);
        }

        &.rejected {
            color: var(--vt-c-red);
        }
    }
}
</style>
