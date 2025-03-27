import { MAX_STRING, MIN_STRING, validateEmail } from '@/libs'
import i18n from '@/lang'

const { t } = i18n

export const rulesLogin = {
    mail_address: [
        {
            required: true,
            message: 'Email required',
            trigger: 'blur',
        },
        {
            validator: (_: any, value: any) =>
                validateEmail(_, value, t('mail_address'), true),
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: 'Password required',
        },
        {
            max: MAX_STRING,
            message: 'Password max string 255',
        },
        {
            min: MIN_STRING,
            message: 'Password min string 8',
        },
    ],
}
