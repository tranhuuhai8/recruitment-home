import type {
    ChangePasswordDto,
    ForgotPasswordDto,
    LoginDto,
    RegisterDto,
    ResetPasswordDto,
} from '@/interface'
import i18n from '@/lang'
import {
    PREFIX_ROLE_ADMIN,
    PREFIX_ROLE_APPLICANT,
    PREFIX_ROLE_COMPANY,
} from '@/libs'

const { t } = i18n

export const INITIAL_LOGIN: LoginDto = {
    mail_address: '',
    password: '',
}

export const INITIAL_REGISTER: RegisterDto = {
    mail_address: '',
    password: '',
    password_confirmation: '',
    role: PREFIX_ROLE_APPLICANT,
}

export const INITIAL_CHANGE_PASSWORD: ChangePasswordDto = {
    old_password: '',
    password: '',
    password_confirmation: '',
}

export const INITIAL_FORGOT_PASSWORD: ForgotPasswordDto = {
    mail_address: '',
}

export const INITIAL_RESET_PASSWORD: ResetPasswordDto = {
    mail_address: '',
    password: '',
    password_confirmation: '',
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
        : ROLE_OPTIONS.filter((role) => role.value !== PREFIX_ROLE_ADMIN)
