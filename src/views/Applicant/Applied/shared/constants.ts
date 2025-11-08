import { FALSE_VALUE } from '@/libs'
import { INITIAL_QUERY, ORDER_CREATED_DESC } from '@/libs'

export const INITIAL_FORM_SEARCH = {
    search: '',
    status: FALSE_VALUE,
    created_at: null,
}

export const INITIAL_QUERY_APPLY = {
    ...INITIAL_QUERY,
    orders: [ORDER_CREATED_DESC],
}
