import { MAX_STRING, MIN_STRING, validateEmail } from '@/libs'
import i18n from '@/lang'

const { t } = i18n

export const rulesLogin = {
    mail_address: [
        {
            required: true,
            message: t('validation.required', [t('auth.label.mail_address')]),
            trigger: 'blur',
        },
        {
            validator: (_: any, value: any) =>
                validateEmail(_, value, t('auth.label.mail_address'), true),
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: t('validation.required', [t('auth.label.password')]),
        },
        {
            max: MAX_STRING,
            message: t('validation.max.string', [
                t('auth.label.password'),
                MAX_STRING,
            ]),
        },
        {
            min: MIN_STRING,
            message: t('validation.min.string', [t('password'), MIN_STRING]),
        },
    ],
    role: [
        {
            required: true,
            message: t('validation.required', [t('auth.label.role')]),
            trigger: 'blur',
        },
    ],
}
