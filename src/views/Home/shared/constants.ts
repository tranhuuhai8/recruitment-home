import type { Company, Job, JobApplication } from '@/interface'
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

export const INITIAL_FORM_APPLY: JobApplication = {
    applicant_id: null,
    job_id: FALSE_VALUE,
    file_name: '',
    file_path: '',
    file_size: FALSE_VALUE,
    application_file_id: null,
    cover_letter: '',
    guest_name: '',
    guest_email: '',
    guest_telephone: '',
}
