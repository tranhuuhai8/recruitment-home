import { FALSE_VALUE, INITIAL_QUERY, SORT_TYPE_DESC } from '@/libs'
import i18n from '@/lang'

const { t } = i18n

export const INITIAL_QUERY_MAIL_LOG = {
    ...INITIAL_QUERY,
    orders: [{ key: 'id', dir: SORT_TYPE_DESC }],
    filters: [],
}

export const INITIAL_FORM_SEARCH = {
    search: '',
    status: FALSE_VALUE,
}

export const MAIL_LOG_STATUS_MAP: Record<
    number,
    { label: string; color: string }
> = {
    1: { label: t('contact.mail_log.status_opts.pending'), color: 'default' },
    2: { label: t('contact.mail_log.status_opts.sent'), color: 'success' },
    3: { label: t('contact.mail_log.status_opts.failed'), color: 'error' },
    4: { label: t('contact.mail_log.status_opts.bounced'), color: 'warning' },
}

// Record options dùng với getObjOptions (tự thêm Tất cả)
export const MAIL_LOG_STATUS_OPTIONS_SEARCH: Record<number, string> = {
    1: t('contact.mail_log.status_opts.pending'),
    2: t('contact.mail_log.status_opts.sent'),
    3: t('contact.mail_log.status_opts.failed'),
    4: t('contact.mail_log.status_opts.bounced'),
}

// Array options dùng cho form khác nếu cần
export const STATUS_OPTIONS = [
    { label: t('contact.mail_log.status_opts.pending'), value: 1 },
    { label: t('contact.mail_log.status_opts.sent'), value: 2 },
    { label: t('contact.mail_log.status_opts.failed'), value: 3 },
    { label: t('contact.mail_log.status_opts.bounced'), value: 4 },
]
