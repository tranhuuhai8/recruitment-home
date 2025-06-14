import type { Result } from './commonInterface'
import type { User } from './userInterface'

export interface Company {
    id: number
    logo?: string
    cover_img?: string
    name: string
    short_name: string
    telephone: string
    address: string
    city_id?: number
    website: string
    user?: User
    description: string
    created_at: string
    updated_at?: string
}

export interface CompanyResult extends Result {
    data?: Company[]
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
    address: string
    website: string
    status: number | string
    description: string
}
