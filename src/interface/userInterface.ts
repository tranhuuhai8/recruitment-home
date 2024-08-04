export interface LoginDto {
    mail_address: string
    password: string
}
export interface User {
    id: number
    name: string
    mail_address: string
    created_at: string
    updated_at?: string
}

export interface PaginateUserParams {
    data?: {
        id: number
        full_name: string
        tel: string
        created_at: string
        first_experience_date: string
        last_session_date: string
        is_active: string
        plane_type: string
    }[]
}
