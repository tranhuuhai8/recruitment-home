import i18n from '@/lang'
import { MAX_STRING, validateEmail, validatePhoneNumber } from '@/libs'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const applyJobRules: Record<string, Rule[]> = {
    application_file_id: [
        {
            required: true,
            message: t('validation.required', [
                t('home.job.modal.labels.application_file_id'),
            ]),
        },
    ],
    file_name: [
        {
            required: true,
            message: t('validation.required', [
                t('home.job.modal.labels.application_file_id'),
            ]),
        },
    ],
    guest_name: [
        {
            required: true,
            message: t('validation.required', [
                t('home.job.modal.labels.guest_name'),
            ]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('home.job.modal.labels.guest_name'),
                1: MAX_STRING,
            }),
        },
    ],
    guest_email: [
        {
            required: true,
            message: t('validation.required', [
                t('home.job.modal.labels.guest_email'),
            ]),
            trigger: 'blur',
        },
        {
            validator: (_: any, value: any) => validateEmail(_, value),
            trigger: 'blur',
        },
    ],
    guest_telephone: [
        {
            required: true,
            message: t('validation.required', [
                t('home.job.modal.labels.guest_telephone'),
            ]),
        },
        {
            validator: (_: any, value: any) => validatePhoneNumber(_, value),
            trigger: 'blur',
        },
    ],
    cover_letter: [
        {
            required: true,
            message: t('validation.required', [
                t('home.job.modal.labels.cover_letter'),
            ]),
        },
    ],
}
