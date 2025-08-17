import { ROLE_ADMIN, ROLE_APPLICANT, ROLE_COMPANY } from './constants'

export const PAGE_NOT_FOUND = 'not-found'

export const ROUTER_AUTH = [
    'login',
    'register',
    'forgot-password',
    'reset-password',
]

export const ROUTE_CHANGE_PASSWORD = 'change-password'

export const PREFIX_ROLE_ADMIN = 'admin'
export const PREFIX_ROLE_COMPANY = 'company'
export const PREFIX_ROLE_APPLICANT = 'applicant'

export const ROLE_PATH_PREFIX: Record<number, string> = {
    [ROLE_ADMIN]: PREFIX_ROLE_ADMIN,
    [ROLE_COMPANY]: PREFIX_ROLE_COMPANY,
    [ROLE_APPLICANT]: PREFIX_ROLE_APPLICANT,
}

export const ROUTE_PATH_MANAGER = [
    PREFIX_ROLE_ADMIN,
    PREFIX_ROLE_COMPANY,
    PREFIX_ROLE_APPLICANT,
]

export const ROUTE_NAME_DASHBOARD = {
    1: 'admin-dashboard',
    2: 'company-dashboard',
    3: 'applicant-dashboard',
    undefined: '',
} as any
