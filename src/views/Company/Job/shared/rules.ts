import i18n from '@/lang'
import { MAX_STRING, REGEX_NO_SPECIAL_CHARS_DES, validateInteger } from '@/libs'
import type { Rule } from 'ant-design-vue/es/form'

const { t } = i18n

export const rules: Record<string, Rule[]> = {
    title: [
        {
            required: true,
            message: t('validation.required', [t('job.labels.title')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', {
                0: t('job.labels.title'),
                1: MAX_STRING,
            }),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS_DES,
            message: t('validation.no_special_chars', [t('job.labels.title')]),
        },
    ],
    city_id: [
        {
            required: true,
            message: t('validation.required', [t('job.labels.city')]),
        },
    ],
    job_category_id: [
        {
            required: true,
            message: t('validation.required', [t('job.labels.category')]),
        },
    ],
    number_of_recruitment: [
        {
            required: true,
            message: t('validation.required', [
                t('job.labels.number_of_recruitment'),
            ]),
        },
        {
            validator: (_: any, value: any) =>
                validateInteger(
                    _,
                    value,
                    'job.labels.number_of_recruitment',
                    1
                ),
            trigger: 'blur',
        },
    ],
    description: [
        {
            required: true,
            message: t('validation.required', [t('job.labels.description')]),
        },
        {
            pattern: REGEX_NO_SPECIAL_CHARS_DES,
            message: t('validation.no_special_chars', [
                t('job.labels.description'),
            ]),
        },
    ],
}

export const getRuleDate = (form: Record<string, any>, isStart = false) => {
    const key = isStart ? 'start_date' : 'end_date'
    const startDate = new Date(form.start_date)
    const endDate = new Date(form.end_date)

    return [
        {
            required: true,
            message: t('validation.required', [t(`job.labels.${key}`)]),
        },
        {
            validator: async (_: any, value: any) => {
                const dateCurrent = new Date(value)

                if (
                    value &&
                    isStart &&
                    form.end_date &&
                    dateCurrent >= endDate
                ) {
                    return Promise.reject(
                        new Error(
                            t('validation.compare', {
                                0: t('job.labels.start_date'),
                                1: t('job.labels.end_date'),
                            })
                        )
                    )
                }
                if (
                    value &&
                    !isStart &&
                    form.start_date &&
                    dateCurrent <= startDate
                ) {
                    return Promise.reject(
                        new Error(
                            t('validation.compare', {
                                0: t('job.labels.start_date'),
                                1: t('job.labels.end_date'),
                            })
                        )
                    )
                }

                return Promise.resolve()
            },
        },
    ]
}

export const validateSalaryRange = (
    _: any,
    value: any,
    field: 'min' | 'max',
    form: Record<string, any>
) => {
    const min = form.salary_min
    const max = form.salary_max

    const valid = validateInteger(_, value, `job.labels.salary_${field}`, 0)
    if (!valid) {
        return Promise.reject(valid)
    }

    if (min && max && min >= max) {
        return Promise.reject(
            new Error(
                t('validation.compare', {
                    0: t('job.labels.salary_min'),
                    1: t('job.labels.salary_max'),
                })
            )
        )
    }

    return Promise.resolve()
}

export const getRuleJob = (form: Record<string, any>) => ({
    ...rules,
    start_date: getRuleDate(form, true),
    end_date: getRuleDate(form),
    salary_min: [
        {
            validator: (_: any, value: any) =>
                validateSalaryRange(_, value, 'min', form),
            trigger: ['blur', 'change'],
        },
    ],
    salary_max: [
        {
            validator: (_: any, value: any) =>
                validateSalaryRange(_, value, 'max', form),
            trigger: ['blur', 'change'],
        },
    ],
})
