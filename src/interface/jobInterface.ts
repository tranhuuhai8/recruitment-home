import type { Result } from './commonInterface'
import type { Company } from './companyInterface'
import type { City, JobCategory } from './masterDataInterface'

export interface Job {
    id: number
    name: string
    banner?: string
    number_of_recruitment: number | string
    address_detail: string
    start_date: string
    end_date: string
    description: string
    request_detail: string
    contact_detail: string
    city_id: number
    company_id: number
    job_category_id: number
    city?: City
    company?: Company
    job_category?: JobCategory
    city_name?: string
    job_category_name?: string
    company_name?: string
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
    city_id?: number
    job_category_id?: number
    start_date: string | null
    end_date: string | null
}

export interface FormDataJob {
    name: string
    banner?: string
    number_of_recruitment: number | string
    address_detail: string
    start_date: string
    end_date: string
    description: string
    request_detail: string
    contact_detail: string
    city_id: number
    company_id: number
    job_category_id: number
    status: number
    type: number
}
