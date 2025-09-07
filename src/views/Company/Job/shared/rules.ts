import i18n from '@/lang'
import { MAX_STRING } from '@/libs'
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
}
