import i18n from '@/lang'

const { t } = i18n

export const INITIAL_LOGIN = {
    mail_address: '',
    password: '',
    role: 'admin'
}

export const INITIAL_RESET_PASSWORD = {
    password: '',
    password_confirmation: '',
}

export const INITIAL_CHANGE_PASSWORD = {
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
}


export const ROLE_OPTIONS = [
    {
        label: t('auth.role.admin'),
        value: 'admin',
    },
    {
        label: t('auth.role.company'),
        value: 'company',
    },
    {
        label: t('auth.role.applicant'),
        value: 'applicant',
    },
]
