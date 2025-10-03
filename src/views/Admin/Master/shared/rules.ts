import i18n from '@/lang'
import {
    MAX_STRING,
    REGEX_NO_SPECIAL_CHARS,
    REGEX_NO_SPECIAL_CHARS_DES,
} from '@/libs'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const cityRules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [
                t('masterData.labels.city_name'),
            ]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('masterData.labels.city_name'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS,
            message: t('validation.no_special_chars', [
                t('masterData.labels.city_name'),
            ]),
        },
    ],
    description: [
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('masterData.labels.description'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS_DES,
            message: t('validation.no_special_chars', [
                t('masterData.labels.description'),
            ]),
        },
    ],
}

export const categoryRules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [
                t('masterData.labels.category_name'),
            ]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('masterData.labels.category_name'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS,
            message: t('validation.no_special_chars', [
                t('masterData.labels.city_name'),
            ]),
        },
    ],
    description: [
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('masterData.labels.description'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS_DES,
            message: t('validation.no_special_chars', [
                t('masterData.labels.description'),
            ]),
        },
    ],
}
