import { FALSE_VALUE, INITIAL_QUERY, SORT_TYPE_DESC } from '@/libs'
import i18n from '@/lang'

const { t } = i18n

// ─── Query defaults ────────────────────────────────────────────────────────────
export const INITIAL_QUERY_CONTACT = {
    ...INITIAL_QUERY,
    orders: [{ key: 'id', dir: SORT_TYPE_DESC }],
    filters: [],
}

export const INITIAL_FORM_SEARCH = {
    search: '',
    status: FALSE_VALUE,
    priority: FALSE_VALUE,
}

// ─── Status / Priority maps ────────────────────────────────────────────────────
export const CONTACT_STATUS_MAP: Record<
    number,
    { label: string; color: string }
> = {
    1: { label: t('contact.sender.status_opts.new'), color: 'blue' },
    2: { label: t('contact.sender.status_opts.read'), color: 'default' },
    3: { label: t('contact.sender.status_opts.processing'), color: 'warning' },
    4: { label: t('contact.sender.status_opts.resolved'), color: 'success' },
    5: { label: t('contact.sender.status_opts.spam'), color: 'error' },
}

export const CONTACT_PRIORITY_MAP: Record<
    number,
    { label: string; color: string }
> = {
    1: { label: t('contact.sender.priority_opts.low'), color: 'default' },
    2: { label: t('contact.sender.priority_opts.normal'), color: 'blue' },
    3: { label: t('contact.sender.priority_opts.high'), color: 'orange' },
    4: { label: t('contact.sender.priority_opts.urgent'), color: 'red' },
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

// ─── Select options (dùng trong form update) ─────────────────────────────────
export const STATUS_OPTIONS = [
    { label: t('contact.sender.status_opts.new'), value: 1 },
    { label: t('contact.sender.status_opts.read'), value: 2 },
    { label: t('contact.sender.status_opts.processing'), value: 3 },
    { label: t('contact.sender.status_opts.resolved'), value: 4 },
    { label: t('contact.sender.status_opts.spam'), value: 5 },
]

// ─── Record options (dùng với getObjOptions cho search filter) ─────────────────
export const CONTACT_STATUS_OPTIONS_SEARCH: Record<number, string> = {
    1: t('contact.sender.status_opts.new'),
    2: t('contact.sender.status_opts.read'),
    3: t('contact.sender.status_opts.processing'),
    4: t('contact.sender.status_opts.resolved'),
    5: t('contact.sender.status_opts.spam'),
}

export const PRIORITY_OPTIONS = [
    { label: t('contact.sender.priority_opts.low'), value: 1 },
    { label: t('contact.sender.priority_opts.normal'), value: 2 },
    { label: t('contact.sender.priority_opts.high'), value: 3 },
    { label: t('contact.sender.priority_opts.urgent'), value: 4 },
]

// Record options dùng với getObjOptions cho search filter
export const CONTACT_PRIORITY_OPTIONS_SEARCH: Record<number, string> = {
    1: t('contact.sender.priority_opts.low'),
    2: t('contact.sender.priority_opts.normal'),
    3: t('contact.sender.priority_opts.high'),
    4: t('contact.sender.priority_opts.urgent'),
}
