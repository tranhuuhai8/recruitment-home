import i18n from '@/lang'
import { MAX_STRING } from '@/libs'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const cityRules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [t('masterData.labels.name')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('masterData.labels.name'),
                1: MAX_STRING,
            }),
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
    ],
}

export const categoryRules: Record<string, Rule[]> = {
    name: [
        {
            required: true,
            message: t('validation.required', [t('masterData.labels.name')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('masterData.labels.name'),
                1: MAX_STRING,
            }),
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
    ],
}
