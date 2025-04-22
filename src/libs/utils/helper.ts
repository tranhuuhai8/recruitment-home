import {
    ALL_OPTION,
    formatter,
    PAGE_FIRST,
    REGEX_TEL,
    REGEX_TEL_V2,
    ROLE_APPLICANT,
    ROUTE_DASHBOARD,
} from '@/libs'
import type { Option, ParamsList } from '@/interface'

export const hash = Math.floor(Math.random() * 90000) + 10000

export const toggleBodyClass = (className = 'body') => {
    const el = document.body
    el.classList.remove(...el.classList)
    el.classList.add(className)
}

export const getDaysInMonth = (month: number, year: number) => {
    return new Array(31).fill('').reduce((acc, _, i) => {
        const date = new Date(year, month, i + 1)
        if (date.getMonth() === month) {
            acc.push(date)
        }
        return acc
    }, [])
}

export const formatMoney = (value: string) => {
    if (!value) return '0'

    return formatter(value) + 'VND'
}

export const isObjectNull = (object: object) => !!Object.keys(object).length

export const getOptions = (array: any[], name = 'name') => array?.map((item) => ({ label: item[name], value: item.id }))

export const getObjOptions = (
    obj: Record<number, string>,
    hasAll = true,
    end = true
) => {
    const options = Object.entries(obj).map(([value, label]) => ({
        label,
        value: +value,
    }))

    if (hasAll && end) return [...options, ALL_OPTION]
    if (hasAll) return [ALL_OPTION, ...options]

    return options
}

export const mapKeyToData = (value: any) => {
    return Object.entries(value).map(([k, v]) => {
        return Object.fromEntries([
            ['key', k],
            [
                'data',
                Array.isArray(v)
                    ? JSON.stringify((v as Array<string>).map((i) => Number(i)))
                    : v,
            ],
        ])
    })
}

export const mapSortQuery = (query: ParamsList, key: string, dir?: string) => ({
    ...query.value,
    page: PAGE_FIRST,
    orders: [{ key, dir: dir ? `${dir}ing` : 'descending' }],
})

export const getFirstErrorMessage = (errors: Record<string, any>) => Object.values(errors).flat().shift() as string

export const getInfoUser = () => {
    const info: any = localStorage.getItem('user')
    return JSON.parse(info)
}

export const getRouterDashboard = () =>
    ROUTE_DASHBOARD[getInfoUser()?.role ?? ROLE_APPLICANT]

export const partition = (arr: any[], fn: any) =>
    arr.reduce(
        (acc, val, i, arr) => {
            acc[fn(val, i, arr) ? 0 : 1].push(val)
            return acc
        },
        [[], []]
    )

export const groupBy = (list: Array<any>, keyGetter: any) => {
    const map = new Map()
    list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })
    return map
}

export const generateUniqueCodes = (count: number, length: number) => {
    const codes = new Set()
    while (codes.size < count) {
        const code = Math.random()
            .toString(36)
            .substring(2, 2 + length)
        codes.add(code)
    }
    return [...codes]
}

export const filterOption = (input: any, option: Option) =>
    (option?.label ?? '').toLocaleLowerCase().includes(input.toLowerCase())

export const regexTel = (value: KeyboardEvent) => {
    if (!REGEX_TEL.test(value.key)) {
        value.preventDefault()
    }
}

export const checkRegex = (value: KeyboardEvent) => {
    if (!REGEX_TEL_V2.test(value.key)) {
        value.preventDefault()
    }
}
