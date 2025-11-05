import { GENDER_MALE, FALSE_VALUE, INITIAL_QUERY, SORT_TYPE_ASC } from '@/libs'

export const INITIAL_QUERY_APPLICANT = {
    ...INITIAL_QUERY,
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
