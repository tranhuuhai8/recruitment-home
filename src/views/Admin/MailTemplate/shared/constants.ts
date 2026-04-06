import { FALSE_VALUE, INITIAL_QUERY, SORT_TYPE_DESC } from '@/libs'
import type { IMailTemplateDto } from '@/interface'
import i18n from '@/lang'

const { t } = i18n

export const INITIAL_QUERY_MAIL_TEMPLATE = {
    ...INITIAL_QUERY,
    orders: [{ key: 'id', dir: SORT_TYPE_DESC }],
    filters: [],
}

export const INITIAL_FORM_SEARCH = {
    search: '',
    is_active: '' as string | number,
    type: FALSE_VALUE,
}

export const INITIAL_FORM_MAIL_TEMPLATE: IMailTemplateDto = {
    name: '',
    code: '',
    subject: '',
    body: '',
    variables: [],
    type: 2,
    is_active: true,
}

export const MAIL_TEMPLATE_TYPE_MAP: Record<
    number,
    { label: string; color: string }
> = {
    1: {
        label: t('contact.mail_template.type_opts.confirmation'),
        color: 'blue',
    },
    2: { label: t('contact.mail_template.type_opts.reply'), color: 'green' },
    3: {
        label: t('contact.mail_template.type_opts.notification'),
        color: 'orange',
    },
}

export const TYPE_OPTIONS = [
    { label: t('contact.mail_template.type_opts.confirmation'), value: 1 },
    { label: t('contact.mail_template.type_opts.reply'), value: 2 },
    { label: t('contact.mail_template.type_opts.notification'), value: 3 },
]

// Record options dùng với getObjOptions (tự thêm Tất cả)
export const MAIL_TEMPLATE_TYPE_OPTIONS_SEARCH: Record<number, string> = {
    1: t('contact.mail_template.type_opts.confirmation'),
    2: t('contact.mail_template.type_opts.reply'),
    3: t('contact.mail_template.type_opts.notification'),
}

// Array thủ công vì is_active có giá trị 0/1 trong DB (không dùng getObjOptions tránh conflict)
export const IS_ACTIVE_OPTIONS = [
    { label: t('all'), value: '' },
    { label: t('contact.mail_template.active'), value: 1 },
    { label: t('contact.mail_template.inactive'), value: 0 },
]
