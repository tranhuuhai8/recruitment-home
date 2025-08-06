import type { PaginateParams, ParamsList } from '@/interface'
import dayjs from 'dayjs'
import {
    APP_SIDEBAR_ADMIN,
    APP_SIDEBAR_APPLICANT,
    APP_SIDEBAR_BOTTOM,
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
export const TRUE_VALUE = 1
export const PAGE_FIRST = 1
export const PER_PAGE = 20
export const PER_PAGE_MST = 10
export const MAX_STRING = 255
export const MIN_STRING = 8
export const MAX_SHORT_NAME = 10
export const MAX_STRING_50 = 50

export const SORT_TYPE_ASC = 'ascending'
export const SORT_TYPE_DESC = 'descending'

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
    orders: [{ key: 'id', dir: SORT_TYPE_DESC }],
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
    label: t('all'),
    value: 0,
}

export const STATUS_ACTIVE = 1
export const STATUS_INACTIVE = 2

export const STATUS_SHOW = 1
export const STATUS_HIDE = 2

export const TYPE_DEFAULT = 1
export const TYPE_CUSTOMIZE = 2

export const GENDER_MALE = 1
export const GENDER_FEMALE = 2
export const GENDER_OTHER = 3

export const GENDER_OPTIONS_FORM = [
    {
        label: t('gender.male'),
        value: GENDER_MALE,
    },
    {
        label: t('gender.female'),
        value: GENDER_FEMALE,
    },
    {
        label: t('gender.other'),
        value: GENDER_OTHER,
    },
]

export const GENDER_OPTIONS_SEARCH: Record<number, string> = {
    1: t('gender.male'),
    2: t('gender.female'),
    3: t('gender.other'),
}

export const STATUS_DISPLAY_OPTIONS_SEARCH: Record<number, string> = {
    1: t('status.show'),
    2: t('status.hide'),
}

export const STATUS_OPTIONS_SEARCH: Record<number, string> = {
    1: t('status.active'),
    2: t('status.inactive'),
}

export const STATUS_DISPLAY_OPTIONS_FORM = [
    {
        label: t('status.show'),
        value: STATUS_SHOW,
    },
    {
        label: t('status.hide'),
        value: STATUS_HIDE,
    },
]

export const STATUS_OPTIONS_FORM = [
    {
        label: t('status.active'),
        value: STATUS_ACTIVE,
    },
    {
        label: t('status.inactive'),
        value: STATUS_INACTIVE,
    },
]

export const TYPE_OPTIONS_SEARCH: Record<number, string> = {
    1: t('type.default'),
    2: t('type.customize'),
}

export const TYPE_OPTIONS_FORM = [
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

const mergeSidebarWithBottom = (
    baseSidebar: Record<string, any>,
    bottomSidebar: Record<string, any>
) => {
    const merged = { ...baseSidebar }
    const baseOrders = Object.values(merged).map((item: any) => item.order ?? 0)
    const maxOrder = Math.max(...baseOrders, 0)

    let orderOffset = 1
    for (const [key, itemRaw] of Object.entries(bottomSidebar)) {
        const item = itemRaw as Record<string, any>
        merged[key] = {
            ...item,
            order: maxOrder + orderOffset++,
        }
    }

    return merged
}

export const SIDEBAR_BY_ROLE: Record<number, any> = {
    [ROLE_ADMIN]: mergeSidebarWithBottom(APP_SIDEBAR_ADMIN, APP_SIDEBAR_BOTTOM),
    [ROLE_COMPANY]: mergeSidebarWithBottom(
        APP_SIDEBAR_COMPANY,
        APP_SIDEBAR_BOTTOM
    ),
    [ROLE_APPLICANT]: mergeSidebarWithBottom(
        APP_SIDEBAR_APPLICANT,
        APP_SIDEBAR_BOTTOM
    ),
}
