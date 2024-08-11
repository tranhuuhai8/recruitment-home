import type { PaginateParams, ParamsList } from '@/interface'
import dayjs from 'dayjs'

export const MONTHS = Array.from({ length: 12 }, (item, i) => {
    return dayjs(new Date(0, i)).format('MM')
})
export const CURRENT_MONTH = dayjs(new Date()).format('MM')
export const CURRENT_DAY = dayjs(new Date()).format('DD')
export const IMAGE_EXTENSIONS = ['jpeg', 'png', 'jpg']

export const FORMAT_DATE_DASH = 'YYYY-MM-DD'
export const FORMAT_DATE_SLASH = 'YYYY/MM/DD'
export const FORMAT_DATETIME_DASH = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT_DATETIME_SLASH = 'YYYY/MM/DD HH:mm:ss'
export const FORMAT_DAY_JP = 'YYYY年M月D日'
export const FORMAT_TIME = 'HH:mm:ss'

export const FALSE_VALUE = 0
export const PAGE_FIRST = 1
export const PER_PAGE = 10
export const MAX_STRING = 255
export const MIN_STRING = 8
export const MAX_STRING_50 = 50

export const STATUS_ACTIVE = 1
export const STATUS_INACTIVE = 2

export const INITIAL_PAGINATE: PaginateParams = {
    page: PAGE_FIRST,
    lastPage: 0,
    perPage: PER_PAGE,
    data: [],
    total: 0,
}

export const INITIAL_QUERY: ParamsList = {
    page: PAGE_FIRST,
    search: '',
    per_page: PER_PAGE,
    orders: [{ key: 'id', dir: 'desc' }],
    filters: [],
}

export const PAYLOAD_ALL: ParamsList = {
    all: 1,
}

export const DAY_LIST: {
    [key: number]: string
} = {
    1: '日',
    2: '月',
    3: '火',
    4: '水',
    5: '木',
    6: '金',
    7: '土',
}

export const ALL_OPTION = {
    label: '全て',
    value: 'all',
}

export const ROLE_ADMIN = 1
export const ROLE_EMPLOYER = 2
export const ROLE_APPLICANT = 3
