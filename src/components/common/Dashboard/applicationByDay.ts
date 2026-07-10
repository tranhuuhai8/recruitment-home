import { FALSE_VALUE } from '@/libs'
import { getRangeDates, buildDateLabels } from './dateRange'
import type { ChartDatePoint } from '@/interface'

export const makeDataApplicationByDay = (
    items: ChartDatePoint[],
    range?: string
) => {
    const { from, to } = getRangeDates(range)
    const { keys, labels } = buildDateLabels(from, to)
    const data = keys.map((date) => {
        const record = items.find((item) => item.date === date)
        return record ? record.count : FALSE_VALUE
    })

    return {
        labels,
        datasets: [
            {
                data,
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 3,
                tension: 0.5,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#4A90E2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#4A90E2',
                pointHoverBorderColor: '#fff',
                fill: true,
            },
        ],
    }
}
