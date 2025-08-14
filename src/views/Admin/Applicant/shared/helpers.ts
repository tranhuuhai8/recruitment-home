import type { ParamsList } from '@/interface'
import { formatDay, mapFilterQuery, mapKeyToData } from '@/libs'
import dayjs from 'dayjs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const { search, status, gender } = data

    return mapFilterQuery(query, search, mapKeyToData({ status, gender }))
}

export const mapDataUpdate = (data: Record<string, any>) => ({
    ...data,
    birthday: formatDay(data.birthday),
})

export const mapDataForm = (data: Record<string, any>) => ({
    ...data,
    status: data.user?.status ?? data.status,
    mail_address: data.user?.mail_address ?? data.mail_address,
    birthday: data.birthday ? dayjs(data.birthday) : '',
})
