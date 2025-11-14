import { FALSE_VALUE } from '@/libs'
import { type ChartOptions } from 'chart.js'

export const INITIAL_TOTALS_DATA = {
    applicant: FALSE_VALUE,
    company: FALSE_VALUE,
    job: FALSE_VALUE,
    application_acceptance_rate: FALSE_VALUE,
}

export const INITIAL_CHART_DATA = {
    labels: [],
    datasets: [],
}

export const barChartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            beginAtZero: true,
            ticks: { color: '#6B7280' },
            grid: { color: 'rgba(0,0,0,0.04)' },
        },
        y: {
            ticks: { color: '#6B7280' },
            grid: { display: false },
        },
    },
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (ctx) => `${ctx.parsed.x ?? ctx.parsed.y} việc`,
            },
        },
    },
}

export const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
        mode: 'index',
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            cornerRadius: 8,
            titleFont: {
                size: 14,
                weight: 'bold',
            },
            bodyFont: {
                size: 13,
            },
            displayColors: false,
            callbacks: {
                title: (context: Record<string, any>) => context[0].label,
                label: (context: Record<string, any>) =>
                    `${context.parsed.y} ứng viên ứng tuyển`,
            },
        },
        filler: {
            propagate: true,
        },
    },
    animation: {
        duration: 1500,
        easing: 'easeInOutQuart',
    },
}
