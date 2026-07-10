import { INITIAL_QUERY, ORDER_CREATED_DESC } from '@/libs'

export const INITIAL_FORM_SEARCH = {
    search: '',
    is_applied: 0,
}

export const INITIAL_QUERY_SAVED_JOBS = {
    ...INITIAL_QUERY,
    orders: [ORDER_CREATED_DESC],
}
