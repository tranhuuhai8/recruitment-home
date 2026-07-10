import type { Result } from './commonInterface'
import type { Company } from './companyInterface'
import type { City, JobCategory } from './masterDataInterface'

export interface Job {
    id: number | null
    slug?: string
    title: string
    banner?: string
    number_of_recruitment: number | string
    start_date: string
    end_date: string
    description: string
    city_id: number | null
    company_id: number | null
    job_category_id: number | null
    city?: City
    company?: Company
    job_category?: JobCategory
    city_name?: string
    job_category_name?: string
    company_name?: string
    company_slug?: string
    last_sent_notify?: string
    notify_frequency?: number
    status: number
    type: number
    created_at: string
    updated_at?: string
}

export interface JobResult extends Result {
    data?: Job[]
}

export interface FormSearchJob {
    search: string
    status?: number
    type?: number
    city_id?: number | number[]
    job_category_id?: number | number[]
    start_date?: string | null
    end_date?: string | null
}

export interface FormDataJob {
    title: string
    banner: string | null
    number_of_recruitment: number | string | null
    start_date: string | Date | null
    end_date: string | Date | null
    description: string
    city_id: number | null
    job_category_id: number | null
    status: number
    type: number
    notify_frequency?: number
    salary_min: number | null
    salary_max: number | null
}

export interface JobApplication {
    id?: number
    applicant_id: number | null
    job_id: number | null
    job_title?: string
    full_name?: string
    email?: string
    telephone?: string
    file_name: string
    file_path: string
    file_size?: number
    application_file_id: number | null
    cover_letter: string
    guest_name: string
    guest_email: string
    guest_telephone: string
    application_file?: ApplicationFile
    status?: number
    created_at?: string
    updated_at?: string
    source_cv?: string
}

export interface JobFavorite {
    id: number
    job_id: number
    applicant_id: number
    full_name?: string
    email?: string
    telephone?: string
    created_at: string
}

export interface JobFavoriteResult extends Result {
    data?: JobFavorite[]
}

export interface FormSearchJobApply {
    search: string
    status: number
    created_at: string | null
}

export interface SavedJob {
    id: number
    slug?: string
    title: string
    company_name?: string
    company_slug?: string
    is_applied: boolean
    created_at?: string
}

export interface SavedJobResult extends Result {
    data?: SavedJob[]
}

export interface FormSearchSavedJob {
    search: string
    is_applied: number | string
}

export interface JobApplicationResult extends Result {
    data?: JobApplication[]
}

export interface ApplicationFile {
    id: number
    applicant_id: number | null
    file_name: string
    file_path: string
    file_type: string
    file_size: number
    created_at?: string
    updated_at?: string
}
