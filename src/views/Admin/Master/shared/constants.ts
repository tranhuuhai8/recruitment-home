import {
    INITIAL_QUERY,
    PER_PAGE_MST,
    STATUS_ACTIVE,
    TYPE_DEFAULT,
} from '@/libs'

export const INITIAL_QUERY_MST = {
    ...INITIAL_QUERY,
    per_page: PER_PAGE_MST,
    orders: [{ key: 'name', dir: 'ascending' }],
}

export const FORM_CITY = {
    name: '',
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
