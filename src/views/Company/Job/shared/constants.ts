import { FALSE_VALUE, TRUE_VALUE } from '@/libs'

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
    notify_frequency: FALSE_VALUE,
}
