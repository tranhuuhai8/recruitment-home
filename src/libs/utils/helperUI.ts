import { h } from 'vue'
import { notification } from 'ant-design-vue'
import {
    CheckCircleOutlined,
    InfoCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons-vue'
import {
    getUserInformation,
    ROLE_ADMIN,
    ROLE_COMPANY,
    STATUS_CODE_SUCCESS,
} from '..'

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

export const notifyStatus = (status: number, message: string) =>
    notify(message, '', status === STATUS_CODE_SUCCESS ? 'success' : 'error')

export const notifyDelete = (
    status: number,
    msgSuccess: string,
    msgError: string
) => {
    notifyStatus(status, status === STATUS_CODE_SUCCESS ? msgSuccess : msgError)
}

export const trim = (field: string, formState: any, trimAll = false) => {
    if (formState[field]) {
        formState[field] = formState[field].trim()

        if (trimAll) {
            formState[field] = formState[field].replace(/\s/g, '')
        }
    }
}

export const trimDynamic = (array: number[] | string[], form: any) => {
    const [field1, index, field2] = array
    form[field1][index][field2] = form[field1][index][field2].trim()
}

export const formatCurrency = (money: string) => {
    const result = unRoundFixed(money)
    return String(result).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const trimAndFormatCurrency = (
    field: string | number,
    formState: any
) => {
    if (formState[field]) {
        formState[field] = formState[field].trim()
        formState[field] = formatCurrency(formState[field])
    }
}

export const unRoundFixed = (num: string) => {
    const unformattedNum = num.replace(/,/g, '')
    return parseFloat(unformattedNum)
}

export const formatter = (value: string) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const parser = (value: string) => value!.replace(/\$\s?|(,*)/g, '')

export const toPascalCase = (text: string) =>
    text.toLowerCase().replace(/(^\w|\s+\w)/g, (match) => match.toUpperCase())

export const getAvatarUser = () => {
    const info = getUserInformation()
    if (info.role === ROLE_ADMIN) return null
    if (info.role === ROLE_COMPANY) return info.company?.logo

    return info.applicant?.avatar
}
