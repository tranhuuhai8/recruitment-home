import i18n from '@/lang'
import {
    PREFIX_ROLE_ADMIN,
    PREFIX_ROLE_APPLICANT,
    PREFIX_ROLE_COMPANY,
} from '@/libs'

const { t } = i18n

export const INITIAL_LOGIN = {
    mail_address: '',
    password: '',
    role: PREFIX_ROLE_APPLICANT,
}

export const INITIAL_REGISTER = {
    name: '',
    mail_address: '',
    password: '',
    password_confirmation: '',
    role: PREFIX_ROLE_APPLICANT,
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
        label: t('auth.role.applicant'),
        value: PREFIX_ROLE_APPLICANT,
    },
    {
        label: t('auth.role.company'),
        value: PREFIX_ROLE_COMPANY,
    },
    {
        label: t('auth.role.admin'),
        value: PREFIX_ROLE_ADMIN,
    },
]

export const getRoleOptions = (isLogin = true) =>
    isLogin
        ? ROLE_OPTIONS
        : ROLE_OPTIONS.filter((role) => role.value !== 'admin')
