import type { Result } from './commonInterface'

export interface City {
    id: number
    name: string
    description: string
    status: number
    created_at: string
    updated_at?: string
}

export interface CityResult extends Result {
    data?: City[]
}

export interface JobCategory {
    id: number
    name: string
    description: string
    status: number
    type: number
    parent_id: number
    created_at: string
    updated_at?: string
}

export interface JobCategoryResult extends Result {
    data?: JobCategory[]
}

export interface FormSearchMst {
    search: string
    status: number
    type?: string | number | boolean
}
