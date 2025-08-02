import i18n from '@/lang'
import {
    MAX_SHORT_NAME,
    MAX_STRING,
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
    ],
    website: [
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('company.labels.website'),
                1: MAX_STRING,
            }),
        },
    ],
}
