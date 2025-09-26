import type { FormDataJob, ParamsList } from '@/interface'
import {
    formatDay,
    getUserInformation,
    mapFilterQuery,
    mapKeyToData,
} from '@/libs'
import dayjs from 'dayjs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const { search, status, type, company_id, start_date, end_date } = data

    return mapFilterQuery(
        query,
        search,
        mapKeyToData({
            status,
            type,
            company_id,
            start_date: formatDay(start_date),
            end_date: formatDay(end_date),
        })
    )
}

export const mapDataForm = (data: Record<string, any>) => ({
    ...data,
    start_date: dayjs(data.start_date),
    end_date: dayjs(data.end_date),
})

export const makeDataUpsert = (data: FormDataJob) => ({
    ...data,
    start_date: formatDay(data.start_date),
    end_date: formatDay(data.end_date),
    company_id: getUserInformation()?.company.id,
})
