import { MAX_STRING } from '../constants/constants'
import {
    REGEX_CHARACTER,
    REGEX_EMAIL,
    REGEX_FLOAT,
    REGEX_LOWERCASE,
    REGEX_NUMBER,
    REGEX_TEL,
    REGEX_UPPERCASE,
} from './regex'
import i18n from '@/lang'

const { t } = i18n

export const validateInteger = async (
    _: any,
    value: any,
    column: string,
    min = 0,
    max = 0
) => {
    const regex = new RegExp(REGEX_NUMBER)
    if (!value) return Promise.resolve()
    if (!regex.test(value)) {
        return Promise.reject(
            new Error(
                t('validation.integer', {
                    0: t(column),
                }) as string
            )
        )
    }
    if (value < min) {
        return Promise.reject(
            new Error(
                t('validation.min.numeric', {
                    0: t(column),
                    1: min,
                }) as string
            )
        )
    }
    if (max > 0 && value > max) {
        return Promise.reject(
            new Error(
                t('validation.max.numeric', {
                    0: t(column),
                    1: max,
                }) as string
            )
        )
    }
}

export const validateFloat = async (
    _: any,
    value: any,
    column: string,
    min = 0 as number,
    max = 1 as number
) => {
    const regex = new RegExp(REGEX_FLOAT)
    if (!value) return Promise.resolve()
    if (!regex.test(value)) {
        return Promise.reject(
            new Error(
                t('validation.numeric', {
                    0: t(column),
                }) as string
            )
        )
    }
    if (value < min) {
        return Promise.reject(
            new Error(
                t('validation.min.numeric', {
                    0: t(column),
                    1: min,
                }) as string
            )
        )
    }

    if (max > 0 && value > max) {
        return Promise.reject(
            new Error(
                t('validation.max.numeric', {
                    0: t(column),
                    1: max,
                }) as string
            )
        )
    }
}

export const validateSize = async (
    _: any,
    value: any,
    column: string,
    size = 6 as number
) => {
    const regex = new RegExp(REGEX_NUMBER)
    if (!value) return Promise.resolve()
    if (!regex.test(value)) {
        return Promise.reject(
            new Error(
                t('validation.integer', {
                    0: t(column),
                }) as string
            )
        )
    }
    if (value.length != size) {
        return Promise.reject(
            new Error(
                t('validation.size.numeric', {
                    0: t(column),
                    1: size,
                }) as string
            )
        )
    }
}

export const validateEmail = async (
    _: any,
    value: any,
    text: string = t('auth.labels.mail_address')
) => {
    if (!value) return Promise.resolve()
    const regex = new RegExp(REGEX_EMAIL)

    if (value.length > MAX_STRING) {
        return Promise.reject(
            new Error(
                t('validation.max.string', {
                    0: text,
                    1: MAX_STRING,
                }) as string
            )
        )
    }
    if (!regex.test(value)) {
        return Promise.reject(
            new Error(
                t('validation.email', {
                    0: text,
                }) as string
            )
        )
    }
    return Promise.resolve()
}

export const validatePhoneNumber = async (_: any, value: any) => {
    if (!value) return Promise.resolve()

    if (!REGEX_TEL.test(value)) {
        return Promise.reject(new Error(t('validation.tel_format') as string))
    }

    return Promise.resolve()
}

export const validatePassword = (_: any, password: string) => {
    if (
        REGEX_UPPERCASE.test(password) &&
        REGEX_LOWERCASE.test(password) &&
        REGEX_CHARACTER.test(password) &&
        REGEX_NUMBER.test(password)
    ) {
        return Promise.resolve()
    }

    return Promise.reject(new Error(t('validation.password.format') as string))
}
