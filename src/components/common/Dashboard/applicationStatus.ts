import i18n from '@/lang'
import { DOUGHNUT_COLORS_STATUS_APPLIED } from './chartOptions'
import type { StatusBreakdownItem } from '@/interface'

const { t } = i18n

const STATUS_LABEL_KEYS: Record<number, string> = {
    1: 'status.pending',
    2: 'status.reviewed',
    3: 'status.accepted',
    4: 'status.rejected',
}

export const makeDataApplicationStatus = (items: StatusBreakdownItem[]) => ({
    labels: items.map((item) =>
        STATUS_LABEL_KEYS[item.status]
            ? t(STATUS_LABEL_KEYS[item.status])
            : String(item.status)
    ),
    datasets: [
        {
            data: items.map((item) => item.count),
            backgroundColor: items.map(
                (_, index) =>
                    DOUGHNUT_COLORS_STATUS_APPLIED[
                        index % DOUGHNUT_COLORS_STATUS_APPLIED.length
                    ]
            ),
            borderWidth: 0,
        },
    ],
})
