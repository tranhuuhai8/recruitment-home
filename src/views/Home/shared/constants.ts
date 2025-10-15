import type { Company } from '@/interface'

export const FORM_SEARCH_HOME = {
    search: '',
    city_id: [],
    job_category_id: [],
}

export const INITIAL_FORM_SEARCH_JOB = {
    search: '',
    job_category_id: [],
}

export const INITIAL_COMPANY_INFO_NULL: Company = {
    id: null,
    name: '',
    short_name: '',
    telephone: '',
    address: '',
    website: '',
    description: '',
    created_at: '',
}
