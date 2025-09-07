import {
    ALL_OPTION,
    formatter,
    getUserInformation,
    OPTION_TREE_FIRST,
    PAGE_FIRST,
    REGEX_TEL,
    ROLE_APPLICANT,
    ROLE_PATH_PREFIX,
    ROUTE_NAME_DASHBOARD,
} from '@/libs'
import type { Option, ParamsList } from '@/interface'
import type { TreeNodeProps } from 'ant-design-vue/es/vc-tree'

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

export const getOptions = (array: any[], name = 'name') =>
    array?.map((item) => ({ label: item[name], value: item.id }))

export const getObjOptions = (obj: Record<number, string>, hasAll = true) => {
    const options = Object.entries(obj).map(([value, label]) => ({
        label,
        value: +value,
    }))

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

export const mapSortQuery = (
    query: Record<string, any>,
    key: string,
    dir: string,
    isRef = true
) => ({
    ...(isRef ? query.value : query),
    page: PAGE_FIRST,
    orders: [{ key, dir }],
})

export const mapFilterQuery = (
    query: ParamsList,
    search: string,
    filters: Record<string, any>[]
) => ({
    ...query.value,
    page: PAGE_FIRST,
    search,
    filters,
})

export const getFirstErrorMessage = (errors: Record<string, any>) =>
    Object.values(errors).flat().shift() as string

export const getRouterDashboard = () =>
    ROUTE_NAME_DASHBOARD[getUserInformation()?.role ?? ROLE_APPLICANT]

export const getRolePathMap = () =>
    ROLE_PATH_PREFIX[getUserInformation()?.role ?? ROLE_APPLICANT]

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

export const filterTreeSelect = (input: string, treeNode: TreeNodeProps) =>
    (treeNode?.title ?? '').toLocaleLowerCase().includes(input.toLowerCase())

export const regexTel = (value: KeyboardEvent) => {
    if (!REGEX_TEL.test(value.key)) {
        value.preventDefault()
    }
}

export const getTreeData = (data: Record<string, any>[], hasAll = false) => {
    if (!data || !Array.isArray(data)) {
        return hasAll ? [OPTION_TREE_FIRST] : []
    }
    const parentMap = new Map()

    const parents = data.filter((item) => item.parent_id === null)
    parents.forEach((parent) => {
        parentMap.set(parent.id, {
            title: parent.name,
            value: parent.id,
            children: [],
        })
    })

    data.forEach((item) => {
        if (item.parent_id !== null && parentMap.has(item.parent_id)) {
            parentMap.get(item.parent_id).children.push({
                title: item.name,
                value: item.id,
            })
        }
    })

    const tree = Array.from(parentMap.values())

    return hasAll ? [OPTION_TREE_FIRST, ...tree] : tree
}

export const formatBytes = (bytes: number = 0, decimals = 2, indexUnit = 2) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

    let i = 0
    for (i; i < indexUnit; i++) {
        bytes /= 1024
    }

    return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}
