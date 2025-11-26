import { FALSE_VALUE } from '@/libs'

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

export const makeDataJobApplication = (items: Record<string, any>[]) => {
    const today = new Date()
    const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    ).getDate()

    const labels = []
    const data = []

    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`

        const day = i
        const month = today.getMonth() + 1
        labels.push(`${day} Th${month}`)

        const record = items.find((item) => item.date === dateStr)
        data.push(record ? record.count : FALSE_VALUE)
    }

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
