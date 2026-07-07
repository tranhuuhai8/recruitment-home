import { type ChartOptions } from 'chart.js'

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

export const doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#6B7280',
                boxWidth: 12,
                padding: 16,
            },
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            cornerRadius: 8,
        },
    },
}

export const DOUGHNUT_COLORS_JOB = [
    'rgba(245, 166, 35, 0.85)',
    'rgba(139, 139, 139, 0.85)',
    'rgba(74, 144, 226, 0.85)',
]

export const DOUGHNUT_COLORS_STATUS_APPLIED = [
    'rgba(18, 204, 71, 0.85)',
    'rgba(208, 2, 27, 0.85)',
    'rgba(74, 144, 226, 0.85)',
    'rgba(245, 166, 35, 0.85)',
    'rgba(155, 89, 182, 0.85)',
]
