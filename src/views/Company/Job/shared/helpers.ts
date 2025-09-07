import type { ParamsList } from '@/interface'
import { formatDay, mapFilterQuery, mapKeyToData } from '@/libs'

export const getQuerySearch = (
    query: ParamsList,
    data: Record<string, any>
) => {
    const {
        search,
        status,
        type,
        job_category_id,
        city_id,
        start_date,
        end_date,
    } = data

    return mapFilterQuery(
        query,
        search,
        mapKeyToData({
            status,
            type,
            job_category_id,
            city_id,
            start_date: formatDay(start_date),
            end_date: formatDay(end_date),
        })
    )
}
