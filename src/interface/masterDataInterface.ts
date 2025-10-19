import type { Result } from './commonInterface'

export interface City {
    id: number
    name: string
    description: string
    status: number
    parent?: City
    created_at: string
    updated_at?: string
}

export interface CityForm {
    name: string
    parent_id: number | null
    description: string
    status: number
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

export interface JobCategoryForm {
    name: string
    parent_id: number | null
    description: string
    status: number
    type: number
}

export interface JobCategoryResult extends Result {
    data?: JobCategory[]
}

export interface FormSearchMst {
    search: string
    parent_id?: number | null | Array<number>
    status: number
    type?: string | number | boolean
}
