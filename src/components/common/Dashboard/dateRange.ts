import dayjs from '@/libs/utils/dayjs'
import type { Dayjs } from 'dayjs'

export const getRangeDates = (range?: string): { from: Dayjs; to: Dayjs } => {
    const today = dayjs()

    if (range === '7d') return { from: today.subtract(6, 'day'), to: today }
    if (range === 'last_month') {
        const lastMonth = today.subtract(1, 'month')
        return {
            from: lastMonth.startOf('month'),
            to: lastMonth.endOf('month'),
        }
    }

    return { from: today.startOf('month'), to: today.endOf('month') }
}

export const buildDateLabels = (from: Dayjs, to: Dayjs) => {
    const keys: string[] = []
    const labels: string[] = []
    let cursor = from.startOf('day')
    const last = to.startOf('day')

    while (cursor.isBefore(last) || cursor.isSame(last, 'day')) {
        keys.push(cursor.format('YYYY-MM-DD'))
        labels.push(`${cursor.date()} Th${cursor.month() + 1}`)
        cursor = cursor.add(1, 'day')
    }

    return { keys, labels }
}
