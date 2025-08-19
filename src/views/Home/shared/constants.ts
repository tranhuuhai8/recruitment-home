import { FILTER_PARENT, PAYLOAD_ALL } from '@/libs'

export const FORM_SEARCH_HOME = {
    search: '',
    city_id: [],
    category_id: [],
}

export const QUERY_MST_PARENT = {
    ...PAYLOAD_ALL,
    ...FILTER_PARENT,
}
