import {
    FALSE_VALUE,
    INITIAL_QUERY,
    PER_PAGE_MST,
    SORT_TYPE_ASC,
    TRUE_VALUE,
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
    type: FALSE_VALUE,
    start_date: null,
    end_date: null,
}

export const INITIAL_FORM_JOB = {
    title: '',
    banner: null,
    job_category_id: null,
    number_of_recruitment: null,
    start_date: null,
    end_date: null,
    status: TRUE_VALUE,
    type: TRUE_VALUE,
    city_id: null,
    description: '',
    salary_min: null,
    salary_max: null,
}
