import {
    GENDER_MALE,
    INITIAL_QUERY,
    PER_PAGE_MST,
    SORT_TYPE_ASC,
    FALSE_VALUE,
} from '@/libs'

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
    gender: GENDER_MALE,
    birthday: '',
    telephone: '',
    address: '',
    description: '',
}
