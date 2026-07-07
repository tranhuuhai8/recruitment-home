import { FALSE_VALUE } from '@/libs'
import i18n from '@/lang'
import { DOUGHNUT_COLORS_JOB } from '@/components/common/Dashboard/chartOptions'
import {
    getRangeDates,
    buildDateLabels,
} from '@/components/common/Dashboard/dateRange'
import { makeDataApplicationByDay } from '@/components/common/Dashboard/applicationByDay'
import type { ChartDatePoint, StatusBreakdownItem } from '@/interface'

const { t } = i18n

export const makeDataTopCategory = (items: Record<string, any>[]) => ({
    labels: items.map((item: Record<string, any>) => item.name),
    datasets: [
        {
            data: items.map((item: Record<string, any>) => item.total_jobs),
            backgroundColor: 'rgba(18, 204, 71, 0.8)',
            borderRadius: 5,
            borderWidth: 0,
        },
    ],
})

export const makeDataJobApplication = (
    items: ChartDatePoint[],
    range: string
) => makeDataApplicationByDay(items, range)

export const makeDataUserGrowth = (
    items: Record<string, any>[],
    range: string
) => {
    const { from, to } = getRangeDates(range)
    const { keys, labels } = buildDateLabels(from, to)

    const companyData = keys.map((date) => {
        const record = items.find((item) => item.date === date)
        return record ? record.company : FALSE_VALUE
    })
    const applicantData = keys.map((date) => {
        const record = items.find((item) => item.date === date)
        return record ? record.applicant : FALSE_VALUE
    })

    return {
        labels,
        datasets: [
            {
                label: t('dashboard.admin.title.company'),
                data: companyData,
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 3,
                fill: false,
            },
            {
                label: t('dashboard.admin.title.applicant'),
                data: applicantData,
                borderColor: '#12CC47',
                backgroundColor: 'rgba(18, 204, 71, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 3,
                fill: false,
            },
        ],
    }
}

export const makeDataJobStatus = (items: StatusBreakdownItem[]) => {
    const labelMap: Record<number, string> = {
        1: t('status.draft'),
        2: t('status.open'),
        3: t('status.closed'),
    }

    return {
        labels: items.map(
            (item) => labelMap[item.status] ?? String(item.status)
        ),
        datasets: [
            {
                data: items.map((item) => item.count),
                backgroundColor: items.map(
                    (_, index) =>
                        DOUGHNUT_COLORS_JOB[index % DOUGHNUT_COLORS_JOB.length]
                ),
                borderWidth: 0,
            },
        ],
    }
}
