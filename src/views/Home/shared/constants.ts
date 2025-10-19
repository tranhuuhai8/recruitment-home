import type { Company, Job } from '@/interface'
import { FALSE_VALUE } from '@/libs'

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

export const INITIAL_JOB_INFO_NULL: Job = {
    id: null,
    title: '',
    number_of_recruitment: FALSE_VALUE,
    start_date: '',
    end_date: '',
    description: '',
    city_id: null,
    company_id: null,
    job_category_id: null,
    status: 0,
    type: 0,
    created_at: '',
}
