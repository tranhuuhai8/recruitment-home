import { MAX_STRING, MIN_STRING, validateEmail, validatePassword } from '@/libs'
import i18n from '@/lang'

const { t } = i18n

export const rulesLogin = {
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
    password: [
        {
            required: true,
            message: t('validation.required', [t('auth.labels.password')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', [
                t('auth.labels.password'),
                MAX_STRING,
            ]),
        },
        {
            min: MIN_STRING,
            message: t('validation.min.string', [
                t('auth.labels.password'),
                MIN_STRING,
            ]),
        },
        {
            validator: (_: any, value: any) => validatePassword(_, value),
            trigger: 'blur',
        },
    ],
    role: [
        {
            required: true,
            message: t('validation.required', [t('auth.labels.role')]),
            trigger: 'blur',
        },
    ],
}

export const getRuleRegister = (ruleForm: Record<string, any>) => ({
    ...rulesLogin,
    password_confirmation: [
        {
            required: true,
            message: t('validation.required', [
                t('auth.labels.password_confirmation'),
            ]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', [
                t('auth.labels.password_confirmation'),
                MAX_STRING,
            ]),
        },
        {
            min: MIN_STRING,
            message: t('validation.min.string', [
                t('auth.labels.password_confirmation'),
                MIN_STRING,
            ]),
        },
        {
            validator: async (_: any, value: any) => {
                if (
                    !value ||
                    value.length > MAX_STRING ||
                    value.length < MIN_STRING
                )
                    return Promise.resolve()

                if (
                    ruleForm.password &&
                    value.trim() !== ruleForm.password.trim()
                ) {
                    return Promise.reject(
                        new Error(t('validation.password.confirm'))
                    )
                }
                return Promise.resolve()
            },
        },
    ],
})
