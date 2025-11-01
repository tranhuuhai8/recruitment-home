import i18n from '@/lang'
import {
    MAX_SHORT_NAME,
    MAX_STRING,
    REGEX_NO_SPECIAL_CHARS,
    REGEX_NO_SPECIAL_CHARS_DES,
    REGEX_WEBSITE,
    validateEmail,
    validatePhoneNumber,
} from '@/libs'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [t('company.labels.name')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('company.labels.name'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS,
            message: t('validation.no_special_chars', [
                t('company.labels.name'),
            ]),
        },
    ],
    short_name: [
        {
            required: true,
            message: t('validation.required', [t('company.labels.short_name')]),
        },
        {
            max: MAX_SHORT_NAME,
            message: t('validation.max.string', {
                0: t('company.labels.short_name'),
                1: MAX_SHORT_NAME,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS,
            message: t('validation.no_special_chars', [
                t('company.labels.short_name'),
            ]),
        },
    ],
    mail_address: [
        {
            required: true,
            message: t('validation.required', [t('auth.labels.mail_address')]),
            trigger: 'blur',
        },
        {
            validator: (_: any, value: any) => validateEmail(_, value),
            trigger: 'blur',
        },
    ],
    telephone: [
        {
            required: true,
            message: t('validation.required', [t('company.labels.telephone')]),
        },
        {
            validator: (_: any, value: any) => validatePhoneNumber(_, value),
            trigger: 'blur',
        },
    ],
    city_id: [
        {
            required: true,
            message: t('validation.required', [t('company.labels.city')]),
            trigger: 'blur',
        },
    ],
    address: [
        {
            required: true,
            message: t('validation.required', [t('company.labels.address')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('company.labels.address'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS_DES,
            message: t('validation.no_special_chars', [
                t('company.labels.address'),
            ]),
        },
    ],
    website: [
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('company.labels.website'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_WEBSITE,
            message: t('validation.url_format', [t('company.labels.website')]),
        },
    ],
}
