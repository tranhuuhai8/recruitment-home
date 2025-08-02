import { FALSE_VALUE, INITIAL_QUERY, PER_PAGE_MST, SORT_TYPE_ASC } from '@/libs'

export const INITIAL_QUERY_MST = {
    ...INITIAL_QUERY,
    per_page: PER_PAGE_MST,
    orders: [{ key: 'name', dir: SORT_TYPE_ASC }],
    filters: [],
}

export const INITIAL_FORM_SEARCH = {
    search: '',
    status: FALSE_VALUE,
    gender: FALSE_VALUE,
}

export const INITIAL_FORM_APPLICANT = {
    name: '',
    avatar: '',
    mail_address: '',
    gender: FALSE_VALUE,
    birthday: '',
    telephone: '',
    address: '',
    description: '',
}
