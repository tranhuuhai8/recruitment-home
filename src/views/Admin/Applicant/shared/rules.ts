import i18n from '@/lang'
import {
    MAX_STRING,
    REGEX_NO_SPECIAL_CHARS,
    REGEX_NO_SPECIAL_CHARS_DES,
    validateEmail,
    validatePhoneNumber,
} from '@/libs'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [t('applicant.labels.name')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('applicant.labels.name'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS,
            message: t('validation.no_special_chars', [
                t('applicant.labels.name'),
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
            message: t('validation.required', [
                t('applicant.labels.telephone'),
            ]),
        },
        {
            validator: (_: any, value: any) => validatePhoneNumber(_, value),
            trigger: 'blur',
        },
    ],
    birthday: [
        {
            required: true,
            message: t('validation.required', [t('applicant.labels.birthday')]),
        },
    ],
    address: [
        {
            required: true,
            message: t('validation.required', [t('applicant.labels.address')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('applicant.labels.address'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS_DES,
            message: t('validation.no_special_chars', [
                t('applicant.labels.address'),
            ]),
        },
    ],
}
