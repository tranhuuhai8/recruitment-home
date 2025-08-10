import {
    FALSE_VALUE,
    FILTER_PARENT,
    INITIAL_QUERY,
    PAYLOAD_ALL,
    PER_PAGE_MST,
    SORT_TYPE_ASC,
    STATUS_ACTIVE,
    TYPE_DEFAULT,
} from '@/libs'

export const INITIAL_QUERY_MST = {
    ...INITIAL_QUERY,
    per_page: PER_PAGE_MST,
    orders: [{ key: 'name', dir: SORT_TYPE_ASC }],
    filters: [],
}

export const QUERY_MST_PARENT = {
    ...PAYLOAD_ALL,
    ...FILTER_PARENT,
}

export const KEY_TAB_CITY = '1'
export const KEY_TAB_CATEGORY = '2'

export const INITIAL_FORM_SEARCH = {
    search: '',
    status: FALSE_VALUE,
}

export const FORM_CITY = {
    name: '',
    parent_id: null,
    description: '',
    status: STATUS_ACTIVE,
}

export const FORM_JOB_CATEGORY = {
    name: '',
    description: '',
    status: STATUS_ACTIVE,
    type: TYPE_DEFAULT,
    parent_id: null,
}

export const changeButton = (key: string) => {
    switch (key) {
        case '1':
            return `city`
        case '2':
            return `category`
    }
}
