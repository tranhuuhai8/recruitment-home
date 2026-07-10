import type { Result } from './commonInterface'
import type { City } from './masterDataInterface'
import type { User } from './userInterface'

export interface Company {
    id: number | null
    user_id?: number
    slug?: string
    logo?: string
    cover_img?: string
    name: string
    short_name: string
    telephone: string
    address: string
    city_id?: number
    website: string
    user?: User
    city?: City
    city_name?: string
    jobs_count?: number
    followers_count?: number
    description: string
    created_at: string
    updated_at?: string
}

export interface CompanyResult extends Result {
    data?: Company[]
}

export interface FollowedCompany extends Company {
    notify_new_job?: boolean
}

export interface FollowedCompanyResult extends Result {
    data?: FollowedCompany[]
}

export interface CompanyFollower {
    id: number
    applicant_id: number
    full_name?: string
    email?: string
    telephone?: string
    company_id?: number
    company_name?: string
    company_logo?: string
    notify_new_job: boolean
    created_at: string
}

export interface CompanyFollowerResult extends Result {
    data?: CompanyFollower[]
}

export interface FormSearchCompany {
    search: string
}

export interface FormDataCompany {
    logo?: string
    cover_img?: string
    name: string
    mail_address: string
    short_name: string
    telephone: string
    city_id: number | null
    address: string
    website: string
    status: number | string
    description: string
}
