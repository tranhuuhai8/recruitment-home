import { FALSE_VALUE } from '@/libs'

export const INITIAL_TOTALS_DATA = {
    applicant: FALSE_VALUE,
    company: FALSE_VALUE,
    job: FALSE_VALUE,
    application_acceptance_rate: FALSE_VALUE,
    total_applications: FALSE_VALUE,
}

export const INITIAL_CHART_DATA = {
    labels: [],
    datasets: [],
}

export const INITIAL_NEEDS_ATTENTION = {
    pending_contacts: FALSE_VALUE,
    failed_mails: FALSE_VALUE,
}

export const DEFAULT_RANGE = 'month'
