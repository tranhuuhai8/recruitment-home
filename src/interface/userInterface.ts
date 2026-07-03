import type { Applicant } from './applicantInterface'
import type { Company } from './companyInterface'

export interface LoginDto {
    mail_address: string
    password: string
    token?: string
}

export interface RegisterDto {
    mail_address: string
    password: string
    password_confirmation: string
    role: string
}

export interface ChangePasswordDto {
    old_password: string
    password: string
    password_confirmation: string
}

export interface ForgotPasswordDto {
    mail_address: string
}

export interface ResetPasswordDto {
    mail_address: string
    password: string
    password_confirmation: string
}

export interface User {
    id: number
    name: string
    mail_address: string
    role: number
    status: number
    created_at: string
    updated_at?: string
    applicant?: Applicant
    company?: Company
}

export interface PaginateUserParams {
    data?: User[]
}
