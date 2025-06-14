import { Dayjs } from 'dayjs'
import type { Result } from './commonInterface'
import type { User } from './userInterface'

export interface Applicant {
    id: number
    name: string
    avatar?: string
    gender: number | string
    birthday: Date | string
    telephone: string
    address: string
    description: string
    user?: User
    created_at: string
    updated_at?: string
}

export interface ApplicantResult extends Result {
    data?: Applicant[]
}

export interface FormSearchApplicant {
    search: string
    status: number | string
}

export interface FormDataApplicant {
    name: string
    avatar?: string
    gender: number | string
    mail_address: string
    birthday: Dayjs | string
    telephone: string
    address: string
    description: string
    status: number | string
}
