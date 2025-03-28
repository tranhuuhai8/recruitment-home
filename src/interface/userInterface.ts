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
    data?: User[]
}
