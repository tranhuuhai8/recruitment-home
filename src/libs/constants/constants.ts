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
export const IMAGE_EXTENSIONS = ['image/jpeg', 'image/png', 'image/jpg']
export const ALLOWED_TYPE_PDF = 'application/pdf'

export const FORMAT_DATE_DASH = 'YYYY-MM-DD'
export const FORMAT_DATE_SLASH = 'YYYY/MM/DD'
export const FORMAT_DATETIME_DASH = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT_DATETIME_SLASH = 'YYYY/MM/DD HH:mm:ss'
export const FORMAT_DAY_JP = 'YYYY年M月D日'
export const FORMAT_TIME = 'HH:mm:ss'

export const FALSE_VALUE = 0
export const TRUE_VALUE = 1
export const KEY_LOGOUT = 999
export const PAGE_FIRST = 1
export const PER_PAGE = 20
export const PER_PAGE_MST = 30
export const PER_PAGE_HOME = 12
export const MAX_STRING = 255
export const MIN_STRING = 8
export const MAX_SHORT_NAME = 10
export const MAX_STRING_50 = 50

export const API_URL = import.meta.env.VITE_PUBLIC_APP_API
export const MAX_SIZE_IMAGE = +import.meta.env.VITE_MAX_SIZE_IMAGE
export const MAX_SIZE_PDF = +import.meta.env.VITE_MAX_SIZE_PDF
export const MAX_FILE_UPLOAD = 12

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

export const ORDER_CREATED_DESC = {
    key: 'created_at',
    dir: SORT_TYPE_DESC,
}

export const FILTER_PARENT = {
    key: 'parent_id',
    value: null,
}

export const QUERY_MST_PARENT = {
    ...PAYLOAD_ALL,
    ...FILTER_PARENT,
}

export const QUERY_GET_TREE = { ...INITIAL_QUERY, ...PAYLOAD_ALL }

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

export const OPTION_TREE_FIRST = {
    title: t('all'),
    value: 0,
}

export const STATUS_ACTIVE = 1
export const STATUS_INACTIVE = 2
export const STATUS_LOCKED = 3

export const STATUS_PENDING = 1
export const STATUS_REVIEWED = 2
export const STATUS_ACCEPTED = 3
export const STATUS_REJECTED = 4

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
    2: t('status.unverified'),
    3: t('status.locked'),
}

export const STATUS_JOB_OPTIONS_SEARCH: Record<number, string> = {
    1: t('status.draft'),
    2: t('status.open'),
    3: t('status.closed'),
}

export const STATUS_APPLY_OPTIONS_SEARCH: Record<number, string> = {
    1: t('status.pending'),
    2: t('status.reviewed'),
    3: t('status.accepted'),
    4: t('status.rejected'),
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
        label: t('status.unverified'),
        value: STATUS_INACTIVE,
        disabled: true,
    },
    {
        label: t('status.locked'),
        value: STATUS_LOCKED,
    },
]

export const STATUS_APPLY_FORM = [
    {
        label: t('status.pending'),
        value: STATUS_PENDING,
    },
    {
        label: t('status.reviewed'),
        value: STATUS_REVIEWED,
    },
    {
        label: t('status.accepted'),
        value: STATUS_ACCEPTED,
    },
    {
        label: t('status.rejected'),
        value: STATUS_REJECTED,
    },
]

export const STATUS_MAP: Record<number, string> = {
    1: 'active',
    2: 'unverified',
    3: 'locked',
}

export const STATUS_JOB_MAP: Record<number, string> = {
    1: 'draft',
    2: 'open',
    3: 'closed',
}

export const STATUS_APPLY_MAP: Record<number, string> = {
    1: 'pending',
    2: 'reviewed',
    3: 'accepted',
    4: 'rejected',
}

export const TYPE_JOB_MAP: Record<number, string> = {
    1: 'full_time',
    2: 'part_time',
}

export const TYPE_OPTIONS_SEARCH: Record<number, string> = {
    1: t('type.default'),
    2: t('type.customize'),
}

export const TYPE_JOB_OPTIONS_SEARCH: Record<number, string> = {
    1: t('type.full_time'),
    2: t('type.part_time'),
}

export const NOTIFY_FREQUENCY_OPTIONS: Record<number, string> = {
    0: t('option.notify_frequency.off'),
    1: t('option.notify_frequency.daily'),
    7: t('option.notify_frequency.weekly'),
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
