import {
    PREFIX_ROLE_ADMIN,
    PREFIX_ROLE_APPLICANT,
    PREFIX_ROLE_COMPANY,
} from './constants'

export const PAGE_NOT_FOUND = 'page-not-found'

export const ROUTER_AUTH = [
    'login',
    'register',
    'forgot-password',
    'reset-password',
]

export const ROUTE_PATH_MANAGER = [
    PREFIX_ROLE_ADMIN,
    PREFIX_ROLE_COMPANY,
    PREFIX_ROLE_APPLICANT,
]

export const ROUTE_NAME_DASHBOARD = {
    1: 'admin-dashboard',
    2: 'applicant-dashboard',
    3: 'company-dashboard',
    undefined: '',
} as any
