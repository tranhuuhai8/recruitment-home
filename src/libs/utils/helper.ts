import dayjs from 'dayjs'
import { REGEX_EMAIL, ROLE_ADMIN, ROLE_CANDIDATE } from '..'
import i18n from '@/lang'
import { notification } from 'ant-design-vue'
import {
    CheckCircleOutlined,
    InfoCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons-vue'
import { h } from 'vue'

const { t } = i18n

const typeIcon = {
    info: [InfoCircleOutlined, 'blue'],
    success: [CheckCircleOutlined, 'green'],
    warning: [WarningOutlined, 'orange'],
    error: [CloseCircleOutlined, 'red'],
}
export type notifyType = 'success' | 'warning' | 'info' | 'error'

export const notify = (
    message?: string,
    description?: string,
    type: notifyType = 'success'
) => {
    const [icon, color] = typeIcon[type]
    notification[type]({
        message,
        description,
        icon: () => h(icon, { style: `color: ${color}` }),
    })
}

export const formatDay = (day: any, format = 'YYYY-MM-DD') => {
    if (!day) return ''
    return dayjs(new Date(day)).format(format)
}

export const formatDateTime = (date: any, time: any) => {
    if (!date || !time) return ''
    return formatDay(date) + ' ' + formatDay(time, 'HH:mm:ss')
}

export const getDateMonthYear = () => {
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const year = today.getFullYear().toString()

    return `${year}${month}${day}`
}

export const getFirstErrorMessage = (errors: Record<string, any>) => {
    return Object.values(errors).flat().shift() as string
}

export const getInfoUser = () => {
    const info: any = localStorage.getItem('user')
    return JSON.parse(info)
}

export const getRouterName = () => {
    const role = getInfoUser()?.role

    if (role === ROLE_CANDIDATE) {
        return 'home-candidate'
    }

    return role === ROLE_ADMIN ? 'home-admin' : 'home-employer'
}
export const getDateTime = (date: string | Date, time: string) => {
    return new Date(`${date} ${time}`)
}

export const validateEmail = async (_: any, value: any) => {
    const regex = new RegExp(REGEX_EMAIL)
    if (value) {
        if (!regex.test(value)) {
            return Promise.reject(new Error(t('validation.email')))
        }
    }
    return Promise.resolve()
}
