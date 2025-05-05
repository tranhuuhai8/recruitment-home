import type { PaginateParams, ParamsList } from '@/interface'
import dayjs from 'dayjs'
import {
    APP_SIDEBAR_ADMIN,
    APP_SIDEBAR_APPLICANT,
    APP_SIDEBAR_COMPANY,
} from '../utils/links'
import i18n from '@/lang'

const { t } = i18n

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
export const PER_PAGE_MST = 8
export const MAX_STRING = 255
export const MIN_STRING = 8
export const MAX_STRING_50 = 50

export const STATUS_ACTIVE = 1
export const STATUS_INACTIVE = 2

export const STATUS_SHOW = 1
export const STATUS_HIDE = 2

export const TYPE_DEFAULT = 1
export const TYPE_CUSTOMIZE = 2

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

export const STATUS_ACTIVE_OPTIONS = [
    {
        label: t('status.active'),
        value: STATUS_ACTIVE,
    },
    {
        label: t('status.inactive'),
        value: STATUS_INACTIVE,
    },
]

export const STATUS_DISPLAY_OPTIONS = [
    {
        label: t('status.show'),
        value: STATUS_SHOW,
    },
    {
        label: t('status.hide'),
        value: STATUS_HIDE,
    },
]

export const TYPE_OPTIONS = [
    {
        label: t('type.default'),
        value: TYPE_DEFAULT,
    },
    {
        label: t('type.customize'),
        value: TYPE_CUSTOMIZE,
    },
]

export const ROLE_ADMIN = 1
export const ROLE_COMPANY = 2
export const ROLE_APPLICANT = 3

export const ROLE_PATH_PREFIX: Record<number, string> = {
    [ROLE_ADMIN]: 'admin',
    [ROLE_COMPANY]: 'company',
    [ROLE_APPLICANT]: 'applicant',
}

export const SIDEBAR_BY_ROLE: Record<number, any> = {
    [ROLE_ADMIN]: APP_SIDEBAR_ADMIN,
    [ROLE_COMPANY]: APP_SIDEBAR_COMPANY,
    [ROLE_APPLICANT]: APP_SIDEBAR_APPLICANT,
}
